import * as nock from "nock";

import { BuildResultPollingTimeoutError } from "@sdk/tools-api/errors/build-result-polling-timeout.error";
import { ToolsAPIClient } from "@sdk/tools-api/tools-api-client";

const baseURL = "http://test.com";
const startBuildPath = "/start_build";
const pollBuildResultsPath = "/poll";
const toolsAPIClient = new ToolsAPIClient({ baseURL, startBuildPath, pollBuildResultsPath });

describe("ToolsAPIClient", () => {
  describe("#startBuild", () => {
    it("should throw error if API throws error", async () => {
      nock(baseURL).post(startBuildPath).replyWithError("error");
      await expect(toolsAPIClient.startBuild("auth-token", "test-suite-id")).rejects.toEqual(new Error("error"));
    });

    it("should return build id", async () => {
      const authToken = "auth-token";
      const testSuiteId = "test-suite-id";
      const ciBuildId = "ci-build-id";
      const buildId = `${authToken}-${testSuiteId}-${ciBuildId}`;
      nock(baseURL)
        .post(startBuildPath)
        .reply(function (_uri, body) {
          expect(body).toEqual({
            authToken,
            testSuiteId,
            ciBuildId,
          });
          expect(this.req.headers["content-type"]).toBe("application/json");
          return [200, { buildId }];
        });
      await expect(toolsAPIClient.startBuild(authToken, testSuiteId, ciBuildId)).resolves.toEqual(buildId);
    });
  });

  describe("#poll", () => {
    it("should throw error if API throws error", async () => {
      nock(baseURL).post(pollBuildResultsPath).replyWithError("error");
      await expect(toolsAPIClient.poll("token", "build-id")).rejects.toEqual(new Error("error"));
    });

    it("should end execution if test results have been processed", async () => {
      const authToken = "auth-token";
      const buildId = "build-id";
      nock(baseURL)
        .post(pollBuildResultsPath)
        .reply(function (_uri, body) {
          expect(body).toEqual({
            authToken,
            buildId,
          });
          expect(this.req.headers["content-type"]).toBe("application/json");
          return [200, { passed: true }];
        });
      await toolsAPIClient.poll(authToken, buildId);
    });

    it("should throw error if max polling time reached", async () => {
      nock(baseURL).post(pollBuildResultsPath).reply(202);
      await expect(
        toolsAPIClient.poll("token", "build-id", 1, { pollingInterval: 1, maxPollingTime: 0 }),
      ).rejects.toEqual(new BuildResultPollingTimeoutError(0));
    });

    it("should poll correctly", async () => {
      nock(baseURL)
        .post(pollBuildResultsPath)
        .reply(function () {
          nock(baseURL)
            .post(pollBuildResultsPath)
            .reply(function () {
              expect(true).toBe(true);
              return [200, { passed: true }];
            });
          return [202];
        });
      await toolsAPIClient.poll("token", "build-id", 0, { pollingInterval: 1, maxPollingTime: 10 });
    });
  });
});
