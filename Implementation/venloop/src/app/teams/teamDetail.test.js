import { describe, it, expect, afterAll } from 'vitest';
import TeamService from "../TeamService/teamService";
import TaskService from "../TaskService/taskService";

describe("TeamDetail", () =>{
    it('Should display completed task in UI', async () =>{
        const id = "-OP4yImpm78haTDmZOjF";
        const team = await TeamService.getTeam("-OP4yImpm78haTDmZOjF");

        const taskId = 'test-task-123'; // Simulate a task that exists globally
        const taskUpdate = {
            status: 'completed',
            answer: 'blue'
        };

        await TeamService.updateTask(id, taskId, taskUpdate);
    })
})