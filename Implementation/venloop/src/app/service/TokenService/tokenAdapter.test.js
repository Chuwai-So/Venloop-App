import { describe, it, expect } from 'vitest';
import { TokenAdapter } from '@/app/service/TokenService/tokenAdapter';

describe('TokenAdapter', () => {
    it('should return teamId for a valid token from Firebase', async () => {
        const token = 'b0917c0a-cd27-40e0-bcbd-57083a01f31d';

        const teamId = await TokenAdapter.getTeamId(token);

        console.log('Returned teamId:', teamId);
        expect(teamId).toBeDefined(); // You can replace with a hardcoded teamId if you know it
    });
});