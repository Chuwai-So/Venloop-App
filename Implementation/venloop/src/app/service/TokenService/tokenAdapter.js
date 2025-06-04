import {db} from '../../firebase';
import {
    ref,
    push,
    set,
    get,
    remove
} from 'firebase/database';

const TEAM_TOKEN_PATH = 'teamTokens';
const EVENT_TOKEN_PATH = 'eventToken';

export const TokenAdapter = {
    async getTeamId(token) {
        try {
            const snapshot = await get(ref(db, `${TEAM_TOKEN_PATH}/${token}`));
            return snapshot.exists() ? snapshot.val().teamId : null;
        } catch (err) {
            console.error('Firebase error getting team by token:', err);
            throw err;
        }
    },

    async setGlobalEventToken() {
        try {
            const newTokenRef = push(ref(db, 'temp')); // use push just to generate a key
            const newToken = newTokenRef.key;
            await set(ref(db, EVENT_TOKEN_PATH), {token: newToken});
            return newToken;
        } catch (err) {
            console.error("Error generating and setting global event token:", err);
            throw err;
        }
    },

    async getGlobalEventToken() {
        try {
            const snapshot = await get(ref(db, EVENT_TOKEN_PATH));
            return snapshot.exists() ? snapshot.val().token : null;
        } catch (err) {
            console.error("Error getting global event token:", err);
            throw err;
        }
    },

    async deleteTeamToken(teamToken) {
        try {
            await remove (ref(db, `${TEAM_TOKEN_PATH}/${teamToken}`))
        } catch (err) {
            console.error("Error deleting chosen teamToken:", err)
            throw err;
        }
    },

    async deleteAllTeamTokens() {
        try {
            await remove(ref(db, TEAM_TOKEN_PATH));
        } catch (err) {
            console.error("Error deleting all teams from database:", err);
            throw err;
        }
    }
};
