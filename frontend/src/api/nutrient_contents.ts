import { nutrient_contentsIndex } from "@/urls";

//配列の中身のプロパティの型定義
interface NutrientContent {
  id: number;
  food_id: number;
  nutrient_content: string;
  nutrient_id: number;
}

//配列の定義
export type NutrientContentData = NutrientContent[];

//JSONデータの形式そのもの
interface NutrientContentResponse {
  nutrient_contents: NutrientContentData;
}

const fetchNutrientContents = async (): Promise<NutrientContentData> => {
  //APIから生データをフェッチ
  const response = await fetch(nutrient_contentsIndex);
  //JSONデータとして解釈
  const result = (await response.json()) as NutrientContentResponse;
  return result.nutrient_contents;
};

export default fetchNutrientContents;
