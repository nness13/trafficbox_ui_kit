import {v4 as uuidv4} from "uuid"


export const loadTodosFn = () => {
    const todos = [
        { id: uuidv4(), title: "Cook dinner", done: false },
        { id: uuidv4(), title: "Work", done: false },
        { id: uuidv4(), title: "Buy bread", done: false },
        { id: uuidv4(), title: "Do something", done: false },
    ];

    return new Promise<typeof todos>((res) => {
        setTimeout(() => {
            res(todos);
        }, 1000);
    });
};