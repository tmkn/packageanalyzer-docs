# Lint

![Lint Command](./packagelint.jpg "Lint Command")

## Introduction

The `lint` option lets you define and run checks on the dependency tree.

If an `error` is encountered the lint process will exit with a non 0 status code.

## Config File

The checks are defined in a `javascript` file that needs to be passed to the `lint` command.

A sample config file could look like this:

```javascript title="lintConfig.js"
module.exports = {
  rules: [
    // checks go here
    [
      "warning", // warning | error
      {
        name: `sample-check`,
        check: (pkg) => {
          const description = pkg.getData("description");

          if (!description) return `No description found!`;
        },
      },
    ],
  ],
};
```

This will surface all dependencies that don't contain a `description` as `warning`;

For a more in depth explanation on how to write checks please see [this guide](../../guides/lint_rules.md).

## Options

| Argument             | Description                                                                        |
| -------------------- | ---------------------------------------------------------------------------------- |
| `--package`          | package to run the checks on, defaults to latest version if no version is provided |
| `--folder`           | path to folder that contains a local `packagejson`                                 |
| `--depth`            | depth to evaluate, if ommitted will traverse the whole dependency tree             |
| `$path/to/config.js` | path to the config file that contains the checks                                   |

## Example Usages

### Lint whole dependency tree of latest React version

```
pkga lint --package react ./path/to/config.js
```

### Lint React only with specific version

```
pkga lint --package react@16.10.2 --depth 0 ./path/to/config.js
```

### Lint local project

```
pkga lint --folder ./path/to/project ./path/to/config.js
```

## Rules

Currently there's only 1 built in rule, namely the [`Validate Key`](./rule_key_check.md) rule. This rule allows you to check for the existence of certain keys in the `package.json`. Additionally a custom validator can be also provided for more sophisticated checks.

To write custom rules please see [this guide](../../guides/lint_rules.md).