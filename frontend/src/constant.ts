///フード検索用の定数一覧
//ブランド
export const BRAND = [
  { id: 1, name: "ネスレ" },
  { id: 2, name: "ヒルズ" },
  { id: 3, name: "ペットライン" },
  { id: 4, name: "マース" },
  { id: 5, name: "サンライズ" },
  { id: 6, name: "ロイヤルカナン" },
  { id: 7, name: "日本ペットフード" },
  { id: 8, name: "いなばペットフード" },
  { id: 9, name: "ユニ・チャーム" },
];

//フードのタイプ
export const FOOD_TYPE = [
  { id: 1, name: "ドライ" },
  { id: 2, name: "ウェット" },
  { id: 3, name: "セミモイスト" },
];

//産地
export const PRODUCTION_AREA = [
  { id: 1, name: "日本" },
  { id: 2, name: "オーストラリア" },
  { id: 3, name: "アメリカ" },
  { id: 4, name: "チェコ" },
  { id: 5, name: "オランダ" },
  { id: 6, name: "タイ" },
  { id: 7, name: "フランス" },
  { id: 8, name: "韓国" },
];

//成分
export const NUTRIENT = [
  { id: 1, name: "タンパク質" },
  { id: 2, name: "脂質" },
  { id: 3, name: "粗繊維" },
  { id: 4, name: "灰分" },
  { id: 5, name: "水分" },
];

//カロリー
export const CALORIE_RANGE = [300, 350, 400, 450, 500];

//金額
export const PRICE_RANGE = [500, 1000, 2000, 3000, 4000, 5000];

//内容量
export const AMOUNT_RANGE = [1, 2, 3, 4, 5];

//成分含有量
export const NUTRIENT_CONTENT_RANGE = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

//範囲検索用のパラメータ定数
export const RANGE_OPTION_PARAMS = [
  {
    label: "カロリー",
    max_name: "max_calorie",
    min_name: "min_calorie",
    range: CALORIE_RANGE,
    unit: "kcal/100g",
  },
  {
    label: "金額",
    max_name: "max_price",
    min_name: "min_price",
    range: PRICE_RANGE,
    unit: "円",
  },
  {
    label: "内容量",
    max_name: "max_amount",
    min_name: "min_amount",
    range: AMOUNT_RANGE,
    unit: "kg",
  },
  {
    label: "タンパク質",
    max_name: "max_protein_content",
    min_name: "min_protein_content",
    range: NUTRIENT_CONTENT_RANGE,
    unit: "%",
  },
  {
    label: "脂質",
    max_name: "max_fat_content",
    min_name: "min_fat_content",
    range: NUTRIENT_CONTENT_RANGE,
    unit: "%",
  },
  {
    label: "粗繊維",
    max_name: "max_fibre_content",
    min_name: "min_fibre_content",
    range: NUTRIENT_CONTENT_RANGE,
    unit: "%",
  },
  {
    label: "灰分",
    max_name: "max_ash_content",
    min_name: "min_ash_content",
    range: NUTRIENT_CONTENT_RANGE,
    unit: "%",
  },
  {
    label: "水分",
    max_name: "max_moisture_content",
    min_name: "min_moisture_content",
    range: NUTRIENT_CONTENT_RANGE,
    unit: "%",
  },
];

//キーワード検索のkeyWords用の型エラー用にnameの型を限定
type KeyName =
  | "food_name"
  | "not_food_name"
  | "ingredients"
  | "not_ingredients";

//キーワード検索用のパラメータ定数
export const FOOD_SEARCH_INPUT_PARAMS: Array<{
  name: KeyName;
  label: string;
  placeholder: string;
}> = [
  {
    name: "food_name",
    label: "このキーワードを「名前」に含める",
    placeholder: "名前1 名前2...",
  },
  {
    name: "not_food_name",
    label: 'このキーワードを「名前」に"含めない"',
    placeholder: "名前1 名前2...",
  },
  {
    name: "ingredients",
    label: "このキーワードを「原材料」に含める",
    placeholder: "原材料1 原材料2...",
  },
  {
    name: "not_ingredients",
    label: 'このキーワードを「原材料」に"含めない"',
    placeholder: "原材料1 原材料2...",
  },
];

//複数一致検索用のパラメータ定数
export const MULTI_OPTION_PARAMS = [
  { name: "brand_id", items: BRAND, label: "ブランド" },
  { name: "production_area_id", items: PRODUCTION_AREA, label: "産地" },
];
