import {db} from '../../firebase';
import qrUrls from "@/app/util/qrUrls";
import {
    ref,
    push,
    set,
    get,
    update,
    remove
} from 'firebase/database';

const TEAM_PATH = 'teams';
const TOKEN_PATH = 'teamTokens';

export const TeamAdapter = {
    async createTeam(data) {
        try {
            const newRef = push(ref(db, TEAM_PATH));
            const teamId = newRef.key;

            const team = {
                id: teamId,
                name: data.name,
                scoreHistory: {},
                completedTasks: {},
                captain: data.captain || [],
                occupied: false,
                teamToken: null
            };

            await set(newRef, team);
            return teamId;
        } catch (err) {
            console.error('Firebase error creating team:', err);
            throw err;
        }
    },

    async getTeam(teamId) {
        try {
            const snapshot = await get(ref(db, `${TEAM_PATH}/${teamId}`));
            return snapshot.exists() ? snapshot.val() : null;
        } catch (err) {
            console.error('Firebase error getting team:', err);
            throw err;
        }
    },

    async updateTeam(teamId, updates) {
        try {
            const teamRef = ref(db, `${TEAM_PATH}/${teamId}`);
            await update(teamRef, updates);
        } catch (err) {
            console.error('Firebase error updating team:', err);
            throw err;
        }
    },

    async deleteTeam(teamId) {
        try {
            await this.removeTeamTokenForTeam(teamId);
            await remove(ref(db, `${TEAM_PATH}/${teamId}`));
        } catch (err) {
            console.error('Firebase error deleting team:', err);
            throw err;
        }
    },

    async getAllTeams() {
        try {
            const snapshot = await get(ref(db, TEAM_PATH));
            const data = snapshot.exists() ? snapshot.val() : {};
            return Object.entries(data).map(([id, team]) => ({id, ...team}));
        } catch (err) {
            console.error("Firebase error getAllTeams", err);
            throw err;
        }
    },

    async updateTaskStatus(teamId, taskId, status) {
        try {
            await update(ref(db), {
                [`${TEAM_PATH}/${teamId}/completedTasks/${taskId}/status`]: status
            });
        } catch (err) {
            console.error(`Firebase error updating task status for ${taskId}:`, err);
            throw err;
        }
    },

    async removeCompletedTask(teamId, taskId) {
        try {
            await remove(ref(db, `${TEAM_PATH}/${teamId}/completedTasks/${taskId}`));
        } catch (err) {
            console.error(`Firebase error removing completed task ${taskId}:`, err);
            throw err;
        }
    },

    async joinTeamAsCaptain(teamId) {
        try {
            await this.updateTeam(teamId, {
                occupied: true,
            });
            return true;
        } catch (err) {
            console.error(`Firebase error joining team ${teamId} as captain:`, err);
            throw err;
        }
    },

    async kickCaptain(teamId) {
        console.log("kicking captain from adapter");
        try {
            await this.removeTeamTokenForTeam(teamId);
            await this.updateTeam(teamId, {
                captain: null,
                occupied: false
            });
            return true;
        } catch (err) {
            console.error('Error kicking captain:', err);
            return false;
        }
    },

    async removeTeamTokenForTeam(teamId) {
        try {
            const tokensRef = ref(db, TOKEN_PATH);
            const snapshot = await get(tokensRef);

            if (snapshot.exists()) {
                const tokens = snapshot.val();
                const tokenEntry = Object.entries(tokens).find(
                    ([, value]) => value.teamId === teamId
                );
                console.log("token found");
                console.log("here is the token entry:", tokenEntry);

                if (tokenEntry) {
                    const [tokenKey] = tokenEntry;
                    await remove(ref(db, `${TOKEN_PATH}/${tokenKey}`));
                }
            }
        } catch (err) {
            console.error(`Failed to remove team token for team ${teamId}:`, err);
        }
    },

    async deleteSubmittedPictures(teamId) {
        try {
            const teamSnap = await get(ref(db, `${TEAM_PATH}/${teamId}`));
            if (!teamSnap.exists()) return false;

            const team = teamSnap.val();
            const completedTasks = team.completedTasks || {};

            const updates = {};
            for (const [taskId, task] of Object.entries(completedTasks)) {
                if (task.picture) {
                    updates[`${TEAM_PATH}/${teamId}/completedTasks/${taskId}`] = null;
                }
            }

            if (Object.keys(updates).length === 0) return false;

            await update(ref(db), updates);
            return true;
        } catch (err) {
            console.error(`Firebase error removing submitted pictures for team ${teamId}:`, err);
            throw err;
        }
    }

};
