const CracoAlias = require("craco-alias");
const path = require("path");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    eslint: {
        enable: false,
    },
    devServer: {
        port: 9002,
        headers: {
            "access-allow-allow-origin": "*",
        },
    },
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                new MonacoWebpackPlugin({
                    languages: ["javascript", "typescript", "xml", "json"],
                })
            ];

            paths.appBuild = "build/rm-script-editor";

            webpackConfig.output = {
                ...webpackConfig.output,
                library: `rm-script-editor-[name]`,
                libraryTarget: "umd",
                globalObject: "window",
                publicPath: `${
                    webpackConfig.mode === "development" ? "/" : `/rm-script-editor`
                }`,
                path: path.resolve(__dirname, "build/rm-script-editor"),
                chunkLoadingGlobal: "webpackJsonp_rm-script-editor"
            };

            console.log(webpackConfig);

            return webpackConfig;
        },
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                // see in examples section
                source: "tsconfig",
                //baseUrl: path.resolve(__dirname, "./src"),
                baseUrl: "./",
                tsConfigPath: "./tsconfig.extend.json",
                debug: false,
            },
        },
    ],
};
