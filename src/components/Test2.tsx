import { createContext, useContextSelector } from 'use-context-selector';
import React, {FC, useState} from "react";

const Context = createContext<any>(null);

const Counter1 = () => {
    const count1 = useContextSelector(Context, v => v[0].count1);
    const setState = useContextSelector(Context, v => v[1]);
    const increment = () => setState((s: any) => ({
        ...s,
        count1: s.count1 + 1,
    }));
    return (
        <div>
            <span>Count1: {count1}</span>
            <button type="button" onClick={increment}>+1</button>
        </div>
    );
};

const Counter2 = () => {
    const count2 = useContextSelector(Context, v => v[0].count2);
    const setState = useContextSelector(Context, v => v[1]);
    const increment = () => setState((s:any) => ({
        ...s,
        count2: s.count2 + 1,
    }));
    return (
        <div>
            <span>Count2: {count2}</span>
            <button type="button" onClick={increment}>+1</button>
        </div>
    );
};

const StateProvider: FC<{children: React.ReactNode}> = ({ children }) => (
    <Context.Provider value={useState({ count1: 0, count2: 0 })}>
        {children}
    </Context.Provider>
);

export const Test2View = () => (
    <StateProvider>
        <Counter1 />
        <Counter2 />
    </StateProvider>
);