import { useEffect, useState } from "react";

interface WatchListProps {
  id: number;
  handleWatchList: (id: number, isWatched: boolean) => void;
}

const WatchListButton = ({ id, handleWatchList }: WatchListProps) => {
  //各商品のウォッチリスト用のボタンの状態管理
  const [watch, setWatch] = useState(false);
  //マウントされたかどうかの状態ingify管理
  const [mounted, setMounted] = useState(false);

  // マウント時、localStorageが存在するならlocalStorageの値でwatchを初期化
  // ※localStorageはusuEffect内で使用しないと、Hydrationエラーとなる
  useEffect(() => {
    setMounted(true);
    const localStorageWatch = localStorage.getItem(`watch-${id}`);
    const initialWatch =
      localStorageWatch !== null ? JSON.parse(localStorageWatch) : false;
    setWatch(initialWatch);
  }, []);

  const handleWatch = () => {
    setWatch(() => !watch);
  };

  useEffect(() => {
    //ボタン押下によってtrueとなった場合に、handleWatchList(id)でidを配列に格納、falseで削除
    handleWatchList(id, watch);
    //watchの状態をlocalstorageに保存する
    localStorage.setItem(`watch-${id}`, watch.toString());
  }, [watch]);

  const falseWatchButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-md border-2 border-gray-400 px-4 py-2 text-sm font-semibold text-blue-500 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:hover:border-blue-500";
  const trueWatchButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-md border-2 border-gray-400 px-4 py-2 text-sm font-semibold text-white transition-all hover: border-blue-500 bg-blue-500 hover:bg-white hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:hover:border-blue-500";
  const falseWatchButtonName = "ウォッチリストに追加";
  const trueWatchButtonName = "追加済み";
  return (
    <div className="col-span-2 flex items-center justify-end gap-4">
      {/* コンポーネントがマウントされた時点でのみボタンを表示する */}
      {mounted && (
        <button
          onClick={handleWatch}
          className={watch ? trueWatchButtonClass : falseWatchButtonClass}
        >
          {watch ? trueWatchButtonName : falseWatchButtonName}
        </button>
      )}
      <button className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-gray-400 px-4 py-2 text-sm font-semibold text-red-500 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-gray-700 dark:hover:border-red-500">
        お気に入りに追加
      </button>
    </div>
  );
};

export default WatchListButton;
