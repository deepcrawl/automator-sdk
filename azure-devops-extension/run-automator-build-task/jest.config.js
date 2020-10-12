/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest/utils");

const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  automock: false,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/**/*.integration.ts", "!<rootDir>/src/**/*.test.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "json", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  globals: {
    "ts-jest": {
      compiler: "ttypescript",
      diagnostics: false,
      isolatedModules: false,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  setupFiles: ["./setupJest.js"],
  setupFilesAfterEnv: ["jest-extended"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.integration.ts", "<rootDir>/src/**/*.test.ts"],
};
