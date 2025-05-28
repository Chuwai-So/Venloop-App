import { TeamAdapter } from './teamAdapter';
import TaskService from "@/app/service/TaskService/taskService";
import { ref as dbRef, get } from 'firebase/database';
import { db } from "@/app/firebase";
import { handle } from "@/app/service/serviceHandler";
import { requireAuth } from "@/app/contexts/authContext/requireAuth";

const TeamService = {
    async createTeam(data) {
        return handle(TeamAdapter.createTeam(data), "creating team");
    },

    async verifyTokenAndGetTeamId(token) {
        return handle(
            (async () => {
                const snapshot = await get(dbRef(db, `teamTokens/${token}`));
                if (snapshot.exists()) {
                    return snapshot.val().teamId;
                }
                throw new Error("Invalid token.");
            })(),
            "verifying token"
        );
    },

    async getTeam(teamId) {
        return handle(TeamAdapter.getTeam(teamId), "fetching team");
    },

    async updateTeam(teamId, data) {
        return handle(TeamAdapter.updateTeam(teamId, data), "updating team");
    },

    async getTeamQR(teamId) {
        return handle(
            (async () => {
                const team = await TeamAdapter.getTeam(teamId);
                return team?.qrURL || null;
            })(),
            "getting team QR code"
        );
    },

    async updateCaptain(teamId, captains) {
        return handle(TeamAdapter.updateTeam(teamId, { captain: captains }), "updating captain");
    },

    async fileToBase64(file) {
        if (!(file instanceof Blob)) throw new Error("Invalid file format");
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    async submitTask(teamId, taskId, file) {
        return handle(
            (async () => {
                const imageURL = await this.fileToBase64(file);
                return await this.updateTeamWithPicture(teamId, `pendingTasks/${taskId}`, imageURL, 'pending');
            })(),
            "submitting task"
        );
    },

    async submitPictureTask(teamId, taskId, file) {
        return handle(
            (async () => {
                const team = await TeamAdapter.getTeam(teamId);
                if (this.isTaskAlreadyCompleted(team, taskId)) return false;

                const imageURL = await this.fileToBase64(file);
                const task = await TaskService.getTask(taskId);

                return await this.updateTeamWithPicture(
                    teamId,
                    `completedTasks/${taskId}`,
                    imageURL,
                    'pending',
                    task?.name || taskId
                );
            })(),
            "submitting picture task"
        );
    },

    async completeTask(teamId, taskId, input) {
        return handle(
            (async () => {
                const team = await TeamAdapter.getTeam(teamId);
                if (this.isTaskAlreadyCompleted(team, taskId)) return false;

                const task = await TaskService.getTask(taskId);
                const verdict = this.evaluate(input, task?.answer);
                const updates = {
                    [`completedTasks/${taskId}`]: {
                        userAnswer: input,
                        result: verdict,
                        name: task?.name,
                        completedAt: new Date().toISOString()
                    }
                };
                return await TeamAdapter.updateTeam(teamId, updates);
            })(),
            "completing task"
        );
    },

    async deleteTeam(teamId) {
        return handle(TeamAdapter.deleteTeam(teamId), "deleting team");
    },

    async getAllTeams() {
        return handle(TeamAdapter.getAllTeams(), "retrieving all teams");
    },

    evaluate(userInput, correctAnswer) {
        return (typeof userInput === 'string' && typeof correctAnswer === 'string')
            ? userInput.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
                ? 'correct' : 'incorrect'
            : null;
    },

    async updateTaskStatus(teamId, taskId, newStatus) {
        return handle(TeamAdapter.updateTaskStatus(teamId, taskId, newStatus), "updating task status");
    },

    async removeCompletedTask(teamId, taskId) {
        return handle(TeamAdapter.removeCompletedTask(teamId, taskId), "removing completed task");
    },

    async joinTeamAsCaptain(teamId) {
        return handle(
            (async () => {
                await TeamAdapter.joinTeamAsCaptain(teamId);
                return await TeamAdapter.getTeam(teamId);
            })(),
            "joining team as captain"
        );
    },

    async kickCaptain(teamId) {
        return handle(TeamAdapter.kickCaptain(teamId), "kicking captain");
    },

    isTaskAlreadyCompleted(team, taskId) {
        if (team?.completedTasks?.[taskId]) {
            console.warn(`Task ${taskId} already completed`);
            return true;
        }
        return false;
    },

    async updateTeamWithPicture(teamId, path, imageURL, status, name = null) {
        const updates = {
            [path]: {
                picture: imageURL,
                uploadedAt: new Date().toISOString(),
                status,
            }
        };
        if (name) updates[path].name = name;

        return handle(TeamAdapter.updateTeam(teamId, updates), "updating team with picture");
    },

    async deleteSubmittedPictures(teamId) {
        return handle(TeamAdapter.deleteSubmittedPictures(teamId), "deleting submitted pictures");
    },

    async deleteAllTeams() {
        requireAuth();

        const teams = await handle(TeamAdapter.getAllTeams(), "retrieving all teams for bulk delete");
        if (!teams || !Array.isArray(teams)) return false;

        const deletions = await Promise.all(
            teams.map(team => handle(TeamAdapter.deleteTeam(team.id), `deleting team ${team.id}`))
        );

        return deletions.every(Boolean);
    }
};

export default TeamService;
