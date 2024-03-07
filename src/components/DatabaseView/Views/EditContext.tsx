import React, {createContext, useContext} from "react";
import { editContext } from '@/components/DatabaseView/DatabaseViewTypes'

const EditContext = createContext<editContext | null>(null);

interface EditProviderProps {
    store: editContext;
    children: React.ReactNode;
}

export function EditProvider(props: EditProviderProps) {
    return (
        <EditContext.Provider value={props.store}>
            {props.children}
        </EditContext.Provider>
    );
}

export function useEditContext(): editContext;
export function useEditContext<Result>(
    selector: (value: editContext) => Result
): Result;
export function useEditContext<Result>(selector?: (value: editContext) => Result) {
    const store = useContext(EditContext);

    if (!store) {
        throw new Error("Can not `useStore` outside of the `StoreProvider`");
    }

    if (typeof selector === "function") {
        return selector(store);
    }

    return store;
}