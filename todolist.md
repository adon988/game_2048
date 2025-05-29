# 2048 遊戲任務清單
5.  **SEO 優化：**
    *   [x] 調整 `public/index.html` 語言屬性為 zh-Hant。
    *   [x] 修改 title 為「2048 遊戲」。
    *   [x] 更新 meta description 為遊戲介紹。
    *   [x] 新增 meta keywords。
    *   [x] 新增 canonical 標籤。
    *   [x] 新增 Open Graph 標籤（og:title、og:description、og:type、og:url、og:image）。
    *   [x] favicon 路徑確認。

1.  **建立核心組件：**
    *   [ ] 重建 `my-2048-game/src/components/Game.js`，包含遊戲板的初始化、滑動操作和合併數字的邏輯。
    *   [x] 重建 `my-2048-game/src/App.js`，確保它正確渲染 `Game` 組件。
    *   [x] 重建 `my-2048-game/src/index.js`，確保它正確渲染 `App` 組件。
    *   [x] 重建 `my-2048-game/src/component/Game.js` 讓他可以提供 `Game` 組件功能。
2.  **建立測試檔案：**
    *   [x] 確保 `my-2048-game/src/Game.test.js` 包含必要的測試案例。
3.  **產生規格文件和任務清單：**
    *   [x] 建立 `spec.md`，其中包含流程圖、關聯圖和循序圖等 UML 圖表。
    *   [x] 建立 `todolist.md`，其中包含重建 2048 遊戲的任務清單。
4.  **樣式調整：**
    *   [x] 調整 `my-2048-game/src/App.css` 和 `my-2048-game/src/index.css`，使遊戲界面更美觀。
- 檢查 build/index.html favicon 路徑
- 建議 package.json 設定 homepage
- nginx 設定 root 指向 build，並加上 try_files
- 驗證 favicon 路徑是否正確
- 提供 nginx 標準設定範例，說明 root、try_files 及 favicon 處理
- nginx.conf 範例（含註解）：

```
server {
    listen 80;
    server_name your-domain.com;

    # 指向 React build 產生的靜態檔案目錄
    root /path/to/your/project/my-2048-game/build;

    # favicon 與其他靜態資源直接回應
    location /favicon.ico {
        try_files $uri =404;
    }
    location /static/ {
        try_files $uri =404;
    }

    # 前端路由全部導向 index.html
    location / {
        try_files $uri /index.html;
    }
}
```