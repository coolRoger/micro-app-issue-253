import React, { useRef } from "react";
import { MantineProvider, GlobalStyles, Box, AppShell } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { AppSquare } from "./AppSquare";
import NavBar from "./NavBar";

const App = () => {
    const preferredColorScheme = useColorScheme();

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
                <AppShell
                    // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
                    navbarOffsetBreakpoint="sm"
                    // fixed prop on AppShell will be automatically added to Header and Navbar
                    fixed
                    navbar={<NavBar />}
                >
                    <AppSquare />
                </AppShell>
            </NotificationsProvider>
        </MantineProvider>
    );
};

export default App;
