
# My-Oxytocin

Taking pets personalization gifts to the next level.

---

## Table of Contents
1. [Project Setup](#project-setup)
   - [Install Dependencies](#install-dependencies)
   - [Start Development Server](#start-development-server)
   - [Build for Production](#build-for-production)
   - [Lint and Auto-fix Files](#lint-and-auto-fix-files)
2. [Working in This Project](#working-in-this-project)
   - [Branching Strategy](#branching-strategy)
     - [Branch Naming Convention](#branch-naming-convention)
     - [Branch Assignment](#branch-assignment)
     - [Important Notes](#important-notes)
   - [Development Process](#development-process)
     - [Working on Issues](#working-on-issues)
     - [Commit Message Format](#commit-message-format)
     - [Pushing Changes](#pushing-changes)
3. [Healthy Branches](#healthy-branches)
   - [Development Branch (`dev`)](#development-branch-dev)
   - [Production Branch (`master`)](#production-branch-master)
4. [Merging a Branch into `dev`](#merging-a-branch-into-dev)
   - [Ensure Your Local Repository is Up-to-Date](#1-ensure-your-local-repository-is-up-to-date)
   - [Merge Your Feature Branch](#2-merge-your-feature-branch)
   - [Resolve Any Merge Conflicts](#3-resolve-any-merge-conflicts)
   - [Run Linting](#4-run-linting)
   - [Push the Changes](#5-push-the-changes)
5. [Merging `dev` into `master`](#merging-dev-into-master)
6. [Notes for Developers](#notes-for-developers)

---

## Project Setup

### Install Dependencies
To install all project dependencies, run:
```bash
yarn install
```

### Start Development Server
To start the development server with hot-reloading:
```bash
yarn serve
```

### Build for Production
To compile and minify the project for production:
```bash
yarn build
```

### Lint and Auto-fix Files
To lint your code and automatically fix any issues:
```bash
yarn lint
```

---

## Working in This Project

### **Branching Strategy**

#### Branch Naming Convention:
- For every issue, create a branch using the following format:
  ```
  task_<issue_number>_<brief_description>
  ```
  - Example: If the assignee is John, the issue number is 42, and the issue name is "create dummy page", the branch name should be:
    ```
    task_42_dummy_page
    ```

#### Branch Assignment:
- Assign the newly created branch to the corresponding issue in your project management tool to maintain clear traceability.
- Always link the branch to the ticket as soon as possible, or at least before pushing to the development branch.

#### Important Notes:
- **Do not use the same branch for multiple tickets.** Always create a new branch for each ticket.
- Use concise and meaningful branch names.

---

### **Development Process**

#### Working on Issues:
1. Create a branch for the issue you're working on using the naming convention above.
2. Develop the feature or fix the bug within the respective branch.
3. Ensure all changes are committed with **meaningful commit messages**.

#### Commit Message Format:
- Start each commit message with the issue number followed by a brief description of the changes.
  - Example: 
    ```
    #42 Added initial layout for dummy page
    ```

#### Pushing Changes:
1. After completing the task, push the branch to the remote repository.
2. Ensure your changes are properly tested and free of linting errors.

---

## Healthy Branches

There are two main branches in the project: **dev** and **master**.

### Development Branch (`dev`):
- This branch receives all new feature updates from the smaller issue branches.
- Code must pass basic linting and adhere to project standards before being merged into `dev`.

### Production Branch (`master`):
- This branch is reserved for production-ready code.
- Only code that has been reviewed and approved should be merged into `master`.
- Changes to `master` trigger deployments to the live production environment.

---

## Merging a Branch into `dev`

Follow these steps to merge your feature branch into `dev`:

### 1. Ensure Your Local Repository is Up-to-Date:
- First, switch to the `dev` branch and pull the latest changes:
  ```bash
  git checkout dev
  git pull origin dev
  ```

### 2. Merge Your Feature Branch:
- Merge your feature branch into the `dev` branch. Replace `feature_branch_name` with the name of your branch:
  ```bash
  git merge feature_branch_name
  ```

- If you want to create a merge commit even if a fast-forward merge is possible, use the `--no-ff` option:
  ```bash
  git merge --no-ff feature_branch_name
  ```

### 3. Resolve Any Merge Conflicts:
- If conflicts occur, Git will notify you. Open the conflicting files, resolve the conflicts, and mark them as resolved:
  ```bash
  git add <file_name>
  ```

### 4. Run Linting:
- Before pushing the merged code, ensure the code meets project quality standards:
  ```bash
  yarn lint
  ```

### 5. Push the Changes:
- Once verified, push the changes to the remote `dev` branch:
  ```bash
  git push origin dev
  ```

---

## Merging `dev` into `master`

Only when all features in the `dev` branch are reviewed and approved should they be merged into `master`. Follow these steps:

1. Switch to the `master` branch:
   ```bash
   git checkout master
   ```

2. Pull the latest changes:
   ```bash
   git pull origin master
   ```

3. Merge `dev` into `master`:
   ```bash
   git merge dev
   ```

4. Push the changes to the `master` branch:
   ```bash
   git push origin master
   ```

---

## Notes for Developers

- Always **test your code locally** before pushing to the repository.
- Maintain clean and concise commit histories. Avoid unnecessary or redundant commits.
- Follow the guidelines above to ensure a smooth and efficient workflow.

---

