import "@hookstate/devtools";
import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom";
import "@/global.scss";
import reportWebVitals from "@/reportWebVitals";
import App from "@/App";

const rootNode: HTMLElement = document.getElementById("rm-script-editor");

export function mount() {
    ReactDOM.render(
        <StrictMode>
            <Suspense fallback={null}>
                <App />
            </Suspense>
        </StrictMode>,
        rootNode
    );
}

mount();

// // console.log(window);

// // 👇 将卸载操作放入 unmount 函数 -- 必填
// export function unmount() {
//     console.log("unmount: ");
//     ReactDOM.unmountComponentAtNode(rootNode);
// }

// // 微前端环境下，注册mount和unmount方法
// if ((window as any).__MICRO_APP_ENVIRONMENT__) {
//     console.log();
//     window[`micro-app-${(window as any).__MICRO_APP_NAME__}`] = {
//         mount,
//         unmount,
//     };
// } else {
//     // 非微前端环境直接渲染
//     mount();
// }

// console.log(window);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
