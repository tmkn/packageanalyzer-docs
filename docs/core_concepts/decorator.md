---
sidebar_position: 2
title: Decorator
---

# Decorator
## Intro
While the `packageanalyzer` itself only collects the `package.json` during the traversal of the dependency tree, it's the `Decorator` that adds any custom data along the way.

This data is then also made available in the [Package](./package.md) class.

For example if you want to add the weekly download numbers of a package, you would do it with a `Decorator`.

See [Using Custom Reports](../guides/custom_reports.md) for a more indepth explanation of its usage.