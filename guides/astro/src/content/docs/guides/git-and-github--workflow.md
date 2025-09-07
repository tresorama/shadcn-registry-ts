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
1. Create a new branch for the issue.  
   :::tip
   In VsCode, got to `Left Sidebar > Github Panel > Issues` then hover over the issue you want to work on, and click on `Start working on this issue` (button on right side)
   :::
1. Add commits to the branch
1. Run lint command `pnpm run lint` often to check for errors
3. Push the branch to github
4. Create a pull request from the branch.  
   :::tip
   In VsCode, when you push the branch to github, a quick button will appear to create a pull request (bottom right corner).
   :::
5. Check that the build is ok, by manually checking the Deploy Preview.  
   You will find the link in the Pull Request comments.
6. When ready, merge the pull request with squash merge.  
   :::tip
   To produce the squash commit message we have a script that generate it. Read More at `git-helpers/readme.md`
   :::
7. **❌ NEVER DELETE A MERGED BRANCH**

