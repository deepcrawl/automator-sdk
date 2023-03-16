## Release

Requires: [Build](build.md)

In order to release, the following steps should be followed:

- In each of your modified task, increment the version of the task in `task.json`
- Increment the version of the extension accordingly, in `vss-extension.json`
- Package the extension:

```
yarn release
```

- Manually release the extension through Azure Devops extensions
