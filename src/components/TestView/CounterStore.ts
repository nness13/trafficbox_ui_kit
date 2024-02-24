import {makeAutoObservable} from "mobx";

export class CounterStoreClass {
    count1: number = 0;
    count2: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increment1(value: number) {
        this.count1 += value
    }
    decrement1(value: number) {
        this.count1 -= value
    }
    increment2(value: number) {
        this.count2 += value
    }
    decrement2(value: number) {
        this.count2 -= value
    }
}
export const CounterStore = new CounterStoreClass()