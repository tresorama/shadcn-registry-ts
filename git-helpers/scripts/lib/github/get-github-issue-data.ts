import z from "zod";
import { runCli } from "../cli";

let DEBUG: boolean = false;
DEBUG = true;

// zod validation

const schemaIssue = z.object({
  /** issue title  @example "feat: add new feature" */
  title: z.string(),
  /** issue number  @example 1 */
  number: z.int(),
  /** issue github url  @example "https://github.com/tresorama/next-app/issues/1" */
  url: z.url(),
  /** issue creation date  @example "2025-07-30T13:16:37Z" */
  createdAt: z.iso.datetime(),
  /** issue author */
  author: z.object({
    /** issue author login  @example "tresorama" */
    login: z.string(),
    /** issue author name  @example "Jacopo Marrone" */
    name: z.string(),
  }),
  /** issue description */
  body: z.string(),
  /** Pull requests that closed this issue */
  closedByPullRequestsReferences: z.array(
    z.object({
      /** Pull request id  @example "PR_kwDOPUWe586hYy7W" */
      id: z.string(),
      /** Pull request number  @example 9 */
      number: z.int(),
      /** Pull request url  @example "https://github.com/tresorama/shadcn-registry-ts/pull/9" */
      url: z.string(),
      /** Pull request repository */
      repository: z.object({
        /** Pull request repository id  @example "R_kgDOPUWe5w" */
        id: z.string(),
        /** Pull request repository name  @example "shadcn-registry-ts" */
        name: z.string(),
        /** Pull request repository owner */
        owner: z.object({
          /** Pull request repository owner id  @example "MDQ6VXNlcjQ3OTU0NzAw" */
          id: z.string(),
          /** Pull request repository owner login  @example "tresorama" */
          login: z.string(),
        }),
      }),
    })
  ),
});


type ResultSuccess = {
  status: 'success',
  data: z.infer<typeof schemaIssue>,
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
 * Get Github Issue data, given a `issueId` (i.e. `9`).
 * Fetching data is done via `gh` (github cli).  
 * Be aware that:
 * - `gh` need to be installed. (`brew install gh`)
 * - `gh` need to be authenticated with your account (`gh auth login`).
 */
export function getGithubIssueData(issueNumber: number): Result {

  try {
    const jsonString = runCli([
      `gh issue view ${issueNumber}`,
      "--json",
      [
        // "assignees",
        "author",
        "body",
        // "closed",
        // "closedAt",
        "closedByPullRequestsReferences",
        // "comments",
        "createdAt",
        "id",
        // "isPinned",
        // "labels",
        // "milestone",
        "number",
        // "projectCards",
        // "projectItems",
        // "reactionGroups",
        // "state",
        // "stateReason",
        "title",
        // "updatedAt",
        "url",
      ].join(",")
    ].join(" "));

    if (DEBUG) {
      console.log(jsonString);
    }


    const json = schemaIssue.safeParse(JSON.parse(jsonString));

    // if zod schema fails
    if (json.success === false) {
      return {
        status: 'error',
        errorCode: "UNEXPECTED_GITHUB_RESPONSE",
        errorMessage: `⚠️ Impossible to parse GITHUB ISSUE response #${issueNumber} from github cli.`,
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
      errorMessage: `⚠️ Impossible to fetch issue #${issueNumber} from github.`,
      errorOriginal: err
    } satisfies ResultError;
  }
}