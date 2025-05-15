import { TeamAdapter } from './teamAdapter';
import TaskService from "@/app/service/TaskService/taskService";
import { ref as dbRef, get } from 'firebase/database';
import { db } from "@/app/firebase";

const TeamService = {
    async createTeam(data) {
        return handle(TeamAdapter.createTeam(data), "creating team");
    },

    async verifyTokenAndGetTeamId(token) {
        const snapshot = await get(dbRef(db, `teamTokens/${token}`));
        if (snapshot.exists()) {
            return snapshot.val().teamId;
        }
        throw new Error("Invalid token.");
    },

    async getTeam(teamId) {
        return handle(TeamAdapter.getTeam(teamId), "fetching team");
    },

    async updateTeam(teamId, data) {
        return handle(TeamAdapter.updateTeam(teamId, data), "updating team");
    },

    async getTeamQR(teamId) {
        try {
            const team = await TeamAdapter.getTeam(teamId);
            return team?.qrURL || null;
        } catch (err) {
            console.error("Error getting team QR code:", err);
            return null;
        }
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
        try {
            const imageURL = await this.fileToBase64(file);
            return await this.updateTeamWithPicture(teamId, `pendingTasks/${taskId}`, imageURL, 'pending');
        } catch (err) {
            console.error("Error adding pending task:", err);
            return false;
        }
    },

    async submitPictureTask(teamId, taskId, file) {
        const team = await TeamAdapter.getTeam(teamId);
        if (this.isTaskAlreadyCompleted(team, taskId)) return false;

        try {
            const imageURL = await this.fileToBase64(file);
            const task = await TaskService.getTask(taskId);
            return await this.updateTeamWithPicture(
                teamId,
                `completedTasks/${taskId}`,
                imageURL,
                'pending',
                task?.name || taskId
            );
        } catch (err) {
            console.error("Error submitting picture task:", err);
            return false;
        }
    },

    async completeTask(teamId, taskId, input) {
        const team = await TeamAdapter.getTeam(teamId);
        if (this.isTaskAlreadyCompleted(team, taskId)) return false;

        try {
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
        } catch (err) {
            console.error("Error updating task progress:", err);
            return null;
        }
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

    async joinTeamAsCaptain(teamId, token) {
        try {
            await TeamAdapter.joinTeamAsCaptain(teamId, token);
            return await this.getTeam(teamId);
        } catch (err) {
            console.error("Error joining team as captain:", err);
            return null;
        }
    },

    async kickCaptain(teamId) {
        return handle(TeamAdapter.kickCaptain(teamId), "kicking captain");
    },

    // 🔁 Shared helpers
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
        await TeamAdapter.updateTeam(teamId, updates);
        return true;
    }
};

async function handle(promise, context) {
    try {
        return await promise;
    } catch (err) {
        console.error(`Error ${context}:`, err);
        return null;
    }
}

export default TeamService;
