const CracoAlias = require("craco-alias");
const path = require("path");

module.exports = {
    eslint: {
        enable: false,
    },
    devServer: {
        port: 9001,
        headers: {
            "access-allow-allow-origin": "*",
        },
    },
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            paths.appBuild = "build/base_app";
            webpackConfig.output = {
                ...webpackConfig.output,
                library: `base_app-[name]`,
                libraryTarget: "umd",
                globalObject: "window",
                publicPath: `${
                    webpackConfig.mode === "development" ? "/" : `/base_app`
                }`,
                path: path.resolve(__dirname, "build/base_app"),
                chunkLoadingGlobal: "webpackJsonp_base_app"
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
