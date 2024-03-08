import React, {createContext, useContext} from "react";
import type {ViewStore} from "@/components/DatabaseView/Views/ViewStore";
import {ColumnCaseHandlers} from "@/components/DatabaseView/DatabaseViewTypes";

const ColumnCaseContext = createContext<ColumnCaseHandlers | null>(null);

interface ColumnCaseProviderProps {
    store: ColumnCaseHandlers;
    children: React.ReactNode;
}

export function ColumnCaseProvider(props: ColumnCaseProviderProps) {
    return (
        <ColumnCaseContext.Provider value={props.store}>
            {props.children}
        </ColumnCaseContext.Provider>
    );
}

export function useColumnCaseContext(): ColumnCaseHandlers;
export function useColumnCaseContext<Result>(
    selector: (value: ColumnCaseHandlers) => Result
): Result;
export function useColumnCaseContext<Result>(selector?: (value: ColumnCaseHandlers) => Result) {
    const store = useContext(ColumnCaseContext);

    if (!store) {
        throw new Error("Can not `useStore` outside of the `StoreProvider`");
    }

    if (typeof selector === "function") {
        return selector(store);
    }

    return store;
}