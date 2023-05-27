"use client";

// 必要なコンポーネントをインポート
import type { NextPage } from "next";
import { useState } from "react";

// バックエンドのAPIからJSON形式のデータを取得する関数を追加
interface JsonData {
  id: number;
  title: string;
  text: string;
}

type JsonDataResponse = JsonData[];

const FetchTestApi = async (): Promise<JsonDataResponse> => {
  // バックエンドのAPI「http://localhost/api/v1/test」からデータを取得
  const res = await fetch("http://localhost/api/v1/foods");
  // 取得したデータをJSON形式に変換
  const result = (await res.json()) as JsonDataResponse;
  return result;
};
// メイン処理
const Test: NextPage = () => {
  // useStateで初期値をdisplayDataに設定
  const [displayData, setDisplayData] = useState("初期値を表示");

  // バックエンドのAPIからJSON形式のデータを取得し、
  // 取得したデータをdisplayDataに設定する関数
  const getTestApi = async () => {
    const jsonData = await FetchTestApi();
    // 取得した値を文字列型に変換してから設定
    setDisplayData(JSON.stringify(jsonData));
  };

  // 関数「getTestApi」を実行
  getTestApi();
  // 画面にdisplayDataの値を表示
  return <div>{displayData}</div>;
};

export default Test;
