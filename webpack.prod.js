const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common(), {
    mode: "production", // コンパイル方式を本番環境モードに設定
});