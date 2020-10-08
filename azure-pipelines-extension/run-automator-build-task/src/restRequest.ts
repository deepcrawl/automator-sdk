import axios from "axios";

export async function restRequest<T>(params: { uri: string; body: string }) {
  return await axios.post<T>(params.uri, params.body, {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
