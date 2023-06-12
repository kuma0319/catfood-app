// テスト用のライブラリをインポート
import { render, screen } from "@testing-library/react";

// テストをしたいモジュールをインポート
import AboutJest from "@/pages/about_jest";

// テストの説明
describe("AboutJest", () => {
  // テストケース
  it("Hello World!が表示されていること", () => {
    // About（about_jest.tsx）を出力
    render(<AboutJest />);
    // screen.getByTextで文字列を検索し、toBeInTheDocument()で存在確認
    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });
});