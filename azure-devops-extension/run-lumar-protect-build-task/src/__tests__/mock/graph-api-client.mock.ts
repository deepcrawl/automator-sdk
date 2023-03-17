import { IGraphAPIClient } from "@sdk/graph-api/interfaces/graph-api-client.interface";

export class GraphAPIClientMock implements IGraphAPIClient {
  public getAuthToken(userKeyId: string, userKeySecret: string): Promise<string> {
    if (userKeyId === "user-key-id-error") throw new Error(userKeyId);
    return Promise.resolve(`${userKeyId}|${userKeySecret}`);
  }

  public deleteAuthToken(token: string): Promise<string> {
    return Promise.resolve(token);
  }
}
