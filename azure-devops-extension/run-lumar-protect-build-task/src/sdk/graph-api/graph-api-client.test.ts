import { GraphQLError } from "graphql";
import * as nock from "nock";

import { GraphAPIClient } from "./graph-api-client";

const url = "http://test.com";
const graphAPIClient = new GraphAPIClient({ url });

describe("GraphAPIClient", () => {
  describe("#getAuthToken", () => {
    it("should throw error if API throws error", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const error = new GraphQLError("API Error");
      nock(url)
        .post("/")
        .reply(200, {
          data: null,
          errors: [error],
        });
      await expect(graphAPIClient.getAuthToken(userKeyId, userKeySecret)).rejects.toEqual(error);
    });

    it("should return token", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      nock(url)
        .post("/")
        .reply(function (_uri, body) {
          expect(body).toMatchSnapshot();
          return [
            200,
            {
              data: {
                createSessionUsingUserKey: {
                  token: `${userKeyId},${userKeySecret}`,
                },
              },
            },
          ];
        });
      await expect(graphAPIClient.getAuthToken(userKeyId, userKeySecret)).resolves.toBe(
        `${userKeyId},${userKeySecret}`,
      );
    });
  });

  describe("#deleteAuthToken", () => {
    it("should throw error if API throws error", async () => {
      const token = "token";
      const error = new GraphQLError("API Error");
      nock(url)
        .post("/")
        .reply(200, {
          data: null,
          errors: [error],
        });
      await expect(graphAPIClient.deleteAuthToken(token)).rejects.toEqual(error);
    });

    it("should return token", async () => {
      const token = "token";
      nock(url)
        .post("/")
        .reply(function (_uri, body) {
          expect(body).toMatchSnapshot();
          return [
            200,
            {
              data: {
                deleteSession: {
                  token,
                },
              },
            },
          ];
        });
      await expect(graphAPIClient.deleteAuthToken(token)).resolves.toEqual(token);
    });
  });
});
