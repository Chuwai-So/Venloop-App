import TeamService from './teamService';
import {describe, it, expect, afterAll} from 'vitest';


describe('TeamService', () => {
    it('Should create a new team and return its ID', async () => {
        const data = {
            name: 'test',
            captain: 'testicle',
            members: ['right ball', 'left ball']
        };

        const teamId = await TeamService.createTeam(data);
        expect(teamId).toBeDefined();

        const created = await TeamService.getTeam(teamId);
        expect(created.name).toBe('test');
        await TeamService.deleteTeam(teamId);
    });

    it('Should update the captain of the team', async () => {
        // Create team first
        const data = {
            name: 'Captain Update Squad',
            captain: 'Old Captain',
            members: ['Tom', 'Jerry']
        };

        const teamId = await TeamService.createTeam(data);
        expect(teamId).toBeDefined();
        let capArray = ['New Captain1', 'New Captain2'];

        // 🔄 Update captain
        await TeamService.updateCaptain(teamId, capArray);

        // ✅ Check updated value
        const updated = await TeamService.getTeam(teamId);
        expect(updated.captain).toStrictEqual(capArray);
        await TeamService.deleteTeam(teamId);
    });

    it('Should delete a team', async () => {
        const data = {
            name: 'Delete Me',
            captain: 'Captain Gone',
            members: ['Ghost 1', 'Ghost 2']
        };

        const teamId = await TeamService.createTeam(data);
        expect(teamId).toBeDefined();

        // ✅ Delete it
        await TeamService.deleteTeam(teamId);

        // ❌ Should be gone
        const deleted = await TeamService.getTeam(teamId);
        expect(deleted).toBeNull();
        await TeamService.deleteTeam(teamId);
    });

    it('Should update a completed task for the team', async () => {
        const teamData = {
            name: 'Task Team',
            captain: 'Task Master',
            members: ['Tasker 1', 'Tasker 2']
        };

        const taskId = 'test-task-123'; // Simulate a task that exists globally
        const taskUpdate = {
            status: 'completed',
            answer: 'blue'
        };

        // 🏗️ Create team first
        const teamId = await TeamService.createTeam(teamData);
        expect(teamId).toBeDefined();

        // 🛠️ Update completed task
        await TeamService.updateTask(teamId, taskId, taskUpdate);

        // ✅ Verify completed task was added
        const updatedTeam = await TeamService.getTeam(teamId);
        expect(updatedTeam.completedTasks).toBeDefined();
        expect(updatedTeam.completedTasks[taskId]).toMatchObject({
            status: 'completed',
            answer: 'blue'
        });

        // 🧹 Clean up
        await TeamService.deleteTeam(teamId);
    });


})