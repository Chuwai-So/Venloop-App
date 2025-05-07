import {db, auth} from '../firebase';
import {requireAuth} from "@/app/contexts/authContext/requireAuth";
import {doCreateUserWithEmailAndPassword} from "@/app/auth";

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
            const userCred = await doCreateUserWithEmailAndPassword(data.email, data.password);
            const firebaseUser = userCred.user;


            const newRef = push(ref(db, ADMIN_PATH));
            const adminId = newRef.key;

            const admin = {
                id: adminId,
                firebaseUid: firebaseUser.uid,
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
    },

    async getAllAdmins() {
        requireAuth();
        try {
            const snapshot = await get(ref(db, ADMIN_PATH));
            if (!snapshot.exists()) return [];

            const data = snapshot.val();
            return Object.entries(data).map(([id, admin]) => ({
                id,
                ...admin
            }));
        } catch (err) {
            console.error("Firebase error in getAllAdmins: ", err);
            throw err;
        }
    },

    async getUnverifiedAdmins() {
        requireAuth();
        try {
            const snapshot = await get(ref(db, ADMIN_PATH));
            if (!snapshot.exists()) return [];

            const data = snapshot.val();
            return Object.entries(data)
                .filter(([, admin]) => admin.verified === false)
                .map(([id, admin]) => ({
                    id,
                    ...admin
                }));
        } catch (err) {
            console.error("Firebase error in getUnverifiedAdmins: ", err);
            throw err;
        }
    },

    async getAdminByFirebaseUid(firebaseUid) {
        try {
            const snapshot = await get(ref(db, ADMIN_PATH));
            if (!snapshot.exists()) return null;

            const data = snapshot.val();

            for (const [id, admin] of Object.entries(data)) {
                if (admin.firebaseUid === firebaseUid) {
                    return { id, ...admin };
                }
            }

            return null;
        } catch (err) {
            console.error("Firebase error in getAdminByFirebaseUid: ", err);
            throw err;
        }
    }



}
