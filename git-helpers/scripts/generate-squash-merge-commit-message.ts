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

// get the main github issue id that this PR resolve from branch name
//  - branch name: I#8/bla-bla-bla
//  - issueId: 8
const mainIssueId = branchName.match(/I#(\d+)/)?.[1] ?? null;
if (!mainIssueId) {
  console.error('❌  Imposible to get issue number from branch name, branch name format not valid for parsing. Must be "<username>/I#<issue_number>/<title>"');
  process.exit(1);
}

// get main github issue data from github
const mainIssueData = getGithubIssueData(Number(mainIssueId));
if (mainIssueData.status === 'error') {
  console.error(`❌ ${mainIssueData.errorMessage}`, mainIssueData.errorOriginal);
  process.exit(1);
}

// get github pr data from github
const prId = mainIssueData.data.closedByPullRequestsReferences?.[0]?.number ?? null;
if (!prId) {
  console.error('❌  Imposible to get pull request number from issue. The PR exists? Or the issue is not closable/linked by a PR?');
  process.exit(1);
}
const prData = getGithubPrData(Number(prId));
if (prData.status === 'error') {
  console.error(`❌ ${prData.errorMessage}`, prData.errorOriginal);
  process.exit(1);
}

// get all other secondary github issues closed by this PR
const secondaryIssueIds = prData.data.closingIssuesReferences
  .map(issue => issue.number)
  .filter(issueId => issueId !== Number(mainIssueId));

// get secondary github issue data from github
const secondaryIssueDataResult = secondaryIssueIds.map(issueId => getGithubIssueData(issueId));
const secondaryIssueData = secondaryIssueDataResult.filter(issueData => issueData.status === 'success');
const secondaryIssueDataErrorIds = secondaryIssueIds.filter(issueId => !secondaryIssueData.find(issueData => issueData.data.number === issueId));
if (secondaryIssueDataErrorIds.length > 0) {
  console.error(`❌  Impossible to get issue data from github for these issues: \n${secondaryIssueDataErrorIds.join(', ')}`);
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
Merge branch '${branchName}' (PR# ${prData.data.number})

---------------------------------------------
# 📦 MERGE SUMMARY
---------------------------------------------


**🔀 PR** [#${prData.data.number} - ${sanitizeString('pr', prData.data.title)}](${prData.data.url})  

**🌱 Branch**  \`${sanitizeString('branch-name', branchName)}\`  

**🔗 Closed Issues**  
- **Main** [#${mainIssueData.data.number} — ${sanitizeString('issue', mainIssueData.data.title)}](${mainIssueData.data.url})
${secondaryIssueData.length === 0 ? (
    '- *No secondary issues*'
  ) : secondaryIssueData
    .map(issueData => `- **Secondary:** [#${issueData.data.number} — ${sanitizeString('issue', issueData.data.title)}](${issueData.data.url})  `)
    .join('\n')
  }


## Changes Overview


<br>
<br>
<br>
<br>

---------------------------------------------
# 📌 MAIN ISSUE \#${mainIssueData.data.number}
---------------------------------------------

**Title**  
\`${sanitizeString('issue', mainIssueData.data.title)}\`  

**URL**  
${mainIssueData.data.url}  

**Author**  
${mainIssueData.data.author.login} - ${mainIssueData.data.author.name}  

## 💡 BODY

${mainIssueData.data.body}

<br>
<br>

## 💬 COMMENTS

${mainIssueData.data.comments.length === 0 ? (
    '*No comments*'
  ) : (
    mainIssueData.data.comments
      .map(comment => `
[${comment.author.login} @ ${comment.createdAt}](${comment.url})  
${comment.body}
      `.trim())
      .join('\n\n')
  )
  }

<br>
<br>
<br>
<br>

${secondaryIssueData.map(issueData => `
---------------------------------------------
# 📌 SECONDARY ISSUE \#${issueData.data.number}
---------------------------------------------
  
**Title**: \`${sanitizeString('issue', issueData.data.title)}\`  
**URL**: ${issueData.data.url}  
**Author**: ${issueData.data.author.login} - ${issueData.data.author.name}  

## 💡 BODY

${issueData.data.body}

<br>
<br>

## 💬 COMMENTS

${issueData.data.comments.length === 0 ? (
      '*No comments*'
    ) : (
      issueData.data.comments
        .map(comment => `
[${comment.author.login} @ ${comment.createdAt}](${comment.url})  
${comment.body}
  `.trim())
        .join('\n\n')
    )
    }
  
  <br>
  <br>
  <br>
  <br>
`).join('\n\n')}

---------------------------------------------
# ✨ PR \#${prData.data.number}
---------------------------------------------

**Title**: \`${sanitizeString('pr', prData.data.title)}\`  
**URL**: ${prData.data.url}  
**Author**: ${prData.data.author.login} (${prData.data.author.name})  
**Committers**:  
${prData.data.allCommitters.map((commit) => `- ${commit.login} (${commit.name}) ${commit.email}  `).join('\n')}

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

${prData.data.commits.map(
      commit => {
        return [
          "---------------------------------------------",
          `\n**Title**: ${commit.formatted.rawTitle}  `,
          `\n**Commit**: ${commit.oid}  `,
          `\n**Author**: ${commit.authors.map(author => `${author.name} <${author.email}>`).join(' | ')}  `,
          `\n**Date**: ${commit.committedDate}  `,
          `\n\n    ${commit.formatted.fullBody}  `,
        ].join("");
      }
    ).join("\n\n")
  }

`.trimStart();

// ===========================================
// 3. print output
// ===========================================
// log output
// console.log(output);
// copy into clipboard
clipboard.copy(output);
