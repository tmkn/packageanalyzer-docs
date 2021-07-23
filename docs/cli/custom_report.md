---
title: Report
---
# Report 
`todo add screenshot`
## Introduction
The `report` option lets you run a custom check, extending the built in functionality e.g.:
```
pkga report --config ./path/to/report.js
```
Please see [Using Custom Reports](../guides/custom_reports.md) on how to use custom reports.

## Options
Argument | Description
--- | ---
`--config` | path to a `JavaScript` file that contains a custom report object.

## Example Usages
### Run a custom report
```
pkga report --config ./path/to/report.js
```