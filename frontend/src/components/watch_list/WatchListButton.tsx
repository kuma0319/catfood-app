import { useEffect, useState } from "react";

const WatchListButton = ({
  id,
  handleWatchList,
  trueWatchButtonName,
}: {
  id: number;
  handleWatchList: (id: number, isWatched: boolean) => void;
  trueWatchButtonName: string;
}) => {
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
    "inline-flex items-center justify-center gap-2 rounded-md border-2 border-emerald-400 bg-white px-4 py-[.688rem] text-sm font-medium text-black hover:bg-emerald-300 hover:text-white";
  const trueWatchButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-md border-2 border-emerald-400 bg-emerald-400 px-4 py-[.688rem] text-sm font-medium text-white hover:bg-emerald-500";
  const falseWatchButtonName = "ウォッチリストに追加";
  return (
    <div>
      {/* コンポーネントがマウントされた時点でのみボタンを表示する */}
      {mounted && (
        <button
          onClick={handleWatch}
          className={watch ? trueWatchButtonClass : falseWatchButtonClass}
        >
          {watch ? trueWatchButtonName : falseWatchButtonName}
        </button>
      )}
    </div>
  );
};

export default WatchListButton;
