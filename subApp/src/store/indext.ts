import _ from "lodash";
import { createState, useState, State, none, Downgraded } from "@hookstate/core";

export type AppType = {
    is_micro_app: boolean
}

const GlobalState = createState<AppType>({
    is_micro_app: false
});

const wrapState = (state: State<Partial<AppType>>) => ({
    get is_micro_app(){
        return state.is_micro_app.get();
    },

    set_is_micro_app(bool: boolean){
        state.is_micro_app.set(bool)
    }
});

export const accessGlobalState = () => wrapState(GlobalState);

export function useGlobalState() {
    const state = useState(GlobalState);

    return wrapState(state);
}
