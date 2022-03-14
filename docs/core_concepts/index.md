# Intro

The following section tries to explain the core concepts behind the `packageanalyzer`.

## [`Provider`](./provider.md)
The job of the `Provider` is to fetch the `package.json` for a particular package.

## [`Decorator`](./decorator.md)
The job of the `Decorator` is to collect extra data that should be made available when inspecting a package. 

## [`Package`](./package.md)
The job of the `Package` is to take the data that was provided by the `Provider` and (optionally) the `Decorator` and provide utility functions around them.

It's a nested data structure that resembles the dependency tree.