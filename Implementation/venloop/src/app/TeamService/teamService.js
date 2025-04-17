import {TeamAdapter} from './teamAdapter';

const TeamService = {

    async createTeam(data) {
        return await TeamAdapter.createTeam(data);
    },

    async getTeam(teamId) {
       return TeamAdapter.getTeam(teamId);
    },

    async updateTeam(teamId, data) {
        return TeamAdapter.updateTeam(teamId, data);
    },

     async updateCaptain(teamId, captains) {
         return TeamAdapter.updateTeam(teamId, { captain: captains });
     },

     async updateTask(teamId, taskId, taskData) {
         const field = `completedTasks/${taskId}`;
         return TeamAdapter.updateTeam(teamId, { [field]: taskData });
     },

    async deleteTeam(teamId) {
        return TeamAdapter.deleteTeam(teamId);
    },

    async getAllTeams() {
        try {
            return TeamAdapter.getAllTeams();
        } catch (err) {
            console.error("Error when getAllTeams ", err);
            return null;
        }
    }
}

export default TeamService;