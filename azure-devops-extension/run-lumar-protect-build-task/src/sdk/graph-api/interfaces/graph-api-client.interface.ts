export interface IGraphAPIClient {
  getAuthToken(userKeyId: string, userKeySecret: string): Promise<string>;
  deleteAuthToken(token: string): Promise<string>;
}
