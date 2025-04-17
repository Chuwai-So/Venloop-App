import TaskService from "./taskService";
import { describe, it, expect } from 'vitest';
import taskService from "./taskService";

let testIds =[];


describe('TaskService', () => {
    it ('Should create a new task and return its ID', async () => {
        const data = {
            name: 'test task',
            description: 'eat shit'
        };
        const taskId = await TaskService.createTask(data);
        expect(taskId).toBeDefined;

        await TaskService.deleteTask(taskId);
    });

    it('Should create an unique QR URL of a created task', async () => {
        const data = {
            name: 'test task 2',
            description: 'jerk off'
        };
        const id = await TaskService.createTask(data);
        const url = await TaskService.getTaskQR(id);
        expect(url).toBeDefined;
        console.log(url);

        await TaskService.deleteTask(id);
    })

});