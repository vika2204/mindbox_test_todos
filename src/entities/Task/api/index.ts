import {Task} from "../model";

export class TaskService {
    static loadTasks(): Task[] {
        const tasks = localStorage.getItem('tasks');

        if (tasks === null) {
            return [];
        }

        return JSON.parse(tasks).map((task: Task, index: number): Task => {
            task.key = index + 1;

            return task;
        })
    }

    static saveTasks(tasks: Task[]): void {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
