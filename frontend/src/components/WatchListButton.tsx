import { useEffect, useState } from "react";

interface WatchListProps {
  id: number;
  handleWatchList: (id: number, isWatched: boolean) => void;
}

const WatchListButton = ({ id, handleWatchList }: WatchListProps) => {
  //各商品のウォッチリスト用のボタンの状態管理
  const [watch, setWatch] = useState(false);

  const handleWatch = () => {
    setWatch(() => !watch);
  };

  //ボタン押下によってtrueとなった場合に、handleWatchList(id)でidを配列に格納、falseで削除
  useEffect(() => {
    handleWatchList(id, watch);
  }, [watch]);

  return (
    <div className="col-span-2 flex items-center justify-end gap-4">
      <button
        onClick={handleWatch}
        className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-gray-400 px-4 py-2 text-sm font-semibold text-blue-500 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:hover:border-blue-500"
      >
        ウォッチリスト
      </button>
      <button className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-gray-400 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-gray-700 dark:hover:border-red-500">
        お気に入り
      </button>
    </div>
  );
};

export default WatchListButton;
