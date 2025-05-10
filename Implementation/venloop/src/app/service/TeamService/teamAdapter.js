import { db } from '../../firebase';
import qrUrls from "@/app/util/qrUrls";
import {
    ref,
    push,
    set,
    get,
    update,
    remove
} from 'firebase/database';
import {ref as dbRef} from "@firebase/database";

const TEAM_PATH = 'teams';

export const TeamAdapter = {


    async createTeam(data) {
        try {
            const newRef = push(ref(db, TEAM_PATH));
            const teamId = newRef.key;
            const teamURL = qrUrls.teamDetail(teamId);

            const team = {
                id: teamId,
                name: data.name,
                scoreHistory: {},
                completedTasks: {},
                captain: data.captain || [],
                occupied: false,
                qrURL: teamURL

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
            const teamRef = ref(db, `${TEAM_PATH}/${teamId}`);
            await remove(teamRef);
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
           console.error("Firebase error getAllTeams ", err)
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
            const taskRef = ref(db, `${TEAM_PATH}/${teamId}/completedTasks/${taskId}`);
            await remove(taskRef);
        } catch (err) {
            console.error(`Firebase error removing completed task ${taskId}:`, err);
            throw err;
        }
    },

    async joinTeamAsCaptain(teamId, captainToken) {
        try {
            const updates = {
                occupied: true,
                captainToken: captainToken
            };
            const teamRef = ref(db, `${TEAM_PATH}/${teamId}`);
            await update(teamRef, updates);
            return true;
        } catch (err) {
            console.error(`Firebase error joining team ${teamId} as captain:`, err);
            throw err;
        }
    },

    async kickCaptain(teamId) {
        try {
            const tokensRef = dbRef(db, 'qr_tokens');
            const snapshot = await get(tokensRef);
            if (snapshot.exists()) {
                const tokens = snapshot.val();
                const tokenEntry = Object.entries(tokens).find(
                    ([, value]) => value.teamId === teamId
                );

                if (tokenEntry) {
                    const [tokenKey] = tokenEntry;


                    await remove(dbRef(db, `qr_tokens/${tokenKey}`));
                }
            }


            await update(dbRef(db, `teams/${teamId}`), {
                captain: null,
                occupied: false,
            });

            return true;
        } catch (err) {
            console.error('Error kicking captain:', err);
            return false;
        }
    },


};


