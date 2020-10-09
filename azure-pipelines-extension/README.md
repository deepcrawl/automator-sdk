# Automator Azure run build script

## Variables
Required variables:

```
userKeyId: <string>
userKeySecret: <string>
testSuiteId: <string>
```

Optional variable:

```
startOnly: <boolean>
ciBuildId: <string>
```

## Building the source code

```
npm install -g yarn
yarn 
yarn build
```

## Linting

```
yarn lint
```

## Creating a azure package

```
cd ..
tfx extension create --manifest-globs vss-extension.json
```
