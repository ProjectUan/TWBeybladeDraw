# TW Beyblade Draw｜Funbox 抽陀螺 LINE 快速抽選頁

網址：https://osuan.dev/BeybladeX/Draw/（原始碼：https://github.com/ProjectUan/TWBeybladeDraw）

仿 https://uxux11.github.io/funbox-line/ 製作的單頁網站，手機上可在 LINE 與瀏覽器之間快速來回切換抽陀螺。純靜態，無後端、不蒐集任何資料，已抽紀錄只存在自己手機的瀏覽器。

## 致謝與資料來源
- 商品抽選連結來源：[uxux11/funbox-line](https://uxux11.github.io/funbox-line/)，本站只是自動同步並重新排版，感謝原維護者。
- 各門市 FB 粉絲頁與 LINE 官方帳號為 Funbox 公開資訊，如需下架或修正請開 Issue。
- 本專案與 Funbox / 麗嬰國際、TAKARA TOMY 無關，純粹玩家自用工具。

## 授權
MIT，見 [LICENSE](LICENSE)。

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 網頁本體（抽選頁、門市 FB/LINE 頁、管理模式） |
| `data.js` | **所有資料**：活動標題、抽選時間、各門市（縣市 / 名稱 / LINE ID / FB 粉絲頁 / 開抽時間）與商品抽選連結 |
| `scripts/sync_data.py` / `sync.bat` | 從來源同步最新連結進 `data.js` |
| `.github/workflows/sync.yml` | 排程自動同步（GitHub Actions） |

## 部署

只需要 `index.html` 與 `data.js` 兩個檔案，放到網站任何子目錄都可以（例如 `/BeybladeX/Draw/`），網址有無結尾斜線皆可。

若要用 GitHub Pages：Settings → Pages → Source 選 `Deploy from a branch`，Branch `main` / `/ (root)`。`index.html` 用 `data.js?v=20260911` 載入資料，若更新後手機看到舊資料，把 `v=` 後面的數字改掉即可強制重新下載。

## 自動更新（不用人工）

商品抽選連結的來源是 https://uxux11.github.io/funbox-line/ （該站有開 CORS），有兩層自動化：

1. **網頁端即時同步（預設開）**：開頁時、每 10 分鐘、切回頁面超過 10 分鐘時，直接抓來源合併顯示；FB 粉專與 LINE ID 仍以 `data.js` 為準。抓不到就顯示上次同步的快取，再不行才用 `data.js`。標題下方會顯示「✔ 已同步來源」，也可按「🔄 同步最新」。管理頁可關閉。
2. **GitHub Actions 排程備份**：`.github/workflows/sync.yml` 在台灣時間週四 09:00 到週五 14:00 每小時跑 `scripts/sync_data.py`，有變動就把最新連結寫進 `data.js` 並 commit（同時換 `data.js?v=` 讓手機不吃舊快取）。這樣就算來源站掛了，倉庫裡也有最後一版；若網站是手動上傳到 osuan.dev，偶爾把倉庫最新的 `data.js` 重新上傳即可，平常靠網頁端即時同步就夠。推上 GitHub 後到 Actions 分頁可手動 Run workflow。

本機也能跑：雙擊 `sync.bat`（或 `python scripts/sync_data.py`）。

限制：來源站若改版（class 名稱變動）解析會得到 0 間門市，腳本會放棄更新不動 `data.js`；若來源站停止維護，就需要改用下方手動方式。直接抓各店 FB 貼文需要登入且違反 FB 規範，沒有做。

## 手動更新連結（兩種方式）

### A. 直接改 `data.js`
```js
window.FUNBOX_DATA = {
  "title": "9/11 9/12 抽陀螺",
  "period": "2026/09/11 11:00~2026/09/12 21:00",
  "updated": "2026/09/11 11:24",
  "missing": ["Funbox 花蓮遠東店（沒有進貨）"],
  "stores": [
    {
      "id": "s01",              // 固定不要改，鎖定門市 / 已抽紀錄靠它
      "city": "台北市",
      "name": "Funbox-南港潤泰店",
      "lineId": "@924tguor",    // LINE 官方帳號 ID 或 lin.ee 網址
      "fb": "https://www.facebook.com/...",   // 粉絲頁網址，留空會改開 FB 搜尋
      "start": "11:00",         // 開抽時間，只做篩選用
      "items": [
        { "product": "BX-00 暴風天馬3-70RA（$595）", "url": "https://lin.ee/79aYEfH" }
      ]
    }
  ]
};
```
商品名稱裡若寫 `（9/12 11:00才開始）`，時間未到會顯示灰色「尚未開始」，到時間自動變綠。

### B. 用網頁的「⚙️ 管理」頁
1. 開網頁 → 管理 → 找門市 → 直接改 FB / LINE / 商品，或按「📋 貼上 FB 貼文解析」把門市貼文整段貼進去，會自動抓出「商品名 + lin.ee 連結」。
2. 改完會立刻存在**該瀏覽器**（抽選頁會出現黃色提示）。
3. 按「⬇ 下載 data.js」→ 覆蓋到網站的 `data.js` → 推上去，所有人就更新了。
4. 換新活動時可先按「🧹 清空所有商品連結」，門市 / FB / LINE 都會保留。

## 使用者端功能
- 縣市 / 商品型號 / 開抽時間篩選，選擇會記住。
- ⭐ 鎖定門市：在門市頁或抽選頁按 ☆，抽選頁選「我的門市」只會出現這些店。
- 連續抽選：按「開啟抽選」跳 LINE → 切回瀏覽器自動標記完成並排好下一個 → 再按「下一個」。底部固定操作列，不用捲動。
- 已抽紀錄以「抽選時間」為 key，換活動自動歸零；也可手動重設或逐筆「復原」。
