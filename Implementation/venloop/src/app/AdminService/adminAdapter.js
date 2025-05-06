import {db} from '../firebase';
import {requireAuth} from "@/app/contexts/authContext/requireAuth";
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
        requireAuth();
        try {
            const newRef = push(ref(db, ADMIN_PATH));
            const adminId = newRef.key;

            const admin = {
                id: adminId,
                name: data.name,
                email: data.email,
                verified: false,
                isSuper: false,
                password: null
            };

            await set(newRef, admin);
            return adminId;
        } catch (err) {
            console.error("Firebase error in createAdmin: ", err);
            throw err;
        }
    },

    async getAdmin(adminId) {
        requireAuth();
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
        requireAuth();
        try {
            const adminRef = ref(db, `${ADMIN_PATH}/${adminId}`);
            await update(adminRef, updates);
        } catch (err) {
            console.error("Firebase error in updateAdmin: ", err);
            throw err;
        }
    },

    async deleteAdmin(adminId) {
        requireAuth();
        try {
            const adminRef = ref(db, `${ADMIN_PATH}/${adminId}`);
            await remove(adminRef);
        } catch (err) {
            console.error("Firebase error in deleteAdmin: ", err);
            throw err;
        }
    }
}
