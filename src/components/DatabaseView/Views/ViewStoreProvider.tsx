import {useViewReducer, ViewReducerContext} from "@/components/DatabaseView/Views/ViewStoreContext"
import React, {FC} from "react";

export const ViewStoreProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const viewReducer = useViewReducer()

    return (
        <ViewReducerContext.Provider value={viewReducer}>
            {children}
        </ViewReducerContext.Provider>
    )
}