import axios, { AxiosResponse } from "axios";

export function restRequest<T>(params: { uri: string; body: string }): Promise<AxiosResponse<T>> {
  return axios.post<T>(params.uri, params.body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
