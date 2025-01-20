import React from "react";

export type Task = {
    key: React.Key;
    taskName: string;
    status: TASK_STATUS;
}

export enum TASK_STATUS {
    DONE = "DONE",
    TODO = "TODO",
}
