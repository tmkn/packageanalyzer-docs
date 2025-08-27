# Writing custom lint rules

The [`lint`](../cli/lint/index.md) command takes lint rules as input.

The rules are configured in a config file. This can be a JavaScript or a TypeScript file.

```typescript title="lintConfig.ts"
import type { ILintCheck } from "@tmkn/packageanalyzer";

const hasDescriptionCheck: ILintCheck = {
    name: `has-description`,
    check: (pkg: any) => {
        const description = pkg.getData("description");

        if (!description) return `No description found!`;
    }
};

export default {
    rules: [["warning", hasDescriptionCheck]]
};
```

## `rules` array

The `rules` array contains tuples of the following format:

```typescript
type Rule = ["warning" | "error", ILintCheck, any?];
```

The first element is the severity (`warning` or `error`). The second element is the lint check itself. The optional third element is for parameters.

The difference between `warning` and `error` is that `error` will exit with an error code > 0, making it suitable to run in CI environments.

## `ILintCheck` Interface

The `ILintCheck` interface defines the actual logic for a given rule. It is called for every package in the dependency tree.

```typescript title="ILintCheck"
import type { ZodType } from "zod";

export interface ILintCheck<T = any> {
    name: string;
    check: (pkg: any, params: T) => string | string[] | void | Promise<string | string[] | void>;
    checkParams?: () => ZodType<T>;
    attachments?: any;
}
```

- `name`: The name of the check.
- `check`: The function that performs the lint check. It receives the current package `pkg` and any defined `params`. To report a violation, simply return a `string` or `string[]`. If you don't return anything, it means the rule passed.
- `checkParams` (optional): A function that returns a `zod` schema for validating the parameters passed to the `check` function.
- `attachments` (optional): An object defining any attachments that need to be resolved before the `check` function is called.

## Using Parameters and `checkParams`

You can make your rules more flexible by using parameters. The parameters are passed as the third element in the rule tuple.

To ensure type safety and to validate the parameters, you can use the `checkParams` method. This method should return a `zod` schema.

Here's an example of a generic `has-key` rule that checks for the existence of a given key in `package.json`:

```typescript title="lintConfig.ts"
import { z } from "zod";
import type { ILintCheck } from "@tmkn/packageanalyzer";

const hasKeyCheck: ILintCheck<string> = {
    name: `has-key`,
    checkParams: () => z.string(),
    check: (pkg: any, key) => {
        const data = pkg.getData(key);

        if (!data) return `Key "${key}" is missing in package.json`;
    }
};

export default {
    rules: [
        ["warning", hasKeyCheck, "description"],
        ["error", hasKeyCheck, "license"]
    ]
};
```

## Using Attachments with Lint Rules

Attachments allow you to fetch additional data and use it in your lint checks. You can define the attachments a rule needs using the `attachments` property in the `ILintCheck` object.

The `packageanalyzer` will ensure that the attachments are resolved before the `check` function is called. You can then access the attachment data using the `getAttachmentData` method on the `pkg` object.

Here's an example of a rule that uses an attachment to check the weekly download count of a package from the npm API:

```typescript title="lintConfig.ts"
import type { ILintCheck, AttachmentFn } from "@tmkn/packageanalyzer";

interface INpmDownloadsData {
    downloads: number;
}

const npmDownloadsAttachment: AttachmentFn<INpmDownloadsData> = async ({ p, logger }) => {
    const url = `https://api.npmjs.org/downloads/point/last-week/${p.name}`;
    logger(`Fetching download count from ${url}`);
    const response = await fetch(url);
    const data = await response.json();

    return data;
};

const popularPackageCheck: ILintCheck = {
    name: `popular-package-check`,
    attachments: {
        npmDownloads: npmDownloadsAttachment
    },
    check: (pkg: any) => {
        const { npmDownloads } = pkg.getAttachmentData();

        if (npmDownloads.downloads < 1000) {
            return `Package has less than 1000 downloads in the last week`;
        }
    }
};

export default {
    rules: [["warning", popularPackageCheck]]
};
```

## Throwing exceptions

If you throw an exception inside the lint logic, it will be caught and displayed as `internal-error`. The exit code will also be set to > 0, even if all checks were `warnings`.
