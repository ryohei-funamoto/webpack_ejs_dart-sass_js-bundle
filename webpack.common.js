const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");
const { htmlWebpackPluginTemplateCustomizer } = require("template-ejs-loader");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

// 開発モード時にソースマップを有効にする
const enabledSourceMap = process.env.NODE_ENV !== "production";

// 読み込むディレクトリを定義
const filePath = {
    js: "./src/js/",
    ejs: "./src/ejs/",
    sass: "./src/sass/"
};

// Sassファイル読み込みの定義
const entriesSass = WebpackWatchedGlobEntries.getEntries(
    // 読み込むSassファイルのパスを指定
    [
        path.resolve(__dirname, `${filePath.sass}**/*.scss`)
    ],
    // 読み込まないSassファイルのパスを指定
    {
        ignore: path.resolve(__dirname, `${filePath.sass}**/_*.scss`)
    }
)();

const cssGlobPlugins = (entriesSass) => {
    // Globの条件に合致したSassファイルをCSSファイルに変換する
    return Object.keys(entriesSass).map(
        (key) => new MiniCssExtractPlugin({
            filename: `css/${key}.css`, // 出力ファイル名
        })
    );
};

// EJSファイル読み込みの定義
const entries = WebpackWatchedGlobEntries.getEntries(
    // 読み込むEJSファイルのパスを指定
    [
        path.resolve(__dirname, `${filePath.ejs}**/*.ejs`)
    ],
    // 読み込まないEJSファイルのパスを指定
    {
        ignore: path.resolve(__dirname, `${filePath.ejs}**/_*.ejs`)
    }
)();

const htmlGlobPlugins = (entries) => {
    // Globの条件に合致したEJSファイルをHTMLファイルに変換する
    return Object.keys(entries).map(
        (key) => new HtmlWebpackPlugin({
            filename: `${key}.html`, // 出力ファイル名
            template: htmlWebpackPluginTemplateCustomizer({
                htmlLoaderOption: {
                    sources: false, // ファイル自動読み込み無効化
                    minimize: false, // 圧縮無効化
                },
                templatePath: `${filePath.ejs}${key}.ejs`, // 読み込むEJSファイルのパス
            }),
            inject: false, // JS,CSSの自動出力無効化
            minify: false, // JS,CSSの圧縮無効化
        })
    );
};

module.exports = () => ({
    // メインのJavaScriptファイル(エントリーポイント)
    entry: "./src/js/main.js",
    // ファイルの出力設定
    output: {
        path: path.resolve(__dirname, "dist"), // ファイルを出力する場所
        filename: "js/bundle.js", // 出力ファイル名
        clean: true, // ビルド時に不要ファイルを削除するかどうか
    },
    // 
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false, // パッケージのライセンス情報をJavaScriptファイルの中に含める
            }),
        ],
    },
    // ローダーの設定
    module: {
        rules: [ // 各ローダーの設定
            {
                test: /\.ejs$/i,
                use: ["html-loader", "template-ejs-loader"],
            },
            {
                test: /\.js$/, // ローダーの機能を使用するファイルを正規表現などで指定
                exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/, // IE対応 除外設定にSwiperを含めない
                use: [ // 使用するローダーを指定
                    {
                        loader: "babel-loader", // 使用するローダー
                        options: { // 使用するローダーのオプション
                            presets: [ // 使用するローダーの初期設定
                                "@babel/preset-env", // browserslistで設定したターゲットブラウザにおいてプログラムが動くよう配慮してくれる
                            ],
                        }
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // CSSファイルを別個に出力する
                    },
                    {
                        loader: "css-loader", // CSSをCommonJS形式に変換してJavaScriptで扱えるようにする
                        options: {
                            url: false, // CSSのurl()をCommonJS形式に変換するかどうか
                            sourceMap: enabledSourceMap, // ソースマップを有効化するかどうか
                            importLoaders: 2, // css-loader以前に使用するローダーの数を設定する
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                        },
                    },
                    {
                        loader: "postcss-loader", // PostCSSでCSSを処理する
                        options: {
                            sourceMap: enabledSourceMap,
                            postcssOptions: {
                                plugins: [
                                    require("autoprefixer")({ grid: true }), // ベンダープレフィックスを自動付与する
                                    require("postcss-sort-media-queries")({ sort: "mobile-first" }), // メディアクエリを並べ替えて1つにまとめる
                                    require("css-declaration-sorter")({ order: "alphabetical" }), // CSSプロパティをアルファベット順に並べ替える
                                ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader", // SassをCSSにコンパイルする
                        options: {
                            implementation: require("sass"), // DartSassを使えるようにする
                            sourceMap: enabledSourceMap,
                        },
                    },
                    {
                        loader: "webpack-dart-sass-glob", // DartSassでフォルダ内のファイルをglobで読み込む
                    }
                ],
            },
            {
                test: /node_modules\/(.+)\.css$/, // node_module内のcss
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                ],
                sideEffects: true, // production modeでもswiper-bundle.cssが使えるようにする
            },
        ],
    },
    target: ["web", "es5"],
    // プラグインの設定
    plugins: [
        ...cssGlobPlugins(entriesSass), // スプレッド構文を使って、関数cssGlobPluginsの戻り値(配列)を展開
        ...htmlGlobPlugins(entries), // スプレッド構文を使って、関数htmlGlobPluginsの戻り値(配列)を展開
        new CopyPlugin({
            patterns: [
                { // src/imgの画像をdist/imgにコピーする
                    from: path.resolve(__dirname, "src/img"),
                    to: path.resolve(__dirname, "dist/img"),
                },
                { // src/public/cssのCSSファイルをdist/cssにコピーする
                    from: path.resolve(__dirname, "src/public/css"),
                    to: path.resolve(__dirname, "dist/css"),
                },
                { // src/public/jsのJSファイルをdist/jsにコピーする
                    from: path.resolve(__dirname, "src/public/js"),
                    to: path.resolve(__dirname, "dist/js"),
                },
                { // src/public/imgの画像をdist/imgにコピーする
                    from: path.resolve(__dirname, "src/public/img"),
                    to: path.resolve(__dirname, "dist/img"),
                },
            ],
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: "70-85"
            },
            gifsicle: {
                interlaced: false,
                optimizationLevel: 10,
                colors: 256
            },
            svgo: {
            },
            plugins: [
                ImageminMozjpeg({
                    quality: 85,
                    progressive: true
                }),
            ],
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new BrowserSyncPlugin({
            host: "localhost",
            port: 3000,
            server: { baseDir: ["dist"] },
        }),
    ],
    // node_modules を監視（watch）対象から除外
    watchOptions: {
        ignored: /node_modules/,
    },
});