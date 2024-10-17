const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common(), {
    mode: "development", // コンパイル方式を開発環境モードに設定
    devtool: "source-map", // ソースマップを出力するオプション
});