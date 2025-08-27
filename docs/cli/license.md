---
title: License
---

# License

![License Screenshot](./license.png "License Screenshot")

## Introduction

The `license` option displays all listed licenses in a particular Node.js package or a local project, e.g.:

```bash
pkga license --package react
```

This command will list the licenses for the latest version of `react`.

## Options

| Argument    | Description                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| `--package` | name and version of package e.g. `react@17.0.2`, will default to latest version if no version is provided |
| `--folder`  | path to a local `package.json` on the filesystem                                                          |
| `--type`    | Which type of dependencies to traverse: `dependencies` or `devDependencies`. Defaults to `dependencies`.  |
| `--allow`   | Define an allowlist that the licenses must fulfill. Can be specified multiple times.                      |
| `--grouped` | Will group licenses by their name.                                                                        |

## Example Usages

### List licenses for a package

```bash
pkga license --package react
```

### Define an allowlist with multiple licenses

```bash
pkga license --package react --allow MIT --allow ISC
```

### Group licenses

```bash
pkga license --package react --grouped
```

### List licenses for a local project's devDependencies

```bash
pkga license --folder ./path/to/project --type devDependencies
```
