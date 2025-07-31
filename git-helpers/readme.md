# git-helpers

A collection of scripts to help you work with git and github, during the development and merge process.

**NOTE**: Scripts are designed to be used in a workflow that uses:
- [VSCode](https://code.visualstudio.com/)
- [VSCode Github Pull Request](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension for VSCode
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) extension for VSCode  
> If you don't use these, adapt the scripts usage to your needs.*

## Setup

Before anything, make sure to have installed on your system:
- [git](https://git-scm.com/)
- [node.js](https://nodejs.org/) - required to run the scripts
- [gh](https://github.com/cli/cli) - required to fetch data from github

Then you also need to:
- **install node modules**: `cd git-helpers && npm install`
- **login into github**: `gh auth login` *(This is required because scripts fetch data from github, and github requires authentication to access repositories, and only user with access to the repository can fetch data)*


## Usage

### generate-squash-merge-commit-message

>This script generate a long commit message, meant to be used as the commit message of the squash merge.
> The output is like this example:
```plain
Merge branch 'I#8/chore-improve-github-merge-flow'

---

This branch closes Issue #8

---
Issue #8  
Title: `chore: improve github merge flow`  
Author:  
- Username: tresorama  
- Name: Jacopo Marrone  
URL: https://github.com/tresorama/shadcn-registry-ts/issues/8  
URL Link: [https://github.com/tresorama/shadcn-registry-ts/issues/8](https://github.com/tresorama/shadcn-registry-ts/issues/8)  

## Idea

- We use a squash merge approach.
- We want to self-contain in git history the rationale of changes (idea=issue and solution=pr)
- We don't want to lock in into Github

## Current workflow

1. identify a changes to make
1. create a new Github Issue with:
    - title: `"prefix: description" (e.g. "chore: improve github merge flow")`
    - body: `a description of the problem (markdown)`
1. create a new Git branch with:
    - name: `"issue-title-reformatted" (e.g. "chore/improve-github-merge-flow")`
    - base: `main`
1. create commits in that branches with simple commit text (e.g. "chore: update config file")
1. create a Github PR with:
    - title: `"isue-title" (e.g. "chore: improve github merge flow")`
    - body: `Fixes Issue #X`
1. when ready to Git merge "Squash and merge" with commit:
    - title: `Merge branch 'branch-name' (e.g. Merge branch 'chore/improve-github-merge-flow')`
    - body:
        ```
        Fixes Issue #X
        
        —-
        Issue #X
        
        AUTO-COPIED DESCRIPTION FROM GITHUB ISSUE
        
        —-
        PR #X
        
        EMPTY SPACE TO FILL MANUALLY
        
        —-
        PR Content
        Squashed commit of the following:
        
        NAME OF EACH COMMIT OF THE BRANCH AUTO COPIED
        
        ```
1. finalize the merge


## Problems

- there is a lot of copy paste done manually
- error prone
- too many steps

## Ipotetical solutions

1. `squash commit - local script to generate the squash commit body > manual copy paste`
    - create a script that generate the squash commit data
    - the script output in stdout
    - you copy paste the output in the Squash Merge commit body
2. `squash commit - local script to generate the squash commit body > .git/SQUASH_MSG`
    - create a script that generate the squash commit data
    - the script output in stdout
    - you invoke the script with pipe to `.git/SQUASH_MSG`
    - you init squash and the message is populated from the file

---
PR #9  
Title: I#8/chore-improve-github-merge-flow  
Author:  
- Username: tresorama  
- Name: Jacopo Marrone  
Committers:  
- tresorama (Jacopo Marrone) jacopo.marrone27@gmail.com  
URL: https://github.com/tresorama/shadcn-registry-ts/pull/9
URL Link: [https://github.com/tresorama/shadcn-registry-ts/pull/9](https://github.com/tresorama/shadcn-registry-ts/pull/9)

<!--# FILL THIS PART MANUALLY -->

---
## GIT Branch Commits
From least recent to most recent

Squashed commit of the following:

Title: chore: set auto-branch-name after "start working on this issue" (VS C…  
commit 23fa2e2d0e18840c3550d476f65c1cd4646c32ee  
Author: Jacopo Marrone <jacopo.marrone27@gmail.com>  
Date: 2025-07-30T13:57:02Z  

    chore: set auto-branch-name after "start working on this issue" (VS Code Github Extension)  

Title: chore: edit auto-branch-name after "start working on this issue" (VS …  
commit 792fdb48cdfb9dc5acabaecee12409084e42bd45  
Author: Jacopo Marrone <jacopo.marrone27@gmail.com>  
Date: 2025-07-30T15:43:19Z  

    chore: edit auto-branch-name after "start working on this issue" (VS Code Github Extension)  


```

You use this in this process at the time ☀️.  

Process:
1. you though of a new code addition
1. you create a new github issue (via VSCode or via Web)
    - **IMPORTANT**: issue title should be in the following format: `<prefix>: <issue_title>`, like `feat: add new feature`
    - **IMPORTANT**: *you must include a detailed description of the issue in the the issue description field. This text will be used inside the final commit message of squash merge.*
1. you create a new branch (via VSCode or via Web)
    - **IMPORTANT**: branch name should be in the following format: `I#<issue_number>/<title>`, like `I#8/feat-add-new-feature`. If you use VSCode, the branch name will be automatically generated for you (thanks to `settings.json "githubIssues.issueBranchTitle"`).
    - in VS Code, go to `Left Sidebar > Github Panel > Issues` then hover over the issue you want to work on, and click on `Start working on this issue` (button on right side)
1. you add al the commits that you need to fullfill the issue, using simple commit names
1. when you are ready to merge you..
1. you push to branch to github
2. you create a pull request (via VSCode or via Web)
    - In VS Code, go to `Left Sidebar > Github Panel > Pull Requests` then click on `Create Pull Request` (button on top toolbar)
    - **IMPORTANT**: pull request title should be the same as branch title. In the following format: `I#<issue_number>/<title>`, like `I#8/feat-add-new-feature`
    - Get the title of the branch in VsCode by pressing F1 and typyng `copy branch name`
    - paste the branch name into the pr title
    - **IMPORTANT**: pull request description should includes only this text `Closes Issue #<issue_number>`, like `Closes #8`
    - Write `Closes #X` in the pr description, where X is the Issue number
3. if you need to add more commits to the pull request, you can do it even at this point (after pull request is created), but remember to push again
4. you want to squash merge the PR, so you...
5. ☀️ USE THE SCRIPT:
    - The script, will generate a commit message for you, and you will use it as the commit message of the squash merge.The script commit message will be printed in the terminal and **copied to clipboard**
    - fast method:
        - In VsCode, press `alt+T` then run `generate-squash-merge-commit-message` script
    - slow method:  
        - you open the terminal
        - `cd git-helpers`
        - `npm run generate-squash-merge-commit-message`
6. you merge the PR
    - in VS Code:
        - go to `Left Sidebar > Github Panel > Pull Requests`
        - then click on the PR, that will open on the right, 
        - then go to the bottom and near `Merge` button click on the dropdown and select `Squash and merge`
        - then click on `Merge`
        - then fill the form of the commit:
            - description: paste the commit message from the clipboard
            - title: copy the first line of the `description` field (Merge branch ... (#X))
            - if you need to add more details to the `description`, like an overview, replace the `FILL THIS PART MANUALLY` with your text
7. Done!