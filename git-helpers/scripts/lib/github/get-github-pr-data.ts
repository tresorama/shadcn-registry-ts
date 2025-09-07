import z from "zod";
import { runCli } from "../cli";

let DEBUG: boolean = false;
DEBUG = true;

// zod validation

const schemaPr = z.object({
  /** pr title  @example "I#8/chore-improve-github-merge-flow */
  title: z.string(),
  /** pr number  @example 1 */
  number: z.int(),
  /** pr github url  @example "https://github.com/tresorama/shadcn-registry-ts/pull/9" */
  url: z.url(),
  /** pr creation date  @example "2025-07-30T13:16:37Z" */
  createdAt: z.iso.datetime(),
  /** issue author */
  author: z.object({
    /** issue author login  @example "tresorama" */
    login: z.string(),
    /** issue author name  @example "Jacopo Marrone" */
    name: z.string(),
  }),
  /** pr description */
  body: z.string(),
  /** all issues that are closed by this pr */
  closingIssuesReferences: z.array(z.object({
    /** issue id  @example "I_kwDOIGHObc7G2pch" */
    id: z.string(),
    /** issue number  @example 1 */
    number: z.int(),
    /** issue url  @example "https://github.com/tresorama/next-app/issues/1" */
    url: z.url(),
    /** issue repository */
    repository: z.object({
      /** issue repository id  @example "R_kgDOIGHObQ" */
      id: z.string(),
      /** issue repository name  @example "pipocas-sales-analysis" */
      name: z.string(),
      /** issue repository owner */
      owner: z.object({
        /** issue repository owner id  @example "MDQ6VXNlcjQ3OTU0NzAw" */
        id: z.string(),
        /** issue repository owner login  @example "tresorama" */
        login: z.string(),
      }),
    }),
  })
  ),
  /** pr commits list */
  commits: z.array(
    z.object({
      /** commit creation date  @example "2025-07-30T13:57:02Z" */
      authoredDate: z.iso.datetime(),
      /** commit authors */
      authors: z.array(
        z.object({
          /** commit author email  @example "jacopo.marrone27@gmail.com" */
          email: z.string(),
          /** commit author id  @example "MDQ6VXNlcjQ3OTU0NzAw" */
          id: z.string(),
          /** commit author login  @example "tresorama" */
          login: z.string(),
          /** commit author name  @example "Jacopo Marrone" */
          name: z.string(),
        })
      ),
      /** commit creation date  @example "2025-07-30T13:57:02Z" */
      committedDate: z.iso.datetime(),
      /** commit message title @example "chore: set auto-branch-name after \"start working on this issue\" (VS Code Github Extension)" */
      messageHeadline: z.string(),
      /** commit message body  @example "This commit does the following..." */
      messageBody: z.string(),
      /** commit id  @example "23fa2e2d0e18840c3550d476f65c1cd4646c32ee" */
      oid: z.string(),
    })
  ),
  /** pr comments list */
  comments: z.array(z.object({
    /** comment id  @example "IC_kwDOIGHObc6_0ao3" */
    id: z.string(),
    /** comment author */
    author: z.object({
      /** comment author login  @example "tresorama" */
      login: z.string(),
    }),
    /** comment author association  @example "OWNER" */
    authorAssociation: z.string(),
    /** comment body  @example "we need to do this...." */
    body: z.string(),
    /** comment creation date iso string  @example "2025-08-24T15:27:28Z" */
    createdAt: z.iso.datetime(),
    /** comment url  @example "https://github.com/tresorama/pipocas-sales-analysis/issues/33#issuecomment-3218188855" */
    url: z.string(),
  })),
  /** pr reviews list (comments of developers are here and not in comments)  */
  reviews: z.array(z.object({
    /** review id  @example "R_kwDOIGHObc7G2pch" */
    id: z.string(),
    /** review author */
    author: z.object({
      /** review author login  @example "tresorama" */
      login: z.string(),
    }),
    /** review author association  @example "OWNER" */
    authorAssociation: z.string(),
    /** review body  @example "we need to do this...." */
    body: z.string(),
    /** review creation date iso string  @example "2025-08-24T15:27:28Z" */
    submittedAt: z.iso.datetime(),
  }))
}).transform((data) => {
  return {
    ...data,
    commits: data.commits.map((commit) => {
      const commitRawTitle = commit.messageHeadline;
      const commitRawBody = commit.messageBody;

      const commitFullBody = (
        // if the commit title is truncated...
        commitRawTitle.endsWith('…') && commitRawBody.startsWith('…')
      )
        ? `${commitRawTitle.split('…')[0]}${commitRawBody.split('…')[1]}`
        : commitRawTitle + "\n\n" + commitRawBody;

      return {
        ...commit,
        formatted: {
          fullBody: commitFullBody,
          rawTitle: commitRawTitle,
          rawBody: commitRawBody
        }
      };
    }),
  };
}).transform((data) => {
  return {
    ...data,
    allCommitters: (() => {
      const allCommitters = new Map<string, { login: string; name: string; email: string; }>();
      for (const commit of data.commits) {
        for (const author of commit.authors) {
          if (allCommitters.has(author.login)) {
            continue;
          }
          allCommitters.set(author.login, author);
        }
      }
      return Array.from(allCommitters.values());
    })(),
    conversation: (() => {
      const commits = data.commits.map((commit) => ({ ...commit, type: 'COMMIT' }) as const);
      const comments = data.comments.map((comment) => ({ ...comment, type: 'COMMENT' }) as const);
      const reviews = data.reviews.map((review) => ({ ...review, type: 'REVIEW' }) as const);
      const itemsSorted = [...commits, ...comments, ...reviews].sort((a, b) => {
        const aCreatedAt = new Date(
          a.type === 'COMMIT' ? a.authoredDate
            : a.type === 'COMMENT' ? a.createdAt
              : a.submittedAt
        );
        const bCreatedAt = new Date(
          b.type === 'COMMIT' ? b.authoredDate
            : b.type === 'COMMENT' ? b.createdAt
              : b.submittedAt
        );
        return aCreatedAt.getTime() - bCreatedAt.getTime();
      });
      return itemsSorted;
    })(),
  };
});

type ResultSuccess = {
  status: 'success',
  data: z.infer<typeof schemaPr>,
};
type ResultError = {
  status: 'error',
  errorCode: (
    | "UNEXPECTED_GITHUB_RESPONSE"
    | "FETCH_ERROR_FROM_GITHUB_OR_UNKNOWN_ERROR"
  ),
  errorMessage: string,
  errorOriginal: Error | unknown,
};

type Result = ResultSuccess | ResultError;

/**
 * Get Github Pull Request data, given a `prId` (i.e. `9`).  
 * Fetching data is done via `gh` (github cli).  
 * Be aware that:
 * - `gh` need to be installed. (`brew install gh`)
 * - `gh` need to be authenticated with your account (`gh auth login`).
 */
export function getGithubPrData(prNumber: number): Result {

  try {
    const jsonString = runCli([
      `gh pr view ${prNumber}`,
      "--json",
      [
        // "additions",
        // "assignees",
        "author",
        // "autoMergeRequest",
        // "baseRefName",
        // "baseRefOid",
        "body",
        // "changedFiles",
        // "closed",
        // "closedAt",
        "closingIssuesReferences",
        "comments",
        "commits",
        "createdAt",
        // "deletions",
        // "files",
        // "fullDatabaseId",
        // "headRefName",
        // "headRefOid",
        // "headRepository",
        // "headRepositoryOwner",
        "id",
        // "isCrossRepository",
        // "isDraft",
        // "labels",
        // "latestReviews",
        // "maintainerCanModify",
        // "mergeCommit",
        // "mergeStateStatus",
        // "mergeable",
        // "mergedAt",
        // "mergedBy",
        // "milestone",
        "number",
        // "potentialMergeCommit",
        // "projectCards",
        // "projectItems",
        // "reactionGroups",
        // "reviewDecision",
        // "reviewRequests",
        "reviews",
        // "state",
        // "statusCheckRollup",
        "title",
        // "updatedAt",
        "url",
      ].join(",")
    ].join(" "));

    if (DEBUG) {
      console.log(jsonString);
    }

    const json = schemaPr.safeParse(JSON.parse(jsonString));

    // if zod schema fails
    if (json.success === false) {
      return {
        status: 'error',
        errorCode: "UNEXPECTED_GITHUB_RESPONSE",
        errorMessage: `⚠️ Impossible to parse GITHUB PR response #${prNumber} from github cli.`,
        errorOriginal: json.error,
      } satisfies ResultError;
    }

    // if success
    return {
      status: 'success',
      data: json.data,
    } satisfies ResultSuccess;

  } catch (err) {
    // if fetch error or unknown error
    return {
      status: 'error',
      errorCode: "FETCH_ERROR_FROM_GITHUB_OR_UNKNOWN_ERROR",
      errorMessage: `⚠️ Impossible to fetch issue #${prNumber} from github.`,
      errorOriginal: err
    } satisfies ResultError;
  }
}