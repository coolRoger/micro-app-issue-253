import React from "react";
import { Box, Button } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import MonacoEditor, { EditorDidMount, monaco } from "react-monaco-editor";

const sdThemeData = require("monaco-themes/themes/Solarized-dark.json");

monaco.editor.defineTheme("sd", sdThemeData);

type Editor = Parameters<EditorDidMount>[0];

type Monaco = Parameters<EditorDidMount>[1];

const editorMounted = (Editor: Editor, Monaco: Monaco, set_editor: React.Dispatch<any>) => {
    // console.log(editor, monaco);
    console.log(Editor, Monaco);
    set_editor(Editor);
};

const RMScriptEditor = () => {
    const { ref, width, height } = useElementSize();

    const [editor, set_editor] = React.useState<Editor>(null);

    React.useEffect(() => {
        if(editor){
            editor.layout({
                width,
                height
            })
        }
    }, [width, height]);

    return (
        <Box
            ref={ref}
            sx={{
                width: "calc(100% + 30px)",
                height: "calc(100% + 30px)",
                margin: "-15px",
            }}
        >
            <MonacoEditor
                width="100%"
                height="100%"
                theme="sd"
                editorDidMount={(editor, monaco) => {
                    editorMounted(editor, monaco, set_editor);
                }}
            />
        </Box>
    );
};

export { RMScriptEditor };
