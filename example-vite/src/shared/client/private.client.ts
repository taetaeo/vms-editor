import axios from "axios";
import { LocalStorageModule } from "@/shared/modules/storage.module";

const basePath = process.env.VITE_ENV_BASE_URL;

const privateClient = axios.create({
  baseURL: basePath,
});

/**
 1. 요청 인터셉터 (2개의 콜백 함수를 받습니다.)
 */
privateClient.interceptors.request.use(
  async (config: any) => {
    return {
      ...config,
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${LocalStorageModule.get("test")}`,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 2. 응답 인터셉터 (2개의 콜백 함수를 받습니다.)
 */
privateClient.interceptors.response.use(
  (response) => {
    // 응답이 성공적으로 처리된 경우
    if (response && response.data) {
      console.info("응답을 받았습니다.");
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error.response.data;

    // return Promise.reject(error);
  }
);

export default privateClient;
