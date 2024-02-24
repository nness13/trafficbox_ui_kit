import {makeAutoObservable} from "mobx";
import {v4 as uuidv4} from "uuid"
import {loadTodosFn} from "@/components/TestView/EmulationLoadingItems";

export interface TodoItem {
    id: string;
    title: string;
    done: boolean;
}

export class TodoStore {
    items: TodoItem[] = [];
    status: "init" | "loading" | "success" | "error" = "init";

    constructor() {
        makeAutoObservable(this);
    }

    addTodo({ title }: { title: string }) {
        this.items.push({
            id: uuidv4(),
            title: title,
            done: false,
        });
    }

    deleteTodo({ id }: { id: string }) {
        const index = this.items.findIndex((todo) => todo.id === id);
        if (index === -1) return;
        this.items.splice(index, 1);
    }

    toggleTodoDone({ id }: { id: string }) {
        const item = this.items.find((item) => item.id === id);
        if (!item) return;
        item.done = !item.done;
    }

    *fetchTodos(): FlowReturn<typeof loadTodosFn> {
        try {
            this.status = "loading";

            const result = yield loadTodosFn();

            this.items = result;
            this.status = "success";
        } catch (error) {
            this.status = "error";
            console.error(error);
        }
    }
}

export type FlowReturn<AsyncFunction extends (...args: any[]) => Promise<any>> =
    Generator<
        ReturnType<AsyncFunction>,
        void,
        Awaited<ReturnType<AsyncFunction>>
    >;