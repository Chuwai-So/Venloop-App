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
            members: data.members || [],
            captain: data.captain || null,
        };

        await set(newRef, team);
        return teamId;
    },

    async get(teamId) {
        const snapshot = await get(ref(db, `${TEAM_PATH}/${teamId}`));
        return snapshot.exists() ? snapshot.val() : null;
    }
}