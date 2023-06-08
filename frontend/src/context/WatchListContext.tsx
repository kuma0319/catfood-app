import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

import { FoodIdArray, useWatchList } from "@/hooks/useWatchList";

// useWatchListフックの戻り値の型を記載(valueに必要)
type WatchListContextType = {
  handleWatchList: (id: number, isWatched: boolean) => void;
  setWatchListFoodId: Dispatch<SetStateAction<FoodIdArray>>;
  watchListFoodId: FoodIdArray;
};

// contextを作成
export const WatchListContext = createContext<WatchListContextType | undefined>(
  undefined
);

// 共有したいvalueを持った親contextで子要素をラップ
export const WatchListProvider = ({ children }: { children: ReactNode }) => {
  const watchList = useWatchList();
  return (
    <WatchListContext.Provider value={watchList}>
      {children}
    </WatchListContext.Provider>
  );
};
