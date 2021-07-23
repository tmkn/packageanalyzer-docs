---
sidebar_position: 2
title: Getting started
---

# Getting started

## Install the library
Simply install the `@tmkn/packageanalyzer` package.
```shell
npm install @tmkn/packageanalyzer

# or

yarn add @tmkn/packageanalyzer
```

## Using the CLI
After the install, the packageanalyzer is available via `pkga`:
```shell
npx pkga

# or

yarn pkga
```

### Running you first command
Now you can run the `analyze` command to easily introspect packages:
```shell
npx pkga analyze --package react

# or

yarn pkga analyze --package react
```

See [CLI Intro](./cli/intro.md) for more options about the functionality of the CLI.

## Using the API
See [Using Custom Reports](./guides/custom.reports.md) to get started with using the `packageanalyzer` programmatically.