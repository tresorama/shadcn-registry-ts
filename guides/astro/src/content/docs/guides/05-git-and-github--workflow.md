---
title: Git and Github workflow
description: How to work with git and github in this project? Here you will find how we handle code changes, issues, pull requests...
---

## Intro

This project uses:
- [Git](https://git-scm.com/) as version control
- [Github](https://github.com/) as remote repo, and issue tracker
- [Vercel Deploy Previews](https://vercel.com/) as "staging" deploys


## Machine Setup

We reccomend to use these tools: 
- [VSCode](https://code.visualstudio.com/) - Code Editor / IDE
- [VSCode Github Pull Request](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension for VSCode that integrate with Github (for Issue and Pull Request)
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) extension for VSCode, that enhance the Git experience
- [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) extension for VSCode, that enhance the Git experience

## Product flow

Product Flow is how we change the product over time.

When we want to add a new code changes to the app, we follow this workflow:
1. Create a new github issue  
   :::tip
   In VsCode, got to `Left Sidebar > Github Panel > Issues` then click on `New Issue` (button on top toolbar)
   :::  
   
   Use a good name for the issue.  
   Add a quick but precise description in the issue body.
   
   ```
   issue name: feat: util - UTIL_NAME - create util
   issue body:  
   ## Problem
   Which problem we have ?

   ## Potential Solution

   Write here what you think now could be the solution, multiple allowed.
   ```
2. Create a new branch for the issue.  
   :::tip
   In VsCode, got to `Left Sidebar > Github Panel > Issues` then hover over the issue you want to work on, and click on `Start working on this issue` (button on right side).  
   
   VsCode will create a new branch for you with the correct branch name and set it as active branch.
   :::
3. Add commits to the branch
4. Run lint command `pnpm run lint` often to check for errors
5. Push the branch to github
6. Create a pull request from the branch.  
   :::tip
   In VsCode, when you push the branch to github, a quick button will appear to create a pull request (bottom right corner).
   :::
7. Check that the build is ok, by manually checking the Deploy Preview taht you find in the Pull Request comments.
8. When ready, merge the pull request with squash merge.  
   :::tip
   To produce the squash commit message we have a script that generate it.  
   In VsCode, just press `alt+T` (Run Task) then run `generate-squash-merge-commit-message` script, that will generate it and copy it to the clipboard.  

   Then:
   - paste the clipboard content into the commit message body
   - copy the first line of pasted text and use it as the title of the merge commit
   - add extra note to the commit mesage under `## Changes Overview` section (optional)
   - copy the final squash commit message if you added extra note
   - merge
   - add a comment to the PR with the content of your clipboard (this is needed for better reading it on Github Web)
   
   Alt+T does nothing?  
   The task name is not suggested?  
   Read `root/git-helpers/readme.md`
   :::
9. **❌ NEVER DELETE A MERGED BRANCH**

