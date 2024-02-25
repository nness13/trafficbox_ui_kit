import React, {createContext, useContext} from "react";
import type {ViewStore} from "@/components/DatabaseView/Views/ViewStore";

const ViewContext = createContext<ViewStore | null>(null);

interface ViewProviderProps {
    store: ViewStore;
    children: React.ReactNode;
}

export function StoreProvider(props: ViewProviderProps) {
    return (
        <ViewContext.Provider value={props.store}>
            {props.children}
        </ViewContext.Provider>
    );
}

export function useViewContext(): ViewStore;
export function useViewContext<Result>(
    selector: (value: ViewStore) => Result
): Result;
export function useViewContext<Result>(selector?: (value: ViewStore) => Result) {
    const store = useContext(ViewContext);

    if (!store) {
        throw new Error("Can not `useStore` outside of the `StoreProvider`");
    }

    if (typeof selector === "function") {
        return selector(store);
    }

    return store;
}