"use client";

// 必要なコンポーネントをインポート
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import FetchTestApi from "@/api/test";

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
  useEffect(() => {
    getTestApi();
  }, []);
  // 画面にdisplayDataの値を表示
  return <div>{displayData}</div>;
};

export default Test;
