import nock from "nock";

import { GraphAPIClient } from "./client";

const url = "http://test.com";
const graphAPIClient = new GraphAPIClient({ url });

enum ContextType {
  APIThrowsError,
  APIReturnsToken
}

interface IArgs {
  userKeyId: string,
  userKeySecret: string,
}

interface IContextOptions {
  type: ContextType
  args: IArgs;
}

function getContext({ type, args }: IContextOptions): Promise<string> {
  const response = type === ContextType.APIThrowsError 
    ? {
      errors: [new Error("API Error")]
    }
    : {
      data: {
        createSessionUsingUserKey: {
          token: Object.values(args).join(","),
        },
      },
    };
  nock(url).post("/").reply(200, response);
  return graphAPIClient.getAuthToken(args.userKeyId, args.userKeySecret);
};

describe("GraphAPIClient", () => {
  describe("#getAuthToken", () => {
    it("should throw error if API throws error", async () => {
      const response = await getContext({
        type: ContextType.APIThrowsError,
        args: {
          userKeyId: "user-key-id",
          userKeySecret: "user-key-secret",
        },
      });
      await expect(response).rejects.toEqual(new Error("API Error"));
    });
    it("should return token", async () => {
      const userKeyId = "user-key-id";
      const userKeySecret = "user-key-secret";
      const response = await getContext({
        type: ContextType.APIReturnsToken,
        args: { userKeyId, userKeySecret },
      });
      await expect(response).toEqual(`${userKeyId},${userKeySecret}`);
    });
  });
});
