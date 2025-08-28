---
sidebar_position: 2
title: Attachment
---

# Attachment

## Intro

While the `packageanalyzer` itself only collects the `package.json` during the traversal of the dependency tree, it's the `Attachment` that adds any custom data along the way.

An `Attachment` is a function that gets executed for each package in the dependency tree. It can be used to fetch additional data from external sources, perform calculations, or run any other custom logic. The data returned by the `Attachment` is then associated with the package and can be accessed later.

This makes it possible to enrich the package data with any information you need, for example:

- Weekly download counts from npm.
- Bundle size from a service like bundlephobia.
- Information from the GitHub repository of the package.

The data added by an `Attachment` is then made available in the [Package](./package.md) class.

## Further reading

Please see [Creating an Attachment](../guides/creating_an_attachment.md) to see how you can create a basic `Attachment`.
