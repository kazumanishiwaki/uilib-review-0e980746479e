# Button Atlas — v3 / 15

3者一致採用の15案だけを比較・評価する、トークンベースのプレーンHTML/CSS/JavaScriptギャラリーです。

```sh
python3 -m http.server 8000
```

採用ID（表示順）: `j02,j03,j04,k03,k13,k14,k21,n04,n10,n12,n14,n16,n17,n19,n20`。
最終採用の根拠は `/workspace/uilib/variant_debate_v3_20261108.md`（[ローカルコピー](data/variant_debate_v3_20261108.md)）。定義は `/workspace/uilib/candidates.md` に従い、既存ギャラリーと `sheet/` の輪郭・素材・SVG文字実装を再利用しています。

各カードに「3者一致採用」、代表を含む統合メンバー、形・塗り・中身・動き・ムードをまとめた日本語一文を表示。[Opus](data/v3_opus.md)／[Sol](data/v3_sol.md)の記述を参照しています。動きはこのギャラリーでの実装であり、国内参照サイトの動作を観測したという意味ではありません。

元の議論には異なるクラスタ分けがあるため、統合先は最終15案への編集上の割り当てです。採用IDを他の採用IDに統合せず、非採用IDの重複割り当ても避けています。表にない代表は独立です。非採用全案を網羅的に統合したものではありません。

| 代表 | 統合した非採用メンバー |
| --- | --- |
| j02 | k17 |
| j03 | c02,c07,k04,k05,k06,k10 |
| j04 | n09,k12,k19 |
| k03 | c01,t01,t02,t03,k01,k02,k07,k08,k09,k15,k16,k18,k22,n01,n05,n06 |
| k13 | c06,e05,n08 |
| k14 | e02,e04,c10 |
| k21 | e01,n03,n18,k23 |
| n12 | c09,n13 |
| n14 | n02 |
| n16 | e03,n07,n22 |

国内由来7案はバッジ・JP参照数・実サイト／掲載元リンクを表示します。j02/j03/j04は[jp_survey.json](data/jp_survey.json)の候補タグ、k03/k13/k14/k21は[jp_survey_v2.json](data/jp_survey_v2.json)の候補タグから重複サイトを除いて集計し、順に3/3/3/30/6/9/5件。国内由来は国内サイトから収集した形という意味で、発明・独占性・普及率の主張ではありません。観測日は2026-11-08です。

- 各プレビューは実際の `<button>`。国内ラベルは日本語、その他は `Get started`、n10は日・週・月の等幅セグメント。
- 通常／ホバー／押下／フォーカス／無効の状態行は `inert` + `aria-hidden`。n04は押下で変形、n10は選択面が移動、n20は待機時0%からクリックで進捗面が進みます。
- 全15案に異なるステージ配色を設定し、輪郭・塗り・構造の違いも保持。k21は背景の斜線をぼかして透かす乳白色のピル。n12は鉛筆アイコン、n17は明るいラベルプレートを使用。n10/n16の状態行は読みやすい文字表示です。写真は使用せず、背景・アイコン・ピクセル文字は自作CSS/SVGです。外部画像・フォント・CDN・依存ライブラリは不要。
- 塗り／かたち／コンテンツのフィルターとリセット。OK／NG／保留＋理由、処理中・危険操作の表示、ダイアログを保持。
- 新しいlocalStorageキーは `button-atlas-unanimous15-v3-20261108-reviews-v1`。旧評価は混入しません。
- JSON入出力はschemaVersion 1、collection `button-atlas-unanimous15-v3-20261108`。一致IDだけをマージ。不正形式・旧コレクション・1MB超を拒否。
- 390px対応。ダークモードと動きを減らす設定に対応。

`tokens.css`はプリミティブ→意味→コンポーネントのトークン、`style.css`は輪郭・素材・状態。`data/variants.json`が展示データ、`data/catalog.js`が生成物です。`sheet/`と旧議論・sourcesはアーカイブで、現在の展示件数には含みません。

```sh
python3 scripts/build-data.py
python3 scripts/check-data.py
node --check app.js
# サーバー起動中。検証時のみPlaywrightとChromeが必要
PLAYWRIGHT_MODULE=/tmp/btnlib-tools/node_modules/playwright node scripts/check-ui.cjs
```

検証済み: 15件完全一致、採用表記、統合IDの重複／衝突、7案のJP参照数とURL、JSON/JS一致。ブラウザーでは全フィルター値、評価永続化、JSON往復・不正／旧JSON拒否、実ボタンの名前、キーボードフォーカス、ダイアログ、セグメント・進捗・処理中、390/768/1001/1440/1600pxのページと状態行の横はみ出し、ダーク／減動設定を確認します。`gallery_desktop.png`／`gallery_mobile.png`を更新します。
