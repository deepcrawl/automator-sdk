import { AxiosResponse } from "axios";
import { restRequest } from "./helpers/restRequest";

export function getResults(
  uri: string,
  buildId: string,
  token: string,
): Promise<AxiosResponse<{ passed: boolean }>> {
  const params = {
    uri,
    body: JSON.stringify({
      authToken: token,
      buildId,
    }),
  };

  return restRequest<{ passed: boolean }>(params);
}
