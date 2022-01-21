import _ from "lodash";
import {
    createState,
    useState,
    State,
    none,
    Downgraded,
    StateMethods,
} from "@hookstate/core";

import { MosaicNode } from "react-mosaic-component";

interface NodeStateType {
    nodes: MosaicNode<number | string> | null,
    opened: (string | number)[],
}

const NodeState = createState<NodeStateType>({
    nodes: "script-editor",
    opened: ["script-editor"]
});

const wrapState = (state: State<NodeStateType>) => ({
    /* #region micro app env */
    get nodes() {
        return state.attach(Downgraded).nodes.get();
    },

    get opened(){
        return state.attach(Downgraded).opened.get();
    },

    set_nodes(nodes:MosaicNode<number | string> | null) {
        state.nodes.set(nodes);
    },

    set_opened(opened: (string | number)[]){
        state.opened.set(opened);
    },

    remove_opened(opened: string | number){
        let index = state.attach(Downgraded).opened.get().indexOf(opened);
        state.opened[index].set(none);
    },

    add_opened(opened: string | number){
        state.opened.merge([opened]);
    }
});

export const accessNodeState = () => wrapState(NodeState);

export function useNodeState() {
    const state = useState(NodeState);

    return wrapState(state as any);
}
