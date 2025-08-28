# Creating an Attachment

As pointed out in the core concepts section for [Attachments](../core_concepts/attachment.md), they are used to gather additional custom data that you want to have available when inspecting a package.

## The Attachment Function

At its core, an `Attachment` is an asynchronous function that takes an object with the current package and a logger, and returns the data you want to attach.

```typescript
type AttachmentFn<T> = (args: IApplyArgs) => Promise<T>;
```

The `IApplyArgs` interface has the following shape:

```typescript
export interface IApplyArgs {
    p: SimplePackage; // The current Package
    logger: (msg: string) => void; // Method to log messages
}
```

The `SimplePackage` is a stripped-down version of the `Package` class, containing only the essential properties like `name`, `version`, and the `getData` method.

## Querying data

To get the data you use the `getAttachmentData` method on the `Package` class.

```typescript
const data = pkg.getAttachmentData("attachment_key");
```

> Note that `getAttachmentData` will throw if the key doesn't exist, as outlined [here](../core_concepts/package.md#querying-custom-data)!

## Example

For the sake of this tutorial, we will create an attachment that calculates and stores the depth of the package in the dependency tree.

```javascript
const dependencyDepthAttachment = async ({ p }) => {
    let current = p;
    let depth = 0;

    // walk up all the way to the root
    while (current.parent) {
        depth++;
        current = current.parent;
    }

    // return the data you want to collect
    return {
        depth
    };
};
```

### Querying the data

```javascript
try {
    const { depth } = p.getAttachmentData("depth"); // key needs to match the key used when registering the attachment

    console.log(`Dependency ${p.fullName} was found at depth ${depth} in the dependency tree`);
    // e.g "Dependency foo@1.2.3 was found at depth 3 in the dependency tree"
} catch {
    // depth data couldn't be found
}
```
