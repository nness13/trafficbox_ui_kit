// Custom hook to communicate with store
import {Context, createContext, useCallback, useContext, useRef, useSyncExternalStore} from "react";


// Custom hook which pass through the context provider
const useStoreData = <T extends Record<string, any>>(initialData: T) => {
    const store = useRef(initialData);

    // getter method which retrieves store value
    const get = useCallback(() => store.current, []);

    // store the callback which subscribes the store
    const subscribers = useRef(new Set());

    // setter method which update the store value and calls the subscribe function
    const set = useCallback((value: T) => {
        store.current = { ...store.current, ...value };
        return subscribers.current.forEach((callback: any) => callback());
    }, []);

    // subscribe method which adds callback to subscribers
    // and returns the cleanup function
    const subscribe = useCallback((callback: any) => {
        subscribers.current.add(callback);
        return () => subscribers.current.delete(callback);
    }, []);

    return { get, set, subscribe };
};

const useStore = (InitContext: Context<any>, selector: Function) => {
    const store = useContext(InitContext);

    // subscribe the store and get the value from store
    const state = useSyncExternalStore(
        store.subscribe,
        () => selector(store.get())
    );

    return [state, store.set]; // [store value, set method]
};