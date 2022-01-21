

import React from "react";

import {
    Box,
    Paper,
    Text,
    useMantineTheme,
} from "@mantine/core";

import { useGlobalState } from "./store/indext";

type PageProps = {
    title?: string;
    children?: React.ReactNode;

};

const SubAppPage: React.FC<PageProps> = ({
    title,
    children,
}) => {

    const theme = useMantineTheme();

    const { is_micro_app } = useGlobalState()
    return (
        <Box
            sx={{
                width: is_micro_app ? "100%" : "100vw",
                height: is_micro_app ? "100%" : "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f0f2f5",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Page Header */}

            {is_micro_app === false && (
                <Paper
                    shadow="md"
                    padding="md"
                    radius={0}
                    sx={{
                        backgroundColor: theme.colors.red[8],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text size="lg" sx={{ color: "#fff" }} weight={500}>
                        {title ? title : ""}
                    </Text>
                </Paper>
            )}

            <Box
                sx={{
                    flex: 1,
                    padding: "15px",
                    position: "relative",
                    height: 0,
                }}
            >
                {children ? children : null}
            </Box>
        </Box>
    );
};

export { SubAppPage };
