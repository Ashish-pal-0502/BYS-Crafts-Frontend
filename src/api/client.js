import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://backend.bundelicrafts.com/api",
  // baseURL: "http://localhost:5000/api",

  headers: { Accept: "application/vnd.github.v3+json" },
});

if (typeof window !== "undefined") {
  apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await JSON.parse(sessionStorage.getItem("token"));

    if (!authToken) return;
    request.headers["x-auth-token"] = authToken;
  });
}

export default apiClient;
