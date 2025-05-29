# 2048 遊戲 (React 版)

## 介紹
本專案為以 React 製作的 2048 經典益智遊戲，支援鍵盤操作、分數計算、遊戲重啟，並針對同步問題進行最佳化。

## 功能特色
- 支援上下左右鍵移動方塊
- 分數自動累加
- 遊戲結束提示
- Restart 按鈕美化
- 狀態同步安全（setGrid callback 實作）
- 隱藏游標避免操作干擾

## 安裝與啟動

```bash
cd my-2048-game
npm install
npm start
```

瀏覽器開啟 [http://localhost:3000](http://localhost:3000) 即可遊玩。

## 檔案結構
- `src/components/Game.js`：主遊戲邏輯與 UI
- `src/components/Game.css`：遊戲樣式
- `src/App.js`：應用入口
- `src/index.js`：React 入口

## 開發重點
- 使用 setGrid(prevGrid => ...) 確保狀態正確同步
- 各方向移動皆有正確矩陣轉換
- 具備詳細 function 級註解與 log，方便除錯

## 貢獻
歡迎 PR 與 issue 討論改進！

## 授權
MIT License
