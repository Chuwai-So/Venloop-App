import { TeamAdapter } from './teamAdapter';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import TaskService from "../TaskService/taskService";
import {update} from "firebase/database";
import {storage} from "../firebase";


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

    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result); // Base64 string
            reader.onerror = reject;
            reader.readAsDataURL(file); // Includes the data MIME header
        });
    },


    async addPendingTask(teamId, taskId, file) {
        try {
            const imageURL = await this.fileToBase64(file)
            const updates = {
                [`pendingTasks/${taskId}`]: {
                    picture: imageURL,
                    uploadedAt: new Date().toISOString(),
                    status: 'pending'
                }
            };
            await TeamAdapter.updateTeam(teamId, updates);
            return true;
        } catch (err) {
            console.error("Error adding pending task:", err);
            return false
        }
    },

    async completeTask(teamId, taskId, input) {
        const team = await TeamAdapter.getTeam(teamId);
        if (team?.completedTasks?.[taskId]) {
            console.warn(`Task ${taskId} already completed`);
            return false;
        }

        const task = await TaskService.getTask(taskId)
        const correctAnswer = task?.answer

        let verdict = null;
        if (correctAnswer !== undefined && input !== undefined) {
            verdict = this.evaluate(input, correctAnswer);
        }

        try {
            const updates = {
                [`completedTasks/${taskId}`]: {
                    //...data,
                    userAnswer:input,
                    result: verdict,
                    name: task.name,
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
    },

    evaluate(userInput, correctAnswer) {
        if (typeof userInput == 'string' && typeof correctAnswer == 'string') {
            return userInput.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
                ? 'correct'
                : 'incorrect';
        }
        return null;
    }
};

export default TeamService;