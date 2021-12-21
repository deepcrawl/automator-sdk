# Travis Integration

In order to integrate with Travis, you can either use our [CLI Tools](ci-cli-tools.md) or our [Shell Scripts](ci-shell-scripts.md):

## CLI Tools

Download the CLI Tools and use the following configuration in your Travis pipeline:

```yaml
matrix:
  include:
    - language: bash
      os: linux
      dist: bionic
      sudo: false
      script: ./deepcrawl-test-linux
```

## Shell Scripts

Download the Shell Scripts and use the following configuration in your Travis pipeline:

```yaml
matrix:
  include:
    - language: bash
      os: linux
      dist: bionic
      sudo: false
      addons:
        apt:
          packages:
            - jq
      script: ./ci.sh
```
