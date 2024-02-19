import React, {createContext, ReactNode, useContext} from "react";
import {ViewStateType} from "@/components/DatabaseView/Views/TableView/TableViewTypes";

export const ItemContext = createContext<ViewStateType | null>(null);

// Компонент, який буде встановлювати контекст для елемента Item
export const ItemProvider = ({ children, value }: {children: ReactNode, value: ViewStateType}) => {
    return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

// Хук, який дозволить отримувати доступ до контексту в елементі Item та його дочірніх елементах
export const useItemContext = () => {
    return useContext(ItemContext);
};