const { rename } = require("fs");
const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { getPkgDir } = require("./utils");
const rename = (target) => {
    return target
        .replace(/^funplayer/i, "FunPlayer")
        .replace(/-([A-Za-z])/g, (_, c) => c.toUpperCase());
};

module.exports = (env) => {
    const pkgDir = getPkgDir(env.target);
    const pkg = require(path.resolve(pkgDir, "package.json"));

    const config = {
        entry: path.resolve(pkgDir, "src", "index.ts"),

        output: {
            libraryTarget: "umd",
            library: rename(env.target),
            globalObject: this,
            umdNameDefine: true,
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
            new ESLintPlugin({
                extensions: [".js", ".ts", ".d.ts"],
            }),
        ],
    };

    if (pkg.umdDefault) config.output.libraryExport = "default";

    return config;
};
