import { AxiosResponse } from "axios";
import { restRequest } from "./restRequest";

export async function getResults(
  uri: string,
  buildId: string,
  token: string,
): Promise<AxiosResponse<{ passed: boolean }>> {
  const bodyPoll = {
    authToken: token,
    buildId,
  };

  const params = {
    uri,
    body: JSON.stringify(bodyPoll),
  };

  const resultResponse = await restRequest<{ passed: boolean }>(params);
  return resultResponse;
}
