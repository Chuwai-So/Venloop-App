import { describe, it, expect, afterAll } from 'vitest';
import TeamService from "@/app/service/TeamService/teamService";
import TaskService from "@/app/service/TaskService/taskService";

describe("TeamDetail", () =>{
    it('Should display completed task in UI', async () =>{
        const id = "-OP4yImpm78haTDmZOjF";
        const team = await TeamService.getTeam("-OP4yImpm78haTDmZOjF");

        const taskId = 'test-task-123'; // Simulate a task that exists globally
        const taskUpdate = {
            status: 'completed',
            answer: 'blue'
        };

        await TeamService.completeTask(id, taskId, taskUpdate);
    });

    it("Should mark tasks as correct and incorrect and update UI data", async () => {
        const teamId = "-OP4yImpm78haTDmZOjF";

        // Simulate one correct answer
        const correctTaskId = "-OPUyuVwhE6pme5UivOi";
        const correctAnswer = "blue";
        const correctTask = await TaskService.getTask(correctTaskId)
        console.log(`Answer from correctTask: ${correctTask.name}`)
        await TeamService.completeTask(teamId, correctTaskId, correctAnswer);

        // Simulate one incorrect answer
        const incorrectTaskId = "-OPUyuZHKB9vsF818yg6";
        await TeamService.completeTask(teamId, incorrectTaskId, "red");
        console.log("h1h1")
        const team = await TeamService.getTeam(teamId);
        expect(team.completedTasks[correctTaskId].result).toBe("correct");
        expect(team.completedTasks[incorrectTaskId].result).toBe("incorrect");
    });

    it('returns correct for matching strings (case-insensitive)', () => {
        const result = TeamService.evaluate("Blue", "blue");
        expect(result).toBe("correct");
    });

    it('returns incorrect for non-matching strings', () => {
        const result = TeamService.evaluate("red", "blue");
        expect(result).toBe("incorrect");
    });

    it('returns null for non-string input', () => {
        const result = TeamService.evaluate(["blue"], "blue");
        expect(result).toBeNull();
    });

    it('trims whitespace before comparing', () => {
        const result = TeamService.evaluate("  green ", "green");
        expect(result).toBe("correct");
    });

})