import { IGraphAPIClient } from "@sdk/graph-api/interfaces/graph-api-client.interface";

export class GraphAPIClientMock implements IGraphAPIClient {
  public getAuthToken(userKeyId: string, userKeySecret: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  
  public deleteAuthToken(token: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
