import axios from "axios";

export function restRequest<T>(params: { uri: string; body: string }) {
  return axios.post<T>(params.uri, params.body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
