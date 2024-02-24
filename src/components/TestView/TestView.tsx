import React from "react";
import {observer} from "mobx-react-lite";
import {CounterStore} from "@/components/TestView/CounterStore";


export const TestView = () => (
    <div>
        <Counter1 />
        <Counter2 />
    </div>
);

const Counter1 = observer(() => {
    const increment = () => CounterStore.increment1(1)
    return (
        <div>
            <span>Count1: {CounterStore.count1}</span>
            <button type="button" onClick={increment}>+1</button>
        </div>
    );
});

const Counter2 = () => {
    const increment = () => CounterStore.increment2(1)
    return (
        <div>
            <span>Count2: {CounterStore.count2}</span>
            <button type="button" onClick={increment}>+1</button>
        </div>
    );
};
