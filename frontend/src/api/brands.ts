import { brandsIndex } from "@/urls";

//配列の中身のプロパティの型定義
interface Brand {
  id: number;
  brand: string;
}

//配列の定義
export type BrandData = Brand[];

//JSONデータの形式そのもの
interface BrandResponse {
  brands: BrandData;
}

const fetchBrands = async (): Promise<BrandData> => {
  //APIから生データをフェッチ
  const response = await fetch(brandsIndex);
  //JSONデータとして解釈
  const result = (await response.json()) as BrandResponse;
  return result.brands;
};

export default fetchBrands;
