#!/usr/bin/env node
import { runCli } from "./lib/cli";
import { clipboard } from './lib/clipboard';
import { getGithubIssueData } from "./lib/github/get-github-issue-data";
import { getGithubPrData } from "./lib/github/get-github-pr-data";

// IRRELEVANT LINE

// ===========================================
// 1. get data
// ===========================================

// get git repo remote url
// const repoRemoteUrl = runCli('git config --get remote.origin.url')
//   .replace(/^git@github.com:/, 'https://github.com/')
//   .replace(/\.git$/, '');

// get current git branch name
// NOTE: ensure you are in the branch that you want to merge
const branchName = runCli('git rev-parse --abbrev-ref HEAD');

// get github issue id that this PR resolve from branch name
//  - branch name: tresorama/I#8/bla-bla-bla
//  - issueId: 8
const issueId = branchName.match(/I#(\d+)/)?.[1] ?? null;
if (!issueId) {
  console.error('❌  Imposible to get issue number from branch name, branch name format not valid for parsing. Must be "<username>/I#<issue_number>/<title>"');
  process.exit(1);
}

// get github issue data from github
const issueData = getGithubIssueData(Number(issueId));
if (issueData.status === 'error') {
  console.error(`❌ ${issueData.errorMessage}`, issueData.errorOriginal);
  process.exit(1);
}

// get github pr data from github
const prId = issueData.data.closedByPullRequestsReferences?.[0]?.number ?? null;
if (!prId) {
  console.error('❌  Imposible to get pull request number from issue. The PR exists? Or the issue is not closable/linked by a PR?');
  process.exit(1);
}
const prData = getGithubPrData(Number(prId));
if (prData.status === 'error') {
  console.error(`❌ ${prData.errorMessage}`, prData.errorOriginal);
  process.exit(1);
}


// ===========================================
// 2. compose output
// ===========================================

const sanitizeString = (
  purpose: 'branch-name' | 'issue' | 'pr' | 'commit-message',
  str: string,
) => {
  if (purpose === 'issue' || purpose === 'pr' || purpose === 'branch-name') {
    return str
      // replace all backticks with nothing
      .replace(/\n/g, ' ');
  }
  // if commit...
  return str
    // replace <TAGNAME> with `<TAGNAME>` (wrap in backticks)
    .replace(/<([A-Za-z]+)>/g, (_, word) => `\`<${word}>\``);
};
const indentEveryLines = (str: string, padNumber: number) => str.split('\n').map(line => " ".repeat(padNumber) + line).join('\n');

/**
 * Return true if a piece of text is the output of this script
 */
const getIsThisScriptOutputText = (text: String) => text.includes('MERGE SUMMARY');


const output = `
Merge branch '${branchName}' (PR#${prData.data.number})

This branch/PR #${prData.data.number} closes Issue #${issueData.data.number}

------------------------------------------------------------------------------
# ISSUE 
------------------------------------------------------------------------------

Number: #${issueData.data.number}  
Title: \`${issueData.data.title}\`  
Author:  
- Username: ${issueData.data.author.login}  
- Name: ${issueData.data.author.name}  
URL: ${issueData.data.url}  
URL Link: [${issueData.data.url}](${issueData.data.url})  

${issueData.data.body}




------------------------------------------------------------------------------
# PR 
------------------------------------------------------------------------------

Number: #${prData.data.number}  
Title: ${prData.data.title}  
Author:  
- Username: ${prData.data.author.login}  
- Name: ${prData.data.author.name}  
Committers:  
${prData.data.allCommitters.map((commit) => `- ${commit.login} (${commit.name}) ${commit.email}  `).join('\n')}
URL: ${prData.data.url}
URL Link: [${prData.data.url}](${prData.data.url})

<!--# FILL THIS PART MANUALLY -->

<br>
<br>
<br>
<br>

---------------------------------------------
# PR CONVERSATION: COMMITS + COMMENTS  

> Merged into one string.  
> From oldest to most recent
---------------------------------------------
${prData.data.conversation.map(
  item => {

    if (item.type === 'COMMENT') {
      const comment = item;
      return [
        `\n- 💬 ${comment.author.login}  `,
        `\n${indentEveryLines(comment.body, 3)}  `,
      ].join("\n");
    }

    if (item.type === 'REVIEW') {
      // in case the developer has added as comment this generated squash commit (the outputt of this script), we need to ignore it
      const isThisScriptOutput = getIsThisScriptOutputText(item.body);
      if (isThisScriptOutput) {
        return '';
      }

      const comment = item;
      return [
        `\n- 💬 ${comment.author.login}  `,
        `\n${indentEveryLines(comment.body, 3)}  `,
      ].join("\n");
    }

    if (item.type === 'COMMIT') {
      const commit = item;
      let commitMessage = commit.formatted.fullBody;
      commitMessage = sanitizeString('commit-message', commitMessage);
      commitMessage = indentEveryLines(commitMessage, 3);
      return [
        `\n- 🧑‍💻 ${commit.oid.slice(0, 7)} by ${commit.authors[0].login}  `,
        `\n${commitMessage}  `,
      ].join("\n");
    }

    return '';

  }
).join("\n<br><br>\n")}

<br>
<br>
<br>
<br>

---------------------------------------------
# GIT BRANCH COMMITS  

> Separated -- in Git Format --  
> From oldest to most recent
---------------------------------------------

Squashed commit of the following:

${prData.data.commits.map(commit => {
  const commitRawTitle = commit.messageHeadline;
  const commitRawBody = commit.messageBody;

  const commitFullBody = (
    // if the commit title is truncated...
    commitRawTitle.endsWith('…') && commitRawBody.startsWith('…')
  )
    ? `${commitRawTitle.split('…')[0]}${commitRawBody.split('…')[1]}`
    : commitRawTitle + "\n\n" + commitRawBody;

  // console.log({
  //   commitRawTitle,
  //   commitRawBody,
  //   commitCleanedTitle,
  //   commitCleanedBody,
  //   commitFullBody,
  // });

  return [
    "---------------------------------------------",
    `\nTitle: ${commitRawTitle}  `,
    `\ncommit ${commit.oid}  `,
    `\nAuthor: ${commit.authors.map(author => `${author.name} <${author.email}>`).join(' | ')}  `,
    `\nDate: ${commit.committedDate}  `,
    "\n---------------------------------------------",
    `\n\n    ${commitFullBody}  `,
  ].join("");

}).join("\n\n")}

`.trimStart();


// ===========================================
// 3. print output
// ===========================================
// log output
console.log(output);
// copy into clipboard
clipboard.copy(output);
