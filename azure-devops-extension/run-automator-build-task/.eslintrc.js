module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    createDefaultProgram: true,
    ecmaVersion: 2019,
    project: ["./tsconfig.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    node: true,
  },
  extends: ["deepcrawl"],
  overrides: [
    {
      files: ["**/*.ts"],
      rules: {
        "no-process-exit": "off",
      },
    },
    {
      files: ["**/*.integration.ts", "**/*.mock.ts", "**/*.test.ts", "**/__tests__/**"],
      rules: {
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/require-await": "off",
        "clean-code/feature-envy": "off",
        "node/no-unpublished-import": "off",
        "sonarjs/cognitive-complexity": "off",
        "sonarjs/no-duplicate-string": "off",
        "sonarjs/no-identical-functions": "off",
        "max-classes-per-file": "off",
        "max-lines-per-function": "off",
      },
    },
  ],
  settings: {
    "import/internal-regex": "^@(common|sdk|tests|src)/",
  },
};
