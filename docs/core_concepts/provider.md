---
sidebar_position: 1
title: Provider
---

# Provider
## Intro
The `Provider` is the place where the `packageanalyzer` goes, to retrieve the `package.json` for a particular package.

It implements the following interface:
```typescript
export interface IPackageVersionProvider {
    //load version specific data, loads latest version if no version is specified
    getPackageByVersion: (...args: PackageVersion) => Promise<INpmPackageVersion>;
    getPackagesByVersion: (modules: PackageVersion[]) => AsyncIterableIterator<INpmPackageVersion>;
}
```
where `PackageVersion` is of the following type:
```typescript
type PackageVersion = [name: string, version?: string];
```