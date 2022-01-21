import _ from "lodash";
import { createState, useState, State, none, Downgraded } from "@hookstate/core";
import { MonacoEditorProps } from "react-monaco-editor";

export type EditorType = {
    loaded: boolean,
    editor: new() => React.Component<MonacoEditorProps> | null,
}

const EditorState = createState<EditorType>({
    loaded: false,
    editor: null,
});

const wrapState = (state: State<Partial<EditorType>>) => ({
    get loaded(){
        return state.loaded.get();
    },

    get editor(){
        return state.attach(Downgraded).editor.get();
    },

    set_loaded(loaded: boolean){
        state.loaded.set(loaded);
    },

    set_editor(editor: new() => React.Component<MonacoEditorProps>){
        state.editor.set(editor);
    },

    unmount_editor(){
        state.editor.set(null);
        state.loaded.set(false);
    }
});

export const accessEditorState = () => wrapState(EditorState);

export function useEditorState() {
    const state = useState(EditorState);

    return wrapState(state);
}
