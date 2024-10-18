# webpack-ejs-sass
- こちらは静的サイト用EJS, DartSass対応のwebpackです。

## 出力コマンド
1. `npm run dev` で開発用環境に適した形のファイルを出力します。
- CSS非圧縮
- JavaScriptバンドル
- ソースマップ作成(CSS, JavaScript)
2. `npm run prod` で本番用環境に適した形のファイルを出力します。
- CSS圧縮
- JavaScriptバンドル
- ソースマップは作成されません。
3. `npm run server` でローカルサーバーが立ち上がり、ブラウザが開きます。ファイルは開発用環境に適した形で出力されます。
- CSS非圧縮
- JavaScriptバンドル
- ソースマップ作成(CSS, JavaScript)

## 手順
- ダウンロード後、ターミナルを起動する。
- `npm i` を実行する（基本1度だけ）。
- `npm run server` を実行し、開発用環境を立ち上げる。
- ファイルを修正し保存したらdistフォルダが生成され、そのなかの`index.html`がブラウザへ反映されます。
- `npm run prod` で本番用環境に適した形のファイルを出力します。

## 注意点
- 開発するフォルダはsrcになります。
- webpack起動時にはdistフォルダの中身が一度整理されます（distに直接書き込むと後々、消えます）。
- srcフォルダで追加したものはdistフォルダに吐き出されます。

## Nodeについて
- Node.js: v16.14.0で動作を確認済み。
- npm: v8.3.1で動作を確認済み。

## Sass
- FLOCSS記法を想定しているため、foundation, layout, objectフォルダがあります。そしてobjectフォルダ内には、component, project, utilityフォルダがあります。
- pagesフォルダでは各ページ毎にフォルダを設け、各ページ固有のスタイルを管理します。
- globalフォルダには変数・各種設定関係が格納されています。
- globalフォルダに格納されている変数を使用する際は、`@use 'globalフォルダへの相対パス' as *;`の記述が必要です。
- Globでファイルを一括読み込みすることが出来るので、各フォルダ内に`_index.scss`を用意する必要はございません。
- distフォルダにCSSファイルとして出力させたいSassファイルは、src/js内のmain.jsからインポート文を使って読み込んでください。

## JavaScript
- `main.js`で各JavaScriptファイルを読み込みます。ファイルを増やす際は`main.js`にファイル読み込みの記述を行ってください。
- sanitize.css, fontawesome, smoothscroll-polyfill, swiperをバンドル済みです。使わない場合はmain.jsの読み込み部分をコメントアウトしてください。

## EJS
- 共通パーツ(`_head.ejs`, `_header.ejs`, `_footer.ejs`, `_breadcrumb.ejs`)は、src/ejs/common内で管理しています。
- 共通パーツはincludeで読み込んでください(書き方はsrc/ejs内の`index.ejs`または`blog/index.ejs`を参照してください)。
- 各ページ用のファイルの冒頭で変数pageIdを宣言してください(書き方はsrc/ejs内の`index.ejs`または`blog/index.ejs`を参照してください)。
- includeで読み込んだ共通パーツに対して、変数pageIdを渡してください(書き方はsrc/ejs内の`index.ejs`または`blog/index.ejs`を参照してください)。
- サイトのメタ情報はsrc/data内の`site.json`で管理しています。
- 各ページ用のファイルの冒頭で`site.json`を読み込んでください(書き方はsrc/ejs内の`index.ejs`または`blog/index.ejs`を参照してください)。
- includeで読み込んだ共通パーツに対して、`site.json`の情報を格納した変数を渡してください(書き方はsrc/ejs内の`index.ejs`または`blog/index.ejs`を参照してください)。
- コマンドの実行により出力されたHTMLファイルはコード整形されません。

## 画像
- 使用する画像はsrc/img内に格納します。
- 必要に応じてフォルダを作成してその中に入れます。
- コマンドを実行すると、dist/img内に自動圧縮された形で出力されます。

## その他
- 既存のCSS, JavaScript, 画像を読み込んだ上で開発を進める場合は、それらをsrc/publicフォルダに格納してください。
