const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const { getPkgDir } = require("./utils");
const baseConfig = require("./webpack.base");

module.exports = (env) => {
    const pkgDir = getPkgDir(env.target);
    const fixtureDir = path.resolve(__dirname, "..", "fixtures");
    const targetDir = path.resolve(fixtureDir, env.fixture || env.target);

    const config = {
        mode: "development",
        devtool: "cheap-module-source-map",
        // 部署目标，webpack将在浏览器环境编译代码
        target: ["web", "es5"],
        entry: ["webpack-dev-server/client", path.resolve(pkgDir, "index.ts")],
        devServer: {
            // 该配置项允许配置从目录提供静态文件的选项(默认为'public'文件夹)
            // 监听多个后台资源目录
            static: [fixtureDir, path.resolve(__dirname, "..", "packages")],
            client: {
                // 只在编译错误时，才会在浏览器中显示全屏覆盖
                overlay: {
                    errors: true,
                    warnings: false,
                },
                // 在浏览器中以百分比显示编译进度
                progress: true,
            },
            // 启用gzip压缩
            compress: true,
            // 如果想让自己的服务器可以被外部访问,应这样指定:
            host: "0.0.0.0",
            // 启用webpack的热模块替换特性
            hot: true,
            // 告诉dev-server在服务器已经启动后打开浏览器，设置其为true以打开自己的默认浏览器
            open: true,
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(targetDir, "index.html"),
            }),
        ],
    };
    return merge(baseConfig(env), config);
};
