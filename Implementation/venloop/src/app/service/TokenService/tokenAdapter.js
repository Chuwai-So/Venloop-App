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

const PATH = 'teamTokens';
export const TokenAdapter = {
    async getTeamId(token) {
    try {
        const snapshot = await get(ref(db, `${PATH}/${token}`));
        return snapshot.exists() ? snapshot.val().teamId : null;
    } catch (err) {
        console.error('Firebase error getting team:', err);
        throw err;
    }
},
}
