import Axios from "axios";

const axios = Axios.create({
  // csrとssr時のリクエスト先が異なるための設定
  baseURL:
    typeof window !== "undefined"
      ? "http://localhost:3010"
      : "http://backend:3000",
  headers: { "X-Requested-With": "XMLHttpRequest" },
  withCredentials: true,
});

export default axios;
