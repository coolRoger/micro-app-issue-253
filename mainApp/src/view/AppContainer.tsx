/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event';
import { ScrollArea } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import microApp from "@micro-zoe/micro-app";
import _ from "lodash";

const AppContainer = ({
    name,
    url,
}: PropsWithChildren<{ name: string; url: string }>) => {

    return (
        <div
            className="sub-apps-container"
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
            }}
        >
            <div
                className="micro-app-container"
                style={{
                    flex: "1",
                    display: "block",
                    overflow: "hidden",
                }}
            >
                <ScrollArea style={{ height: "100%" }} scrollHideDelay={300}>
                    <micro-app
                        url={url}
                        name={name}
                        style={{ maxWidth: "100%" }}
                    ></micro-app>
                </ScrollArea>
            </div>
        </div>
    );
};

export default AppContainer;
