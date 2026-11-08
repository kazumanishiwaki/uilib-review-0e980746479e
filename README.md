# Button Atlas

3者一致採用の16種類だけを比較・評価する、トークンベースのプレーンHTML/CSS/JavaScriptギャラリーです。

```sh
python3 -m http.server 8000
```

採用ID: c01,c06,c07,c08,c10,e01,e02,e03,e05,j02,n06,n10,n14,n19,n21,n22。
根拠は `/workspace/uilib/variant_debate_strict_20261108.md`。ローカルコピーを [data/variant_debate_strict_20261108.md](data/variant_debate_strict_20261108.md) に保持しています。定義は `/workspace/uilib/candidates.md` に従います。各カードは「3者一致採用」、形状の説明、統合した候補IDを表示します。

議論のクラスタには重複があるため、以下は最終代表への編集上の整理です。採用済みIDは別の代表へ統合しません。

| 代表 | 統合候補 |
| --- | --- |
| c01 | c03,t01,t02,t03,n01,n05,n11 |
| c06 | c09,n04,n12 |
| c07 | c02,j03 |
| c08 | c04 |
| c10 | e04,n15,n20,j05 |
| e01 | n03（既存の写真背景オプション） |
| e02 | n17,n18 |
| e03 | n07,n16 |
| e05 | n08 |
| n14 | n02 |
| n21 | j01 |

j02,n06,n10,n19,n22は独立クラスタ。2/3に留まったc05,j04,n09は展示しません。c05の浮遊面、n09/j04の下線・罫線クラスタを別の採用案に統合したという扱いにはしていません。

j02に「国内由来」バッジと、上島珈琲店・大北・新生病院の実サイト／JP掲載元を表示します。参照は `/workspace/uilib/jp_survey.json` のcandidate:j02タグ付き3件から取得し、[data/jp_survey.json](data/jp_survey.json)に保存。国内サイトから収集した形状という意味で、歴史的発祥や独占性の主張ではありません。観測日は2026-11-08です。

- プレビューは実際の `<button>`。共通ラベル／アクセシブル名は `Get started`。j02は自然な縦書き「お問い合わせ」。
- 通常・ホバー・押下・フォーカス・無効の状態行は `inert` で読み上げ対象外。
- 塗り・かたち・コンテンツで絞り込み、リセットで全件表示。
- OK / NG / 保留＋理由を新しいlocalStorageキー `button-atlas-strict-20261108-reviews-v2` に保存。
- JSON書き出し／読み込みはschemaVersion 1、collection `button-atlas-strict-20261108`。同じコレクションの一致IDをマージ。旧コレクションは混入させません。
- 処理中デモ、危険な操作、分割メニュー、ダイアログ、キーボード操作を保持。
- 390px、ダークモード、動きを減らす設定に対応。外部画像・フォント・CDNは不要。

`tokens.css`のプリミティブ→意味→コンポーネントの3層と、`style.css`の素材・輪郭ルールで実装。`data/variants.json`が展示データ、`data/catalog.js`がブラウザー用生成物です。`data/sources.json`は旧参照アーカイブです。

```sh
python3 scripts/build-data.py
python3 scripts/check-data.py
node --check app.js
# 上記サーバー起動中。PlaywrightとChromeが必要
PLAYWRIGHT_MODULE=/tmp/btnlib-tools/node_modules/playwright node scripts/check-ui.cjs
```

データチェックは16件の完全一致、全員採用、統合IDの重複・採用IDとの衝突、JP参照、JSON/JS一致を確認。ブラウザーチェックはフィルター、評価永続化、JSON往復・不正JSON、メニュー、処理中、フォーカス、390/768/1001/1440/1600pxの横はみ出しを検証し、デスクトップ／モバイル画像を更新します。
