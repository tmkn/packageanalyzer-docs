# Lint Rule: Validate Key

```typescript
import { ValidateKey } from "@tmkn/packageanalyzer";
```

This rule allows you to validate entries (keys) in a `package.json`. You can either simply check if the key exists or provide a custom validator for more fine-grained validation.

## Configuration Parameters

The `ValidateKey` rule accepts a parameter of type `ValidateKeyParams`, which can be either a `string` or an `IValidateKeyConfig` object.

```typescript
type ValidateKeyParams = string | IValidateKeyConfig;

interface IValidateKeyConfig {
    key: string;
    validator: (value: unknown) => boolean;
    message?: string;
}
```

This parameter is passed as the third element in the rule tuple in your lint config file.

## Example Usage

### Check if key exists

This will issue a warning whenever no `description` is found in the `package.json`.

```typescript title="lintConfig.ts"
import { ValidateKey } from "@tmkn/packageanalyzer";

export default {
    rules: [["warning", new ValidateKey(), "description"]]
};
```

### Use a custom validator

This uses a custom validator to verify that the `description` is a string. If not, an `error` will be issued.

The validator must return a boolean: `true` means validation passed, `false` means validation failed.

```typescript title="lintConfig.ts"
import { ValidateKey } from "@tmkn/packageanalyzer";

export default {
    rules: [
        [
            "error",
            new ValidateKey(),
            {
                key: "description",
                validator: (value: unknown) => typeof value === "string",
                message: "description is not a string" // optionally provide a custom error message
            }
        ]
    ]
};
```
