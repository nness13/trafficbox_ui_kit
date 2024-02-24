import {TableView} from "@/components/DatabaseView2/Views/TableView/TableView";
import React from "react";

export const views = {
    table: TableView,
    card: () => <div/>,
} as const