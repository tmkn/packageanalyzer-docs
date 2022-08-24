---
sidebar_position: 1
---

# Using Custom Reports
The `reports` command enables you to customize and extend the behavior of the package analyzer.
In fact all provided commands of the CLI are `Reports` themselves.

It is consumed via a JavaScript file that exports a configuration object, in the simplest form it looks like this:
```typescript
module.exports = {
    reports: [] //array of reports that you want to have run
}
```
## Tutorial - Analyze a package and print its dependency tree
For the sake of this tutorial we want to run the `analyze` command and `tree` command in 1 go:
```
pkga analyze --package react
pkga tree --package react
```
```javascript
//customReports.js

const { AnalyzeReport, TreeReport } = require("@tmkn/packageanalyzer"); //import built in reports

//configure analyze report
const analyzeReport = new AnalyzeReport({
    package: `react`, //defaults to latest otherwise use `name@version`
    type: `dependencies`, //or `devDependencies`
    full: false, //only want a basic summary
});

//configure tree report
const treeReport = new TreeReport({
    package: `react`,
    type: `dependencies`,
});

module.exports = {
    reports: [analyzeReport, treeReport],
};

```
Then when you run:
```
pkga report --config ./customReport.js
```
It will print a summary of the package as well as its dependency tree

### Custom Logic
For the sake of this tutorial we want to find all packages that execute a `postinstall` script.
We will use a custom report for this.

A custom report is just a JavaScript class with at least the following things:
```javascript
class BasicReport {
    name = `Basic Report`; //basic name to associate the report
    pkg = [`react`]; //a tuple, will default to latest version use [`name`, `version`]

    async report(context, pkgData) {
        //pkgData contains dependency tree metadata and utility functions
        //context contains formatters to output messages to stdin & stdou

        //your custom logic here
        context.stdoutFormatter.writeLine(`Hello from my first report analyzing ${pkgData.fullName}`);
    }
}
```
This is the most basic setup.
By default it will follow the whole dependency tree, there are options to limit this behavior as well as other settings like defining whether to follow `dependencies` or `devDependencies`, see `IReport` in the code for more settings.

The `report` method is where we will define all our logic.

Since we want to find all packages that define a `postinstall` script, we need a place to store that information. We'll use a `Map` for that. The `key` is the full package name: e.g. `name@version` and the `value` is the content of the `postinstall` value. At the end we will just loop through it and print its values.
```javascript
        const postinstallPackages = new Map();
```

To see whether a `postinstall` script is defined we need to check if a `scripts.postinstall` entry is present in the `package.json`.

To loop through the dependency tree we can use the `visit` method in `pkgData`:
```javascript
        pkgData.visit(pkg => {
            //loop through dependency tree
        }, true);
```
`pkg` in the callback is of the same type as `pkgData`, in fact the whole data structure relies on this nested structure. It mirrors the dependency tree. `true` signals to also include itself in the iteration. In other words, if you're looking at React, true means it will also include React otherwise it will only iterate through its dependencies.

Now we need a way to check for the `postinstall` entry, luckily there's a convenience functions as well, `getData`. `getData` allows you to query the `package.json`. Nested values can be specified with `.` notation, so all we need to do is this:
```javascript
            const postinstallData = pkg.getData("scripts.postinstall");
```

Then we just need to check if we got something back, if yes, add it to the `postinstallPackages` map.
```javascript
            if(postinstallData) {
                postinstallPackages.set(pkg.fullName, postinstallData);
            }
```

Then after we _visited_ all packages, we print out the results:
```javascript
        stdoutFormatter.writeLine(
            `Postinstall scripts in the dependency tree of ${pkgData.fullName}: ${postinstallPackages.size}`
        );

        for (const [packageName, data] of postinstallPackages) {
            stdoutFormatter.writeLine(`→ ${packageName}: "${data}"`);
        }
```

All combined the final custom report could look like this:
```javascript
class PostinstallReport {
    name = `Postinstall Report`;
    pkg = [`react`];

    async report({ stdoutFormatter }, pkgData) {
        const postinstallPackages = new Map();

        pkgData.visit((pkg) => {
            const postinstallData = pkg.getData("scripts.postinstall");

            if (postinstallData) {
                postinstallPackages.set(pkg.fullName, postinstallData);
            }
        }, true);

        stdoutFormatter.writeLine(
            `Postinstall scripts in the dependency tree of ${pkgData.fullName}: ${postinstallPackages.size}`
        );

        for (const [packageName, data] of postinstallPackages) {
            stdoutFormatter.writeLine(`→ ${packageName}: "${data}"`);
        }
    }
}

```

But that's not very useful as it's hardcoded to React so lets fix that:
```javascript
class PostinstallReport {
    name = `Postinstall Report`;

    constructor(pkg) {
        this.pkg = pkg;
    }

    async report({ stdoutFormatter }, pkgData) {
        const postinstallPackages = new Map();

        pkgData.visit((pkg) => {
            const postinstallData = pkg.getData("scripts.postinstall");

            if (postinstallData) {
                postinstallPackages.set(pkg.fullName, postinstallData);
            }
        }, true);

        stdoutFormatter.writeLine(
            `Postinstall scripts in the dependency tree of ${pkgData.fullName}: ${postinstallPackages.size}`
        );

        for (const [packageName, data] of postinstallPackages) {
            stdoutFormatter.writeLine(`→ ${packageName}: "${data}"`);
        }
    }
}

```
Now it's not hardcoded to any particular package, also for demonstration purposes lets look at a package which does define `postinstall` scripts.

Because spoiler alert React doesn't contain any, at least not at the time of writing.
So instead lets look at `@okta/okta-auth-js`:
```javascript
//customReports.js

module.exports = {
    reports: [
        new PostinstallReport([`@okta/okta-auth-js`/*, `5.1.0`*/]),
        //etc
    ]
};

```
```
pkga report --config ./customReport.js
```
Now you should see something like this:
```
Postinstall scripts in the dependency tree of @okta/okta-auth-js@5.1.0: 2
→ core-js-pure@3.14.0: "node -e "try{require('./postinstall')}catch(e){}""
→ core-js@3.14.0: "node -e "try{require('./postinstall')}catch(e){}""
```
So here we see, that installing `@okta/okta-auth-js` will also install `core-js-pure` and `core-js` as they are part of the dependency tree and thus will also run their `postinstall` scripts unless explicitely disabled via:
```
npm config set ignore-scripts true
yarn config set ignore-scripts true
```

### Bonus
Now that we know which packages contain a `postinstall` script it would be nice to know how they got introduced aka print the dependency path.

As always the packageanalyzer got you covered. `pkgData` contains a `parent` field which points to the parent dependency (it's `undefined` for the top level package).

So to get the path we just need to follow the `parent` and collect the package name until `parent` is undefined.

So we will add a new method `path` to our `PostinstallReport` class that returns the dependency path as a string like `dep1@version → dep2@version → ...`:
```javascript
    path(pkg) {
        let current = pkg;
        let parents = [pkg.fullName];

        while (current.parent) {
            parents.push(current.parent.fullName);

            current = current.parent;
        }

        return parents.reverse().join(` → `);
    }
```

Then we just call it here:
```javascript
            if (postinstallData) {
                postinstallPackages.set(this.path(pkg), postinstallData);
            }
```

If we now run the script again it will print the following:
```
Postinstall scripts in the dependency tree of @okta/okta-auth-js@5.1.0: 2
@okta/okta-auth-js@5.1.0 → @okta/okta-idx-js@0.17.0 → @babel/runtime-corejs3@7.14.0 → core-js-pure@3.14.0: "node -e "try{require('./postinstall')}catch(e){}""
@okta/okta-auth-js@5.1.0 → core-js@3.14.0: "node -e "try{require('./postinstall')}catch(e){}""

```

Now we can see which packages contain a `postinstall` script and how they got introduced in the dependency tree.