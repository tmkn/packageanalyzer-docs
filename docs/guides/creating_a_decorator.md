# Creating a Decorator

As pointed out in the core concepts section for [Decorators](../core_concepts/decorator.md), they are used to gather additional custom data that you want to have available when inspecting a package.

## Interface
At its core the `Decorator` needs an object with the following shape:

```typescript
interface IDecorator<T> {
    readonly key: string;
    readonly name: string;
    apply: (p: Package, logger: (msg: string) => void) => Promise<T>;
}
```

### `key`
A key to distinguish the Decorator, also used to query the data that was collected

### `name`
A human readable version of the key for the Decorator

Used during logging to make it more readable.

### `apply` method
#### Arguments
| Argument | Description |
| --- | -----------|
| p | todo |
| logger | todo |

## Querying data
To get the data you use the `getDecoratorData` method on the `Package` class.

```typescript
const data = pkg.getDecoratorData("decorator_key");
```
> Note that `getDecoratorData` will throw if the key doesn't exist!

## Example
