---
sidebar_position: 3
title: Package
---

# Package

## Intro

The `Package` class is the center piece of the `packageanalyzer`.

After an analysis you will get a single `Package` class.

This class is in itself nested and represents the underlying dependency tree.

It's purpose is to provide utility functions to query this (dependency) tree and to also access data from the corresponding `package.json` as well as any `Decorator` data that was added.

## Querying the dependency tree

Since the `Package` class is nested in structure, you can iterate over the whole dependency tree (by executing it on the root node) or just a subtree with the same method:

```typescript
    visit: (callback: (dependency: T) => void, includeSelf: boolean, start: T) => void;
```

Additionally there are utility methods to find packages based on the name:

```typescript
    getPackagesBy: (filter: (pkg: T) => boolean) => T[];
    getPackagesByName: (name: string, version?: string) => T[];
    getPackageByName: (name: string, version?: string) => T | null;
```

## Querying package.json data

To query `package.json` data you can use the `getData` method:

```typescript
    getData(key: string): unknown;
```

You can use `.` notation, so given this sample `package.json`:

```json title="package.json"
{
  "name": "my_package",
  "description": "",
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

you can simply write `getData("scripts.test")` to easily get the value of the `test` entry.

## Querying custom data {#querying-custom-data}

Custom data can be attached via a [`Decorator`](./decorator.md).

To retrieve the data simply provide the key for that specific `Decorator` to the `getDecoratorData` method:

```typescript
const data = getDecoratorData("decorator_key");
```

> Note that `getDecoratorData` will throw if the key doesn't exist!

This was a conscious design decision so that destructuring can be used in a TypeScript environment:

```typescript
const { published } = getDecoratorData("decorator_key");
```

Otherwise TypeScript would **rightfully** complain that it cannot deconstruct the value as it might be `undefined`.

So to ensure the added DX that destructuring brings, this design decision was taken.
