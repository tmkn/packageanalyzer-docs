# Diff

![diff report](./diff.png "Diff Report")

## Introduction

The `diff` option lets you compare the dependency tree of 2 packages.

Useful if you want to see which packages got updated, added or removed between two versions.

```
pkga diff --range react@16.12.0 react@18.2.0
```

This command will show a diff of the dependency tree between `react@16.12.0` and `react@18.2.0`.

## Options

| Argument                | Description                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `--range <pkg1> <pkg2>` | The two packages to compare. Can be a package name with version, or just a package name for the latest version. |
| `--type`                | Which type of dependencies to traverse: `dependencies` or `devDependencies`. Defaults to `dependencies`.        |

## Example Usages

### Show diff between 2 versions

Compare dependencies of `react@16.12.0` with `react@18.2.0`:

```
pkga diff --range react@16.12.0 react@18.2.0
```

### Show diff with latest version

Compare dependencies of `react@16.12.0` with the latest version of `react`:

```
pkga diff --range react@16.12.0 react
```

### Show diff for devDependencies

Compare devDependencies of `react@16.12.0` with `react@18.2.0`:

```
pkga diff --range react@16.12.0 react@18.2.0 --type devDependencies
```
