const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const { getPkgDir } = require("./utils");

const PATHS = {
    src: path.join(__dirname, "src"),
};

// 蛇形转为大驼峰式
const rename = (target) => {
    return target
        .replace(/^funplayer/i, "FunPlayer")
        .replace(/-([A-Za-z])/g, (_, c) => c.toUpperCase());
};

module.exports = (env) => {
    const pkgDir = getPkgDir(env.target);
    const pkg = require(path.resolve(pkgDir, "package.json"));

    const config = {
        entry: path.resolve(pkgDir, "index.ts"),

        /**
         * 当webpack去构建一个可以被其他模块导入使用的库时需要用到他们
         * libraryTarget: 配置以何种方式导出库
         * output.library: 配置导出库的名称
         * 以umd方式去生成js文件，这样使得包既可以npm的方式引入又可以script标签的方式去引入
         * globalObject: "this": To make UMD build available on both browsers and Node.js
         */
        output: {
            libraryTarget: "umd",
            library: rename(env.target),
            globalObject: "this",
        },

        resolve: {
            // 可省略的扩展名
            extensions: [".ts", ".js", ".scss", ".json"],
            // 通过别名把原导入路径映射成一个新的导出路径
            alias: {
                src: path.resolve(pkgDir, "src"),
            },
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"],
                            },
                        },
                        {
                            loader: "ts-loader",
                            options: {
                                configFile: path.resolve(
                                    pkgDir,
                                    "tsconfig.json"
                                ),
                            },
                        },
                    ],
                },
                {
                    test: /\.(s[ac]|c)ss$/i,
                    use: [
                        // "style-loader",
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].[hash:8].css",
            }),
            new PurgeCSSPlugin({
                paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true})
            }),
            new ESLintPlugin({
                extensions: [".js", ".ts", ".d.ts"],
            }),
        ],
    };

    if (pkg.umdDefault) config.output.libraryExport = "default";

    return config;
};
