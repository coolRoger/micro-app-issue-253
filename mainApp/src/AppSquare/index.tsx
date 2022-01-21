import _ from "lodash";
import { Group, Title, ActionIcon, Box, Button } from "@mantine/core";
import {
    MosaicWindowProps,
    MosaicContext,
    Mosaic,
    MosaicWindow,
} from "react-mosaic-component";
import "./style.css";
import * as Icon from "react-feather";
import AppContainer from "@/view/AppContainer";
import apps from "@/apps";
import {
    MosaicBranch,
    MosaicKey,
    MosaicNode,
} from "react-mosaic-component/lib/types";
import { accessNodeState, useNodeState } from "./store";
import React from "react";

const RenderEmptyState = () => {
    return (
        <MosaicContext.Consumer>
            {(context) => {
                console.log("from empty state: ", context);
                return (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            onClick={() => {
                                context.mosaicActions.replaceWith(
                                    [],
                                    "script-editor"
                                );
                            }}
                            leftIcon={<Icon.Layers size={16} />}
                        >
                            创建窗口
                        </Button>
                    </Box>
                );
            }}
        </MosaicContext.Consumer>
    );
};

const RenderToolbar = (
    props: MosaicWindowProps<string>,
    draggable: boolean | undefined,
    windowId: string | number
) => {
    const { path } = props;

    const { remove_opened } = accessNodeState();

    return (
        /* div should be as wide as parent container for dnd to work properly*/
        <div
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <MosaicContext.Consumer>
                {(context) => {
                    return (
                        <Group
                            position="apart"
                            sx={{
                                height: "100%",
                                backgroundColor: "#e03131",
                                padding: "0px 8px",
                            }}
                        >
                            <Title sx={{ color: "#fff" }} order={6}>
                                {props.title}
                            </Title>
                            <ActionIcon
                                onClick={() => {
                                    console.log(props);
                                    context.mosaicActions.remove(path);
                                    remove_opened(windowId);
                                }}
                                variant="transparent"
                            >
                                <Icon.X color="#fff" />
                            </ActionIcon>
                        </Group>
                    );
                }}
            </MosaicContext.Consumer>
        </div>
    );
};

type RenderAppProps = {
    windowId: MosaicKey;
    path: MosaicBranch[];
    app?: any;
};

const RenderApp: React.FC<RenderAppProps> = ({ windowId, app, path }) => {
    if (app) {
        return (
            <MosaicWindow
                path={path}
                createNode={() => "new"}
                title={app ? app.displayName : "Untitled"}
                renderToolbar={(props, draggable) => {
                    return RenderToolbar(props, draggable, windowId);
                }}
            >
                <AppContainer url={app.url} name={app.name} />
            </MosaicWindow>
        );
    }

    return null;
};

const AppSquare = () => {
    const { nodes, set_nodes } = useNodeState();

    const onChange = (currentNode: MosaicNode<number | string> | null) => {
        set_nodes(currentNode);
    };

    const onRelease = (currentNode: MosaicNode<number | string> | null) => {
        console.log("Mosaic.onRelease():", currentNode);
    };

    return (
        <Mosaic
            renderTile={(id, path) => {
                let app = _.find(apps, { name: id });
                return <RenderApp app={app} windowId={id} path={path} />;
            }}
            zeroStateView={<RenderEmptyState />}
            value={nodes}
            onChange={onChange}
            onRelease={onRelease}
        />
    );
};

export { AppSquare };
