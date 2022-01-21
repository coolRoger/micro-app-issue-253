export type AppParams = {
    name: string;
    url: string;
    displayName?: string;
    path?: string;
    icon?: string;
};

function createSubAppObject({
    AppName,
    devUrl,
    displayName,
    path,
    icon,
}: {
    AppName: string;
    devUrl: string;
    displayName?: string;
    path?: string;
    icon?: string;
}): AppParams {
    let url = "";

    if (process.env.NODE_ENV === "development") {
        url = devUrl;
    } else {
        url = `http://localhost:${Number(location.port)}/${AppName}/index.html`;
    }

    return {
        name: AppName,
        url,
        displayName,
        icon
    };
}

const apps: AppParams[] = [
    createSubAppObject({
        AppName: "script-editor",
        devUrl: "http://localhost:9002",
        displayName: "脚本编辑",
        icon: "Terminal"
    }),
];

(window as any).___APPS = apps;

export default apps;
