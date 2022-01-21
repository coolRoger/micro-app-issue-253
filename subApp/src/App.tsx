import React, { useRef } from "react";
import { MantineProvider, GlobalStyles, Box } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { RMScriptEditor } from "./view/RMScriptEditor";
import { SubAppPage } from "./SubAppPage";
import { useGlobalState } from "./store/indext";

const App = () => {
    const preferredColorScheme = useColorScheme();

    const { set_is_micro_app } = useGlobalState()

    React.useEffect(() => {
        if ((window as any).microApp) {
            set_is_micro_app(true);
        } else {
            set_is_micro_app(false);
        }
    }, []);

    return (
        <MantineProvider
            theme={{
                colorScheme: preferredColorScheme,
                colors: {
                    // override dark colors here to change them for all components
                    dark: [
                        "#d5d7e0",
                        "#acaebf",
                        "#8c8fa3",
                        "#666980",
                        "#4d4f66",
                        "#34354a",
                        "#2b2c3d",
                        "#1d1e30",
                        "#0c0d21",
                        "#01010a",
                    ],
                },
            }}
        >
            <GlobalStyles />
            <NotificationsProvider position="top-center">
                <SubAppPage title="脚本编辑">
                    <RMScriptEditor />
                </SubAppPage>
            </NotificationsProvider>
        </MantineProvider>
    );
};

export default App;
