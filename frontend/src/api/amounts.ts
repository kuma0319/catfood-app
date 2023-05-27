import { amountsIndex } from "@/urls";

//配列の中身のプロパティの型定義
interface Amount {
  id: number;
  amount: number;
  food_id: number;
  price: number;
}

//配列の定義
export type AmountData = Amount[];

//JSONデータの形式そのもの
interface AmountResponse {
  amounts: AmountData;
}

const fetchAmounts = async (): Promise<AmountData> => {
  //APIから生データをフェッチ
  const response = await fetch(amountsIndex);
  //JSONデータとして解釈
  const result = (await response.json()) as AmountResponse;
  return result.amounts;
};

export default fetchAmounts;
