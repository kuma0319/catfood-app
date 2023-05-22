import { foodsIndex } from "@/urls/index";

// バックエンドのAPIからJSON形式のデータを取得する関数を追加
interface JsonData {
  id: number;
  title: string;
  text: string;
}

type JsonDataResponse = JsonData[];

const FetchTestApi = async (): Promise<JsonDataResponse> => {
  // バックエンドのAPI「http://localhost/api/v1/foods/foods」からデータを取得
  const res = await fetch(foodsIndex);
  // 取得したデータをJSON形式に変換
  const result = (await res.json()) as JsonDataResponse;
  return result;
};

export default FetchTestApi;
