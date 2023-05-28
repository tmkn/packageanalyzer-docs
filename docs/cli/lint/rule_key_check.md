# Lint Rule: Validate Key

```javascript
import { ValidateKey } from "@tmkn/packageanalyzer";
```

This rule allows you to validate entries (keys) in a `package.json`. Either simply check if the key exists or provide a custom validator for more fine grained validation.

## Configuration Parameters

```typescript
type ValidateKeyParams = string | IValidateKeyConfig;

interface IValidateKeyConfig {
  key: string;
  validator: (value: unknown) => boolean;
  message?: string;
}
```

## Example Usage

### Check if key exists

This will issue a warning whenever no `description` is found in the `package.json`.

```javascript title="lintConfig.js"
const { ValidateKey } = require("@tmkn/packageanalyzer");

module.exports = {
  rules: [["warning", new ValidateKey(), "description"]],
};
```

### Use a custom validator

This uses a custom validator to verify that the `description` is a string. If not an `error` will be issued.

The validator must return a boolean, `true` means validation passed, `false` means validation failed.

```javascript title="lintConfig.js"
const { ValidateKey } = require("@tmkn/packageanalyzer");

module.exports = {
    rules: [
        ["warning", new ValidateKey(), {
            key: "description",
            validator: (value) => typeof value === "string"
            message: "description is not a string"  // optionally provide a custom error message
        }]
    ]
};

```
