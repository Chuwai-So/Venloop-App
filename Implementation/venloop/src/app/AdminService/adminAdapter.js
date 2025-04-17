import { db } from '../firebase';
import {
    ref,
    push,
    set,
    get,
    update,
    remove
} from 'firebase/database';

const ADMIN_PATH = 'admins';

export const AdminAdapter = {

    async createAdmin(data) {
        try {
            const newRef = push(ref(db, ADMIN_PATH)); //creates reference to the "teams" node in db
            const adminId = newRef.key; //auto generated id

            const admin = {
                id: adminId,
                name: data.name,
                email: data.email,
                verified: false,
                isSuper: false,  //Access to grant admin privilege
                password: null
            };

            await set(newRef, admin);
            return adminId;
        } catch (err) {
            console.error("Firebase error in create Admin: ", err);
            throw err;
        }
    },

    async getAdmin(adminId) {
        try {
            const snapshot = await get(ref(db, `${ADMIN_PATH}/${adminId}`));
            if (!snapshot.exists()) return null;
            return snapshot.val();
        } catch (err) {
            console.error("Firebase error in getAdmin: ", err);
            throw err;
        }
    },

    async updateAdmin(adminId, updates) {
        try {
            const adminRef = ref(db, `${ADMIN_PATH}/${adminId}`);
            await update(adminRef, updates);
        } catch (err) {
            console.error("Firebase error in updateAdmin: ", err);
            throw err;
        }
    },

    async deleteAdmin(adminId) {
        try {
            const adminRef = ref(db, `${ADMIN_PATH}/${adminId}`);
            await remove(adminRef);
        } catch (err) {
            console.error("Firebase error in deleteAdmin: ", err);
            throw err;
        }
    }

}