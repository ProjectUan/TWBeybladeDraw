# -*- coding: utf-8 -*-
"""
從 https://uxux11.github.io/funbox-line/ 抓最新抽選連結，合併進 data.js。
- 門市的 FB 粉絲頁、LINE ID 以現有 data.js 為準（不會被覆蓋）
- 商品連結、抽選時間、標題、缺少門市以來源為準
- 來源抓不到或解析為 0 間門市時，不動 data.js（exit code 2）

用法：python scripts/sync_data.py            # 有變動才寫檔
      python scripts/sync_data.py --force    # 一律寫檔
"""
import io, sys, re, json, os, datetime, urllib.request
from html.parser import HTMLParser

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_JS = os.path.join(ROOT, "data.js")
SRC = "https://uxux11.github.io/funbox-line/"


class Parser(HTMLParser):
    """只抓 .draw-store 區塊內的門市 / 商品，以及標題、更新時間、缺少清單。"""

    def __init__(self):
        super().__init__()
        self.stack = []          # (tag, classes, attrs)
        self.stores = []
        self.cur = None
        self.item = None
        self.capture = None      # ('title'|'updated'|'name'|'period'|'product'|'missing', depth)
        self.title = self.updated = ""
        self.missing = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = a.get("class", "").split()
        self.stack.append((tag, cls))
        d = len(self.stack)
        if "draw-store" in cls:
            self.cur = {"city": a.get("data-draw-city", "未分類"), "start": a.get("data-draw-start-time", ""),
                        "name": "", "period": "", "items": [], "_d": d}
            self.stores.append(self.cur)
        elif "draw-item" in cls and self.cur is not None and a.get("data-draw-href"):
            self.item = {"product": "", "url": a["data-draw-href"], "_d": d}
            self.cur["items"].append(self.item)
        if "draw-main-title" in cls: self.capture = ("title", d)
        elif "draw-last-updated" in cls: self.capture = ("updated", d)
        elif "draw-store-name" in cls: self.capture = ("name", d)
        elif "draw-start" in cls: self.capture = ("period", d)
        elif "draw-product" in cls: self.capture = ("product", d)
        elif tag == "div" and self.stack[-2:-1] and "draw-missing-box" in self.stack[-2][1] and "draw-missing-title" not in cls:
            self.capture = ("missing", d)

    def handle_data(self, data):
        if not self.capture: return
        kind, _ = self.capture
        t = data.strip()
        if not t: return
        if kind == "title": self.title += t
        elif kind == "updated": self.updated += t
        elif kind == "name" and self.cur: self.cur["name"] += t
        elif kind == "period" and self.cur: self.cur["period"] += t
        elif kind == "product" and self.item: self.item["product"] += t
        elif kind == "missing":
            for x in re.split(r"(?<=[）)])\s+", t):
                if x.strip(): self.missing.append(x.strip())

    def handle_endtag(self, tag):
        d = len(self.stack)
        if self.capture and self.capture[1] == d: self.capture = None
        if self.item and self.item["_d"] == d: self.item = None
        if self.cur and self.cur["_d"] == d: self.cur = None
        if self.stack: self.stack.pop()


def norm(s):
    return re.sub(r"fun\s*box(\s*toys?)?|來玩聚|店|[-－_\s()（）陀螺販售]", "", str(s or "").lower())


def main():
    force = "--force" in sys.argv
    req = urllib.request.Request(SRC + "?t=%d" % int(datetime.datetime.now().timestamp()), headers={"User-Agent": "Mozilla/5.0 funbox-sync"})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    p = Parser(); p.feed(html)
    stores = [s for s in p.stores if s["name"]]
    if not stores:
        print("來源解析到 0 間門市，放棄更新"); return 2

    txt = open(DATA_JS, encoding="utf-8").read()
    data = json.loads(txt[txt.index("{"): txt.rindex("}") + 1])
    before = json.dumps(data, ensure_ascii=False, sort_keys=True)

    by = {norm(s["name"]): s for s in data["stores"]}
    seen = set()
    period = ""
    for rs in stores:
        k = norm(rs["name"])
        s = by.get(k)
        if not s:
            s = {"id": "r_" + re.sub(r"[^a-z0-9一-鿿]", "", k)[:20], "city": rs["city"], "name": rs["name"],
                 "lineId": "", "fb": "", "start": rs["start"], "items": []}
            data["stores"].append(s); by[k] = s
        seen.add(k)
        s["city"] = rs["city"] or s["city"]; s["start"] = rs["start"] or s.get("start", "")
        s["items"] = [{"product": it["product"], "url": it["url"]} for it in rs["items"]]
        if rs["period"] and not period: period = re.sub(r"^抽選時間[:：]\s*", "", rs["period"])
    for s in data["stores"]:
        if norm(s["name"]) not in seen: s["items"] = []
    if p.title: data["title"] = p.title
    if period: data["period"] = period
    if p.updated: data["updated"] = re.sub(r"^最後更新[:：]\s*", "", p.updated)
    if p.missing: data["missing"] = p.missing

    after = json.dumps(data, ensure_ascii=False, sort_keys=True)
    n_items = sum(len(s["items"]) for s in data["stores"])
    if after == before and not force:
        print("無變動（%d 間門市 / %d 個連結，來源更新 %s）" % (len(data["stores"]), n_items, data.get("updated"))); return 0
    out = "// Funbox 抽陀螺 資料檔：更新連結時只需修改此檔（或用網頁的「管理模式」匯出後覆蓋）\nwindow.FUNBOX_DATA = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
    open(DATA_JS, "w", encoding="utf-8").write(out)
    # 讓 index.html 的 data.js?v= 換新，避免手機快取
    idx = os.path.join(ROOT, "index.html")
    h = open(idx, encoding="utf-8").read()
    h2 = re.sub(r'data\.js\?v=[^"]*"', 'data.js?v=%s"' % datetime.datetime.now().strftime("%Y%m%d%H%M"), h)
    if h2 != h: open(idx, "w", encoding="utf-8").write(h2)
    print("已更新 data.js：%d 間門市 / %d 個連結，來源更新 %s" % (len(data["stores"]), n_items, data.get("updated"))); return 0


if __name__ == "__main__":
    sys.exit(main())
