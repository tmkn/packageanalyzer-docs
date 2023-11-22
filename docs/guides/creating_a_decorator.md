# Creating a Decorator

As pointed out in the core concepts section for [Decorators](../core_concepts/decorator.md), they are used to gather additional custom data that you want to have available when inspecting a package.

## Interface

At its core the `Decorator` must match an object with the following shape:

```typescript
interface IDecorator<T> {
    readonly key: string;
    readonly name: string;
    apply: (args: IApplyArgs) => Promise<T>;
}
```

### `key`

A key to distinguish the Decorator, used to query the data that was collected

### `name`

A human readable version of the key for the Decorator

Used by the logger to prefix messages.

### `apply` method

The `apply` method is asynchronous, it should return a `Promise` with the custom data that should be stored.

It gets called with an argument with the following shape:

#### Argument

```typescript
export interface IApplyArgs {
    p: Package; //The current Package
    logger: (msg: string) => void; //Method to log messages
}
```

## Querying data

To get the data you use the `getDecoratorData` method on the `Package` class.

```typescript
const data = pkg.getDecoratorData("decorator_key");
```

> Note that `getDecoratorData` will throw if the key doesn't exist, as outlined [here](../core_concepts/package.md#querying-custom-data)!

## Example

For the sake of this tutorial we will simply calculate and store the depth of the package in the dependency tree.

```javascript
class DependencyDepthDecorator {
    key: "depthdecorator";
    name: "Depth Decorator";

    async apply({ p }) {
        let current = p;
        let depth = 0;

        //walk up all the way to the root
        while(current.parent) {
            depth++;
            current = current.parent;
        }

        //return the data you want to collect
        return {
            depth;
        }
    }
}
```

### Querying the data

```javascript
try {
    const { depth } = p.getDecoratorData("depthdecorator"); //key needs to match

    console.log(`Dependency ${p.fullName} was found at depth ${depth} in the dependency tree`);
    //e.g "Dependency foo@1.2.3 was found at depth 3 in the dependency tree"
} catch {
    //depth data couldn't be found
}
```
