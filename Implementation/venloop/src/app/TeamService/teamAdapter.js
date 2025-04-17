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

        const newRef = push(ref(db, TEAM_PATH)); //creates reference to the "teams" node in db
        const teamId = newRef.key; //auto generated id

        const team = {
            id: teamId,
            name: data.name,
            scoreHistory: {},
            completedTasks: {},
            captain: data.captain || []
        };

        await set(newRef, team);
        return teamId;
    },

    async getTeam(teamId) {
        const snapshot = await get(ref(db, `${TEAM_PATH}/${teamId}`));
        return snapshot.exists() ? snapshot.val() : null;
    },


    async updateTeam(teamId, updates) {
        const teamRef = ref(db, `${TEAM_PATH}/${teamId}`);
        await update(teamRef, updates);
    },

    async deleteTeam(teamId) {
        const teamRef = ref(db, `${TEAM_PATH}/${teamId}`);
        await remove(teamRef);
    },

    async getAllTeams() {
       try {
           const teaRef = await get(ref(db, TEAM_PATH));
           return snapshot.exists() ? snapshot.val() : {};
       } catch (err) {
           console.error("Firebase error getAllTeams ", err)
           throw err;
       }
    }




}


