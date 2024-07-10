# Pull Request Guidelines

A Pull Request (PR) is a collaborative development tool for managing and reviewing code changes before integrating them into the main repository. When you create a PR, you request that your changes be reviewed and possibly merged into the main branch of the project.

## Branch Workflow

The project uses the feature branch approach, which is a form of version control in which each new feature or fix is ​​developed in a separate branch, isolated from the main or development branch of the project. This allows changes to be developed and tested without interfering with the stable code in the main branch.

### Permanent branches

- **main**: Main production branch.
- **development**: Integration branch for new features/fixes.

### Temporary branches

- **feature/\[descriptive name\]**: Development branch for each new feature, derived from development.
- **fix/\[descriptive name\]**: Development branch for each new feature, derived from development.

### Creating new branches

1. Create a new feature/fix branch

   ```sh
   git checkout development
   git pull origin development
   git checkout -b feature/nome-da-feature
   ```

1. Do your work
   - See the [commit guidelines](#commit-guidelines) to learn how to organize your commits.
1. When you're done, open a PR.
   - See the [submition guidelines](#submition-guidelines) to learn how to organize and submit your PRs.

## Commit guidelines

To maintain a clear and organized commit history, we follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) convention. Here are the basic rules for writing commit messages:

### Commit message format:

```sh
<type>(optional scope): <description>
[optional body]
[optional footer]
```

### Commit types

- **feat**: addition of a new feature.
- **fix**: bug fixes.
- **docs**: changes to documentation.
- **style**: formatting changes that do not affect the code.
- **refactor**: changes that improve code without fixing bugs or adding features.
- **test**: addition or correction of tests.

### Scope (optional)

- Identifies the part of the code affected, placed in parentheses after the type.

### Description

- Brief explanation of what was changed, starting with a lowercase letter and without a period.

### Body (optional)

- Detailed explanation of the commit if necessary.

### Footer (optional)

- Additional information, such as breaking changes or links to tickets/issues.

### Examples

- `feat: adds file upload functionality`
- `fix(api): fixes error in user authentication`
- `docs: updates README with installation instructions`

## Submition guidelines
