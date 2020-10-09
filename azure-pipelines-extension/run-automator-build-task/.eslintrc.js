module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    createDefaultProgram: true,
    ecmaVersion: 2018,
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
        "no-console": "off",
        "no-process-exit": "off",
      },
    },
  ],
  settings: {
    "import/internal-regex": "^@(graphql|helpers|src)/",
  },
};
