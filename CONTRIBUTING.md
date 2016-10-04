# Contributing

## How to Contribute
1. Create an issue
2. Fix an issue and submit a PR
3. Check internal JIRA for new features and updates

## Development Process
For normal development, we follow a basic Git Flow process.

1. Pull down latest `master` branch.
2. Create a new branch named after the feature or features you intend to work on. If you're going to be making a variety of changes, use a generic branch name (can even be your name).
3. Edit and commit code. See [commit](#commit-messages) guidelines.
4. When you're ready, push up your branch and submit a PR **even if you're the lead on this project.** 
5. Summarize all changes as line-items in the PR message.

#### Commit Messages
Commits should be detailed. Use relevant keywords. If a single commit is to contain many little changes, try to group them into topical groups. 

If a commit will break to two lines, create a meaningful header + colon `:` and then add an empty line between your header and the line items contained in the commit. Example:

```bash
# with 4 changes to merge
git commit -m "Homepage slideshow updates:
>
> Increase spacing above button
> Fix prev/next button disabled states
> Smooth out image load transition
> Add touchevents handling for video on mobile"
```

#### Merging Locally
Sometimes you might want to merge a branch locally. This often happens after resolving conflicts. When doing this, **create a merge commit** using the `--no-ff` (no fast-forward) flag:
```bash
git checkout master
git merge home-slideshow --no-ff
```

This will open vim and allow you to summarize all commits contained in the merge according to [Dev Process](#development-process) / #5. Add a blank line between the "Merge ..." message and your line items.

## Versioning
There should be a person designated to manage releases and versioning. If you're unsure who this is, ask :)

Follow SemVer versioning guidelines for `patch` `minor` and `major`. To version this theme, use the following commands.

#### patch
For small fixes and additions:
```bash
npm version patch -m "{version} - released {mm/dd/yyyy} @ {mm:hh}am/pm
>
> Add notes for release here."
```

#### minor 
For new features, removals, or changes in API:
```bash
npm version minor -m "{version} - released {mm/dd/yyyy} @ {mm:hh}am/pm
>
> Add notes for release here."
```

#### major 
This will be used rarely. **Check with the lead before using this!** 

For large features, refactors, or removals:
```bash
npm version major -m "{version} - released {mm/dd/yyyy} @ {mm:hh}am/pm
>
> Add notes for release here."
```

**Important:** in all versioning cases, you must use the `--tags` flag to push them up to Gitlab.
```bash
git push origin master --tags
```
