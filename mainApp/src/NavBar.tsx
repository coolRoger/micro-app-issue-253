import {
    Navbar,
    ScrollArea,
    Group,
    ActionIcon,
    Text,
    GroupPosition,
} from "@mantine/core";

import React, {
    CSSProperties,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";

import apps, { AppParams } from "@/apps";

import * as Icon from "react-feather";

import { useNodeState } from "./AppSquare/store";
import { dropRight } from "lodash";
import {
    getPathToCorner,
    Corner,
    getNodeAtPath,
    MosaicParent,
    MosaicNode,
    MosaicDirection,
    getOtherDirection,
    updateTree,
} from "react-mosaic-component";


const NavItem = ({
    name,
    icon,
    isSubApp = false,
    path,
    collapsed,
    onItemClick,
}: PropsWithChildren<{
    name: string;
    icon?: JSX.Element;
    isSubApp?: boolean;
    path: string;
    collapsed?: boolean;
    onItemClick?: () => void;
}>) => {
    let ItemActiveStyle = {
        color: "#1890ff",
        backgroundColor: "#e6f7ff",
    };

    if (!icon) {
        icon = <Icon.Command />;
    }

    let cloneIcon = React.cloneElement(icon, {
        style: { width: "24px", height: "24px", color: "inherit" },
    });

    let CS = {
        position: (collapsed === true ? "center" : "left") as GroupPosition,
        iconSize: collapsed === true ? 48 : 24,
    };

    return (
        <Group
            spacing={24}
            style={{
                cursor: "pointer",
                padding: "8px",
                ...(location.pathname === path ? ItemActiveStyle : {}),
            }}
            position={CS.position}
            sx={{
                "&:hover": ItemActiveStyle,
            }}
            onClick={onItemClick}
        >
            {icon ? (
                <ActionIcon
                    sx={{ color: "inherit" }}
                    variant="transparent"
                    size={CS.iconSize}
                >
                    {cloneIcon}
                </ActionIcon>
            ) : null}

            {collapsed === true ? null : (
                <Text style={{ fontSize: "14px", color: "inherit" }}>
                    {name}
                </Text>
            )}
        </Group>
    );
};

const NavBar = () => {
    const [collapsed, SetCollapsed] = useState(false);

    const [navWidth, SetNavWidth] = useState(180);

    const { nodes, set_nodes, opened, add_opened } = useNodeState();

    const openApp = (app: AppParams) => {
        if (opened.includes(app.name) !== true) {
            if (nodes) {
                const path = getPathToCorner(nodes, Corner.TOP_RIGHT);

                const parent = getNodeAtPath(
                    nodes,
                    dropRight(path)
                ) as MosaicParent<number | string>;

                const destination = getNodeAtPath(nodes, path) as MosaicNode<
                    number | string
                >;

                const direction: MosaicDirection = parent
                    ? getOtherDirection(parent.direction)
                    : "row";

                let first: MosaicNode<number | string>;

                let second: MosaicNode<number | string>;

                if (direction === "row") {
                    first = destination;
                    second = app.name;
                } else {
                    first = app.name;
                    second = destination;
                }

                set_nodes(
                    updateTree(nodes, [
                        {
                            path,
                            spec: {
                                $set: {
                                    direction,
                                    first,
                                    second,
                                },
                            },
                        },
                    ])
                );
            } else {
                set_nodes(app.name);
            }

            add_opened(app.name);
        }
    };

    useEffect(() => {
        if (collapsed === true) {
            SetNavWidth(120);
        } else {
            SetNavWidth(180);
        }
    }, [collapsed]);

    return (
        <Navbar
            padding="sm"
            width={{
                // Base width – used when viewport is larger than theme.breakpoints.lg
                base: navWidth,

                breakpoints: {
                    // When viewport is smaller than theme.breakpoints.lg and larger than theme.breakpoints.sm
                    lg: navWidth,

                    // When viewport is smaller than theme.breakpoints.sm
                    sm: navWidth,
                } as unknown as number,
            }}
        >
            <Navbar.Section
                grow
                component={ScrollArea}
                // ml={-10}
                // mr={-10}
                // sx={{ paddingLeft: 10, paddingRight: 10 }}
            >
                <Group
                    direction="column"
                    spacing="sm"
                    grow
                    style={{ marginTop: "15px" }}
                >
                    {apps.map((app, appIndex) => {
                        let app_path = app.path;

                        if (!app_path) {
                            app_path = app.name.toLowerCase();
                        }

                        let AppIcon: React.FC = Icon[app.icon];

                        return (
                            <NavItem
                                name={
                                    app.displayName ? app.displayName : app.name
                                }
                                path={`/apps/${app_path}`}
                                collapsed={collapsed}
                                key={appIndex}
                                icon={<AppIcon />}
                                onItemClick={() => {
                                    openApp(app);
                                }}
                            />
                        );
                    })}
                </Group>
            </Navbar.Section>
        </Navbar>
    );
};

export default NavBar;
