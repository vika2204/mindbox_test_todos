import {Button, Checkbox, CheckboxChangeEvent, Divider, Flex, Table, TableColumnsType} from 'antd';
import React, {useEffect, useState} from "react";
import {Task, TASK_STATUS} from "../../../entities/Task/model";
import {TaskService} from "../../../entities/Task/api";
import {Filters} from "./Filters.tsx";
import AddTask from "./AddTask.tsx";

export function TaskList() {
    const [filterByStatus, setFilterByStatus] = useState<TASK_STATUS|null>(null);
    let [tasks, setTasks] = useState<Task[]>(TaskService.loadTasks());

    const columns: TableColumnsType<Task> = [
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            render: (text, record) => (
                <>
                    <Checkbox
                        onChange={(e) => handleCheckboxChange(e, record.key)}
                        checked={record.status === TASK_STATUS.DONE}
                    >{record.status === TASK_STATUS.DONE ? <s>{text}</s> : text}</Checkbox>
                </>
            ),
        },
    ];

    function handleCheckboxChange(e: CheckboxChangeEvent, taskKey: React.Key) {
        setTasks(
            tasks.map((task: Task) => {
                if (task.key !== taskKey) {
                    return task;
                }

                task.status = e.target.checked ? TASK_STATUS.DONE : TASK_STATUS.TODO;
                return task;
            })
        )
    }

    function createTask(taskName: string): void {
        let newTask: Task = {
            key: tasks.length + 1,
            taskName: taskName,
            status: TASK_STATUS.TODO,
        }

        setTasks([newTask, ...tasks]);
    }

    function clearCompletedTasks(): void {
        setTasks(
            tasks.filter((task: Task) => task.status !== TASK_STATUS.DONE)
        )
    }

    useEffect((): void => {
        TaskService.saveTasks(tasks);
    }, [tasks]);

    return (
        <>
            <AddTask onAdd={(tt) => createTask(tt)}/>
            <Divider></Divider>
            <Filters currentFilter={filterByStatus} setFilter={setFilterByStatus}/>
            <Divider></Divider>
            <Table<Task>
                columns={columns}
                dataSource={[...tasks.filter((task: Task) => filterByStatus ? task.status === filterByStatus : true)]}
                showHeader={false}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 10
                }}
                footer={() => <Flex justify={"space-between"}>{
                    tasks.filter((task: Task) => task.status === TASK_STATUS.TODO).length
                } left <Button onClick={clearCompletedTasks}>Clear completed</Button></Flex>}
            />
        </>
    );
}

