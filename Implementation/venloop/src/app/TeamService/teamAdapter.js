import { db } from '../firebase';
import {
    ref,
    push,
    set,
    get,
    update,
    remove
} from 'firebase/database';

const TEAM_PATH = 'teams';

export const TeamAdapter = {

    async createTeam(data) {
        try {
            const newRef = push(ref(db, TEAM_PATH));
            const teamId = newRef.key;
            const teamURL = `https://venloop-ee862.web.app/teams/activate/${teamId}`;

            const team = {
                id: teamId,
                name: data.name,
                scoreHistory: {},
                completedTasks: {},
                captain: data.captain || [],
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
    }
};


