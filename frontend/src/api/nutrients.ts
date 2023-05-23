import { nutrientsIndex } from "@/urls";

//配列の中身のプロパティの型定義
interface Nutrient {
  id: number;
  nutrient: string;
}

//配列の定義
export type NutrientData = Nutrient[];

//JSONデータの形式そのもの
interface NutrientResponse {
  nutrients: NutrientData;
}

const fetchNutrients = async (): Promise<NutrientData> => {
  //APIから生データをフェッチ
  const response = await fetch(nutrientsIndex);
  //JSONデータとして解釈
  const result = (await response.json()) as NutrientResponse;
  return result.nutrients;
};

export default fetchNutrients;
