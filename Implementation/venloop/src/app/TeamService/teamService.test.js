import TeamService from './teamService';
import { describe, it, expect } from 'vitest';

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
    })
})