// 商品圖對照表：型號 → 圖片路徑（相對於 index.html）。
// 沒列在這裡的型號會自動嘗試 img/products/<型號>.webp，再沒有就顯示 img/placeholder.svg
// 圖片來源：https://beybladehub.app （combos / accessories），僅供玩家辨識商品用。
window.PRODUCT_IMAGES = {
  "BX-00": "img/products/BX-00.webp",  // BX-00 蒼龍神劍3-60F V2
  "BX-01": "img/products/BX-01.webp",  // 
  "BX-02": "img/products/BX-02.webp",  // 
  "BX-03": "img/products/BX-03.webp",  // 
  "BX-04": "img/products/BX-04.webp",  // 
  "BX-05": "img/products/BX-05.webp",  // 
  "BX-06": "img/products/BX-06.webp",  // 
  "BX-07": "img/products/BX-07.webp",  // 
  "BX-08": "img/products/BX-08.webp",  // BX-08 三合一對戰組
  "BX-09": "img/products/BX-09.webp",  // 
  "BX-10": "img/products/BX-10.webp",  // BX-10 極限衝擊戰鬥盤
  "BX-11": "img/products/BX-11.webp",  // 
  "BX-12": "img/products/BX-12.webp",  // 
  "BX-13": "img/products/BX-13.webp",  // 
  "BX-14": "img/products/BX-14.webp",  // 
  "BX-15": "img/products/BX-15.webp",  // 
  "BX-16": "img/products/BX-16.webp",  // 
  "BX-17": "img/products/BX-17.webp",  // 
  "BX-18": "img/products/BX-18.webp",  // BX-18 X旋風發射器
  "BX-19": "img/products/BX-19.webp",  // 
  "BX-20": "img/products/BX-20.webp",  // 
  "BX-21": "img/products/BX-21.webp",  // 
  "BX-22": "img/products/BX-22.webp",  // 
  "BX-23": "img/products/BX-23.webp",  // 
  "BX-24": "img/products/BX-24.webp",  // 
  "BX-25": "img/products/BX-25.webp",  // 
  "BX-26": "img/products/BX-26.webp",  // BX-26 獨角刺心
  "BX-27": "img/products/BX-27.webp",  // 
  "BX-28": "img/products/BX-28.webp",  // 
  "BX-29": "img/products/BX-29.webp",  // 
  "BX-30": "img/products/BX-30.webp",  // BX-30 發射器握把（黑紅）
  "BX-31": "img/products/BX-31.webp",  // 
  "BX-32": "img/products/BX-32.webp",  // 
  "BX-33": "img/products/BX-33.webp",  // BX-33 皓戰猛虎
  "BX-34": "img/products/BX-34.webp",  // 
  "BX-35": "img/products/BX-35.webp",  // BX-35 隨機強化組Vol.04
  "BX-36": "img/products/BX-36.webp",  // BX-36 巨鯨怒濤 隨機強化組
  "BX-37": "img/products/BX-37.webp",  // BX-37 雙重極限衝擊戰鬥盤 豪華組
  "BX-38": "img/products/BX-38.webp",  // BX-38 赫燃天鳳
  "BX-39": "img/products/BX-39.webp",  // 
  "BX-40": "img/products/BX-40.webp",  // 
  "BX-41": "img/products/BX-41.webp",  // BX-41 發射器握把（黑/透紅）
  "BX-42": "img/products/BX-42.webp",  // 
  "BX-43": "img/products/BX-43.webp",  // 
  "BX-44": "img/products/BX-44.webp",  // BX-44 三角強襲
  "BX-45": "img/products/BX-45.webp",  // BX-45 武士魂斬
  "BX-46": "img/products/BX-46.webp",  // 
  "BX-47": "img/products/BX-47.webp",  // 
  "BX-48": "img/products/BX-48.webp",  // BX-48 隨機強化組Vol.09
  "BX-49": "img/products/BX-49.webp",  // 
  "BX-50": "img/products/BX-50.webp",  // BX-50 天堂日輪 隨機強化組
  "BX-51": "img/products/BX-51.webp",  // 
  "BX-52": "img/products/BX-52.webp",  // 
  "BX-53": "img/products/BX-53.webp",  // 
  "BX-56": "img/products/BX-56.webp",  // 
  "BX-57": "img/products/BX-57.webp",  // 
  "BXA-03": "img/products/BXA-03.webp",  // 
  "BXA-04": "img/products/BXA-04.webp",  // 
  "BXA-05": "img/products/BXA-05.webp",  // 
  "BXA-06": "img/products/BXA-06.webp",  // 
  "BXG-00": "img/products/BXG-00.webp",  // 
  "BXG-01": "img/products/BXG-01.webp",  // BXG-01 烈焰飛鳳S
  "BXG-02": "img/products/BXG-02.webp",  // 
  "BXG-04": "img/products/BXG-04.webp",  // BXG-04 銀牙烈虎S
  "BXG-06": "img/products/BXG-06.webp",  // 
  "BXG-07": "img/products/BXG-07.webp",  // 
  "BXG-11": "img/products/BXG-11.webp",  // 
  "BXG-13": "img/products/BXG-13.webp",  // 
  "BXG-20": "img/products/BXG-20.webp",  // 
  "BXG-21": "img/products/BXG-21.webp",  // 
  "BXG-22": "img/products/BXG-22.webp",  // BXG-22 龍騎士S
  "BXG-29": "img/products/BXG-29.webp",  // 
  "BXG-30": "img/products/BXG-30.webp",  // 
  "BXG-33": "img/products/BXG-33.webp",  // 
  "BXG-34": "img/products/BXG-34.webp",  // 
  "BXG-36": "img/products/BXG-36.webp",  // 
  "BXG-37": "img/products/BXG-37.webp",  // 
  "BXG-40": "img/products/BXG-40.webp",  // 
  "BXG-41": "img/products/BXG-41.webp",  // 
  "BXG-62": "img/products/BXG-62.webp",  // 
  "CX-00": "img/products/CX-00.webp",  // CX-00 迪卡狂怒 FT3-60T
  "CX-01": "img/products/CX-01.webp",  // CX-01 蒼龍勇氣
  "CX-02": "img/products/CX-02.webp",  // CX-02 魔導至尊
  "CX-03": "img/products/CX-03.webp",  // 
  "CX-04": "img/products/CX-04.webp",  // 
  "CX-05": "img/products/CX-05.webp",  // 
  "CX-06": "img/products/CX-06.webp",  // CX-06 極狐九尾 隨機強化組
  "CX-07": "img/products/CX-07.webp",  // CX-07 天馬爆擊
  "CX-08": "img/products/CX-08.webp",  // 
  "CX-09": "img/products/CX-09.webp",  // 
  "CX-10": "img/products/CX-10.webp",  // 
  "CX-11": "img/products/CX-11.webp",  // 
  "CX-12": "img/products/CX-12.webp",  // CX-12 鳳凰閃焰
  "CX-13": "img/products/CX-13.webp",  // CX-13 龍王閃擊
  "CX-14": "img/products/CX-14.webp",  // CX-14 騎士堡壘
  "CX-15": "img/products/CX-15.webp",  // 
  "CX-16": "img/products/CX-16.webp",  // 
  "CX-17": "img/products/CX-17.webp",  // 
  "CX-18": "img/products/CX-18.webp",  // CX-18 腕龍鞭打 隨機強化組
  "CX-19": "img/products/CX-19.webp",  // 
  "UX-00": "img/products/UX-00.webp",  // 
  "UX-01": "img/products/UX-01.webp",  // 
  "UX-02": "img/products/UX-02.webp",  // UX-02 惡魔戰錘
  "UX-03": "img/products/UX-03.webp",  // UX-03 魔導神杖
  "UX-04": "img/products/UX-04.webp",  // 
  "UX-05": "img/products/UX-05.webp",  // 
  "UX-06": "img/products/UX-06.webp",  // 
  "UX-07": "img/products/UX-07.webp",  // 
  "UX-08": "img/products/UX-08.webp",  // 
  "UX-09": "img/products/UX-09.webp",  // 
  "UX-10": "img/products/UX-10.webp",  // 
  "UX-11": "img/products/UX-11.webp",  // 
  "UX-12": "img/products/UX-12.webp",  // 
  "UX-13": "img/products/UX-13.webp",  // 
  "UX-14": "img/products/UX-14.webp",  // 
  "UX-15": "img/products/UX-15.webp",  // 
  "UX-16": "img/products/UX-16.webp",  // UX-16 時鐘幻象 隨機強化組
  "UX-17": "img/products/UX-17.webp",  // 
  "UX-18": "img/products/UX-18.webp",  // 
  "UX-19": "img/products/UX-19.webp",  // UX-19 子彈獅鷲H
  "UX-20": "img/products/UX-20.webp",  // UX-20 榮耀武神LF
  "UX-21": "img/products/UX-21.webp",  // UX-21 惡魔冥界改造組
  "cx-00-tiga": "img/products/cx-00-tiga.webp",  // 
};
