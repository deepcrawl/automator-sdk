import * as sinon from "sinon";

import { AutomatorSDKClient } from "@sdk/automator-sdk-client";
import { GraphAPIClientMock } from "@tests/mock/graph-api-client.mock";
import { ToolsAPIClientMock } from "@tests/mock/tools-api-client.mock";

const graphAPIClient = new GraphAPIClientMock();
const toolsAPIClient = new ToolsAPIClientMock();
const automatorSDKClient = new AutomatorSDKClient(graphAPIClient, toolsAPIClient);

const sandbox = sinon.createSandbox();
const deleteAuthTokenSpy = sandbox.spy(graphAPIClient, "deleteAuthToken");
const pollSpy = sandbox.spy(toolsAPIClient, "poll");

beforeEach(() => sandbox.resetHistory());
afterAll(() => sandbox.restore());

describe("AutomatorSDKClient", () => {
  describe("#runBuild", () => {
    it("should throw error if graph api client #getAuthToken throws error", async () => {
      await expect(
        automatorSDKClient.runBuild({
          userKeyId: "user-key-id-error",
          userKeySecret: "user-key-secret",
          testSuiteId: "test-suite-id",
        }),
      ).rejects.toEqual(new Error("user-key-id-error"));
    });

    it("should throw error and delete token if tools api client #startBuild throws error", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const testSuiteId = "test-suite-id-error";
      const ciBuildId = "ci-build-id";
      await expect(
        automatorSDKClient.runBuild({
          userKeyId,
          userKeySecret,
          testSuiteId,
          ciBuildId,
        }),
      ).rejects.toEqual(new Error(testSuiteId));
      expect(deleteAuthTokenSpy.calledOnceWith(`${userKeyId}|${userKeySecret}`)).toBe(true);
    });

    it("should throw error and delete token if tools api client #poll throws error", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const testSuiteId = "test-suite-id-build-error";
      const ciBuildId = "ci-build-id";
      await expect(
        automatorSDKClient.runBuild({
          userKeyId,
          userKeySecret,
          testSuiteId,
          ciBuildId,
        }),
      ).rejects.toEqual(new Error("build-id-error"));
    });

    it("should not poll and delete token in the end if start build option is set", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const testSuiteId = "test-suite-id";
      const ciBuildId = "ci-build-id";
      await automatorSDKClient.runBuild({
        userKeyId,
        userKeySecret,
        testSuiteId,
        ciBuildId,
        isStartOnly: true,
      });
      expect(pollSpy.notCalled).toBe(true);
      expect(deleteAuthTokenSpy.calledOnceWith(`${userKeyId}|${userKeySecret}`)).toBe(true);
    });

    it("should delete token in the end", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const testSuiteId = "test-suite-id";
      const ciBuildId = "ci-build-id";
      await automatorSDKClient.runBuild({
        userKeyId,
        userKeySecret,
        testSuiteId,
        ciBuildId,
      });
      expect(deleteAuthTokenSpy.calledOnceWith(`${userKeyId}|${userKeySecret}`)).toBe(true);
    });
  });
});
