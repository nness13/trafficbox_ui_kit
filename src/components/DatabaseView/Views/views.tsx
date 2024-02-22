import {TableView} from "@/components/DatabaseView/Views/TableView/TableView";
import React from "react";

export const views = {
    table: TableView,
    card: () => <div/>,
} as const