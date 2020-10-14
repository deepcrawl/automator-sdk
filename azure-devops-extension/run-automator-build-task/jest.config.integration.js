// eslint-disable-next-line @typescript-eslint/no-var-requires
const jestConfig = require("./jest.config.js");

module.exports = {
  ...jestConfig,
  collectCoverage: false,
  testMatch: ["<rootDir>/src/**/*.integration.ts"],
};
