# Intro

The following section tries to explain the core concepts behind the `packageanalyzer`.

## [`Provider`](./provider.md)

The job of the `Provider` is to fetch package information, like the `package.json` for a particular package.

## [`Attachment`](./attachment.md)

The job of the `Attachment` is to collect extra data that should be made available when inspecting a package.

## [`Package`](./package.md)

The job of the `Package` is to take the data that was provided by the `Provider` and (optionally) the `Attachment` and provide utility functions around them.

It's a nested data structure that resembles the dependency tree.
