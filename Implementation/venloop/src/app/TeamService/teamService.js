import { TeamAdapter } from './teamAdapter';
import {requireAuth} from "@/app/contexts/authContext/requireAuth";

const TeamService = {
    async createTeam(data) {
        try {
            requireAuth();
            return await TeamAdapter.createTeam(data);
        } catch (err) {
            console.error("Error creating team:", err);
            return null;
        }
    },

    async getTeam(teamId) {
        try {
            requireAuth();
            return await TeamAdapter.getTeam(teamId);
        } catch (err) {
            console.error("Error fetching team:", err);
            return null;
        }
    },

    async updateTeam(teamId, data) {
        try {
            requireAuth();
            return await TeamAdapter.updateTeam(teamId, data);
        } catch (err) {
            console.error("Error updating team:", err);
            return null;
        }
    },

    async getTeamQR(teamId) {
        try {
            requireAuth();
            const team = await TeamAdapter.getTeam(teamId);
            return team?.qrURL || null;
        } catch (err) {
            console.error("Error getting team QR code: ", err);
            return null;
        }
    },

    async updateCaptain(teamId, captains) {
        try {
            requireAuth();
            return await TeamAdapter.updateTeam(teamId, { captain: captains });
        } catch (err) {
            console.error("Error updating captain:", err);
            return null;
        }
    },

    async updateTask(teamId, taskId, taskData) {
        try {
            requireAuth();
            const field = `completedTasks/${taskId}`;
            return await TeamAdapter.updateTeam(teamId, { [field]: taskData });
        } catch (err) {
            console.error("Error updating task progress:", err);
            return null;
        }
    },

    async deleteTeam(teamId) {
        try {
            requireAuth();
            return await TeamAdapter.deleteTeam(teamId);
        } catch (err) {
            console.error("Error deleting team:", err);
            return null;
        }
    },

    async getAllTeams() {
        try {
            requireAuth();
            return await TeamAdapter.getAllTeams();
        } catch (err) {
            console.error("Error retrieving all teams:", err);
            return null;
        }
    }
};

export default TeamService;