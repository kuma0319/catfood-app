//indexページをSSGで表示する場合の設計
import axios from "axios";
import { GetStaticProps } from "next";

import RootLayout from "@/components/commons/Layout";
import FoodIndex from "@/components/products/FoodIndex";
import { foodsIndexUrl } from "@/urls";

import { FoodData } from "../../types/foods";

//indexページをSSGでフェッチ
export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}${foodsIndexUrl}`
  );

  return {
    props: {
      data: response.data,
    },
  };
};

const Index = ({ data }: { data: FoodData }) => {
  return (
    <RootLayout>
      <FoodIndex data={data} />
    </RootLayout>
  );
};

export default Index;
