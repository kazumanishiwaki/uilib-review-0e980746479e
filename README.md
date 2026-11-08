# Button Atlas

外部依存なしのボタン比較・評価ライブラリー。日本語UI、390px対応。`index.html` を直接開けます。18標本、各5状態（90状態）。CSS・SVGは独自制作で、参照サイトのコピー・画像・CSSは配布しません。

| 層 | 標本数 | 基準達成 | 候補・未確認 |
| --- | ---: | ---: | ---: |
| Core | 10 | 4 | 6 候補 |
| Trend | 3 | 3 | 0 |
| Expressive | 5 | 0 | 5 unverified / 独自案 |
| 合計 | 18 | 7 | 11 |

Trendはすべて8/40以上。Expressiveは採用例を確認していない独自案で、qualifiedには含めません。CoreのDS頻度は既存の文書調査で、今回再調査したSaaS頻度とは別です。

## SaaSホームページの再調査

2026-11-08に、指定の40ホームページすべてへheadless Chromium / Playwrightで実際にアクセス。38件で表示された実ボタン・CTAのcomputed styleを確認しました。FramerとZendeskはHTTP 403で未確認。分母は40を維持し、未確認を非採用とは解釈しません。Boxは今回確認できました。

対象: Linear / Vercel / Stripe / Notion / Raycast / Arc / Figma / Framer / Supabase / Resend / Clerk / Slack / Airtable / Asana / monday / ClickUp / Miro / Loom / Dropbox / Box / Canva / Webflow / Retool / Sentry / PostHog / PlanetScale / Neon / Railway / Render / Fly.io / Netlify / Algolia / Intercom / Zendesk / HubSpot / Cal.com / SavvyCal / Attio / Tally / Typeform。

1440×1000のデスクトップ表示で、DOM準備後2.5秒待機。上端から1800px以内にある可視のbutton、リンク、role=buttonを対象とし、24px未満の要素とfooterを除外。リンクは可視の塗り・枠・背景画像があるものだけをCTAとして扱い、普通のナビリンクを除外します。メニューを開く実ボタンや同意ボタンは対象です。ログイン後UIや全ページの網羅調査ではありません。

- Fill: 計算済み背景色をCanvasで色空間に依存せず解釈。alpha 0.95以上をsolid、0超0.95未満をtint、透明で有効な枠があればoutline、それ以外をghost。背景画像ありは別のgradient分類でsolidには加算しません。solidは不透明な塗りの分類で、ブランド色や影の一致を意味しません。
- Shape: 計算済み左上radiusが高さの45%以上ならpill、4px以下ならsharp、それ以外はrounded。circleの専用検出はしていないためSaaS circleは保守的に未計上。再構築は3px / 8px / 999pxで、元サイトの値は保存しません。
- Content: テキストの有無と、可視のSVG/imgの有無でtext / icon+text / icon-onlyを分類。CSS疑似要素・背景画像の矢印は推測で加算しません。テキスト自体は記録しません。
- URLごとに同一のFill × Shape × Contentを1回だけ集計。ghostは通常時に形状が見えないため、旧t04をc04へ統合し、ghostのshape観測をまとめます。c08はテキストのみの構成として維持し、hoverで共通の角丸が見えます。
- Coreは4/8 DS以上、Trendは8/40 SaaS以上。部分一致と未確認は加算しません。DSはMaterial 3、Apple HIG、Radix、shadcn/ui、Geist、Carbon、Polaris、Fluent 2。既存DS記録には文書化された構成の対応を含みます。

| Trend | 完全一致の製品数 |
| --- | ---: |
| solid / pill / icon+text | 8/40 |
| solid / pill / text | 12/40 |
| solid / sharp / text | 11/40 |

出典台帳と観測ファイルの各レコードはURL・タグ・観測日のみ。コピー・DOM・CSS値・画面画像は保存しません。これは観測日の便宜標本であり、SaaS全体の市場占有率や2023–2026各年のトレンドを立証するものではありません。描画待機時間、地域、A/Bテスト、DOM構造によって結果は変わります。

## 操作と実装

層・塗り・かたち・コンテンツで絞り込み、OK / NG / 保留と理由をlocalStorageに保存。評価JSONを書き出し・再取り込みできます（1MB以下、理由5000文字以下）。不正ファイルは既存評価を変更しません。旧カタログで削除したIDの評価は表示対象外です。`file://`での保存はブラウザー依存のため、継続利用には同一HTTPオリジンを推奨します。

```sh
python3 -m http.server 8000
# http://localhost:8000
```

中央ボタンはダイアログを開きます。splitの追加操作は名前を分けたmenuで、上下矢印・Home・End・Escapeとフォーカス復帰に対応。「処理状態を試す」は全標本でspinner、固定幅、aria-busy、aria-disabled、連打抑止を適用し、完了をライブリージョンで通知。loadingは独立標本ではありません。動作のない⌘K構成は削除しました。「危険な操作」は別intentです。

下段の90状態見本はinert + aria-hiddenで、操作・読み上げ対象外。通常・hover・active・focus・disabledを比較できます。hover/activeは明示的な背景トークン、focusは白とアクセントの二重リングです。英語ボタンにはlang=enを指定しています。

`tokens.css`はprimitive → semantic → componentの3層、sm/md/lgサイズ、light-dark()でOS配色対応。フォントはsystem-ui、500/600。本文・状態ラベルは12px以上、主ボタン14px、44px高。ガラスには多色背景とぼかし・反射エッジ、solidには内側ハイライト、Expressiveには動くグラデーション枠、矢印にはhover移動を追加。動きを減らす設定に対応します。

## ファイルと検証

- `data/saas-observations.json`: 今回の40サイトのURL・分類タグ・日付。
- `scripts/audit-homepages.cjs`: Chromiumによる再観測。開発時のみPlaywrightが必要。`PLAYWRIGHT_MODULE`でモジュールパスを指定可能、Chromeは`/usr/bin/google-chrome`。プロジェクトルートから実行後、データを再生成します。
- `scripts/build-data.py`: 観測タグとDS文書記録からJSONとfile://対応のcatalog.jsを生成。
- `scripts/check-data.py`: 重複、40サイト、8 DS、資格閾値、メタデータ形式、JSON/JS一致を検証。
- `scripts/check-ui.cjs`: localhost:8000で描画、inert、menu、loading、dialog、絞り込み、390px横あふれ、dark mode、JSエラーを確認。開発用Playwrightを使用。

```sh
python3 scripts/build-data.py
python3 scripts/check-data.py
node --check app.js
PLAYWRIGHT_MODULE=/path/to/playwright node scripts/check-ui.cjs
```

頻度検証は観測タグとの整合性を検査します。サイトの変動や分類の限界を自動的に解消するものではありません。
