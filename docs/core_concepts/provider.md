---
sidebar_position: 1
title: Provider
---

# Provider

## Intro

The `Provider` is responsible for fetching package information. It's the component the `packageanalyzer` uses to retrieve the `package.json` for a particular package, which is essential for building the dependency tree.

There are different kinds of providers for different sources. For example, there is a provider to fetch data from the npm registry, and another one to get data from the local file system.

## Core Interfaces

The provider system is built around two main interfaces:

### `IPackageMetaDataProvider`

This interface is responsible for fetching the metadata of a package. The metadata contains information about all the available versions of a package.

```typescript
export interface IPackageMetaDataProvider {
    getPackageMetadata(name: string): Promise<PackageMetaData | undefined>;
}
```

### `IPackageJsonProvider`

This interface is responsible for fetching the `package.json` of a specific version of a package.

```typescript
export interface IPackageJsonProvider {
    getPackageJson: (...args: PackageVersion) => Promise<IPackageJson>;
}
```

where `PackageVersion` is a tuple of `[name: string, version?: string]`.

Most providers implement both of these interfaces.
