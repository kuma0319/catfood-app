import { production_areasIndex } from "@/urls";

//配列の中身のプロパティの型定義
interface ProductionArea {
  id: number;
  production_area: string;
}

//配列の定義
export type ProductionAreaData = ProductionArea[];

//JSONデータの形式そのもの
interface ProductionAreaResponse {
  production_areas: ProductionAreaData;
}

const fetchProductionAreas = async (): Promise<ProductionAreaData> => {
  //APIから生データをフェッチ
  const response = await fetch(production_areasIndex);
  //JSONデータとして解釈
  const result = (await response.json()) as ProductionAreaResponse;
  return result.production_areas;
};

export default fetchProductionAreas;
