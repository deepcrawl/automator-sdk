import { GraphQLError } from "graphql";
import * as nock from "nock";

import { GraphAPIClient } from "./client";

const url = "http://test.com";
const graphAPIClient = new GraphAPIClient({ url });

describe("GraphAPIClient", () => {
  describe("#getAuthToken", () => {
    it("should throw error if API throws error", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const error = new GraphQLError("API Error");
      nock(url).post("/").reply(200, {
        data: null,
        errors: [error]
      });
      await expect(graphAPIClient.getAuthToken(userKeyId, userKeySecret)).rejects.toEqual(error);
    });

    it("should return token", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      nock(url).post("/").reply(200, {
        data: {
          createSessionUsingUserKey: {
            token: `${userKeyId},${userKeySecret}`,
          },
        },
      });
      expect(await graphAPIClient.getAuthToken(userKeyId, userKeySecret)).toEqual(`${userKeyId},${userKeySecret}`);
    });
  });
  describe("#deleteAuthToken", () => {
    it("should throw error if API throws error", async () => {
      const token = "token";
      const error = new GraphQLError("API Error");
      nock(url).post("/").reply(200, {
        data: null,
        errors: [error]
      });
      await expect(graphAPIClient.deleteAuthToken(token)).rejects.toEqual(error);
    });

    it("should return token", async () => {
      const token = "token";
      nock(url).post("/").reply(200, {
        data: {
          deleteSession: {
            token,
          },
        },
      });
      expect(await graphAPIClient.deleteAuthToken(token)).toEqual(token);
    });
  });
});
