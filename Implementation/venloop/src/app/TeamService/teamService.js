import { TeamAdapter } from './teamAdapter';

const TeamService = {
    async createTeam(data) {
        try {
            return await TeamAdapter.createTeam(data);
        } catch (err) {
            console.error("Error creating team:", err);
            return null;
        }
    },

    async getTeam(teamId) {
        try {
            return await TeamAdapter.getTeam(teamId);
        } catch (err) {
            console.error("Error fetching team:", err);
            return null;
        }
    },

    async updateTeam(teamId, data) {
        try {
            return await TeamAdapter.updateTeam(teamId, data);
        } catch (err) {
            console.error("Error updating team:", err);
            return null;
        }
    },

    async getTeamQR(teamId) {
        try {
            const team = await TeamAdapter.getTeam(teamId);
            return team?.qrURL || null;
        } catch (err) {
            console.error("Error getting team QR code: ", err);
            return null;
        }
    },

    async updateCaptain(teamId, captains) {
        try {
            return await TeamAdapter.updateTeam(teamId, { captain: captains });
        } catch (err) {
            console.error("Error updating captain:", err);
            return null;
        }
    },

    async updateTask(teamId, taskId, data) {
        const team = await TeamAdapter.getTeam(teamId);
        if (team?.completedTasks?.[taskId]) {
            console.warn(`Task ${taskId} already completed`);
            return false;
        }
        try {
            const updates = {
                [`completedTasks/${taskId}`]: {
                    ...data,
                    completedAt: new Date().toISOString()
                }
            };
            return TeamAdapter.updateTeam(teamId, updates);
        } catch (err) {
            console.error("Error updating task progress:", err);
            return null;
        }
    },


    async deleteTeam(teamId) {
        try {
            return await TeamAdapter.deleteTeam(teamId);
        } catch (err) {
            console.error("Error deleting team:", err);
            return null;
        }
    },

    async getAllTeams() {
        try {
            return await TeamAdapter.getAllTeams();
        } catch (err) {
            console.error("Error retrieving all teams:", err);
            return null;
        }
    }
};

export default TeamService;