import React, { createContext, useContext } from 'react'
import { actionContext } from '@/components/DatabaseView/DatabaseViewTypes'

const ActionMenuContext = createContext<actionContext | null>(null);

interface EditPropsProviderProps {
    store: actionContext;
    children: React.ReactNode;
}

export function ActionMenuProvider(props: EditPropsProviderProps) {
    return (
        <ActionMenuContext.Provider value={props.store}>
            {props.children}
        </ActionMenuContext.Provider>
    );
}

export function useActionMenuContext(): actionContext;
export function useActionMenuContext<Result>(
    selector: (value: actionContext) => Result
): Result;
export function useActionMenuContext<Result>(selector?: (value: actionContext) => Result) {
    const store = useContext(ActionMenuContext);

    if (!store) {
        throw new Error("Can not `useStore` outside of the `StoreProvider`");
    }

    if (typeof selector === "function") {
        return selector(store);
    }

    return store;
}