import { TeamAdapter } from './teamAdapter';

 const TeamService = {

    async createTeam(data) {
        const teamId = await TeamAdapter.createTeam(data);
        return teamId;
    },

    async getTeam(teamId) {
       return TeamAdapter.get(teamId);
    }
}

export default TeamService;