import { db } from '../../firebase';
import { requireAuth } from "@/app/contexts/authContext/requireAuth";
import { doCreateUserWithEmailAndPassword } from "@/app/auth";
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
    },

    async getAdmin(adminId) {
        requireAuth();
        const snapshot = await get(ref(db, `${ADMIN_PATH}/${adminId}`));
        return snapshot.exists() ? snapshot.val() : null;
    },

    async updateAdmin(adminId, updates) {
        requireAuth();
        await update(ref(db, `${ADMIN_PATH}/${adminId}`), updates);
    },

    async deleteAdmin(adminId) {
        requireAuth();
        await remove(ref(db, `${ADMIN_PATH}/${adminId}`));
    },

    async getAllAdmins() {
        requireAuth();
        const snapshot = await get(ref(db, ADMIN_PATH));
        if (!snapshot.exists()) return [];
        const data = snapshot.val();
        return Object.entries(data).map(([id, admin]) => ({ id, ...admin }));
    },

    async getUnverifiedAdmins() {
        requireAuth();
        const snapshot = await get(ref(db, ADMIN_PATH));
        if (!snapshot.exists()) return [];
        const data = snapshot.val();
        return Object.entries(data)
            .filter(([, admin]) => admin.verified === false)
            .map(([id, admin]) => ({ id, ...admin }));
    },

    async getAdminByFirebaseUid(firebaseUid) {
        requireAuth()
        const snapshot = await get(ref(db, ADMIN_PATH));
        if (!snapshot.exists()) return null;
        const data = snapshot.val();

        for (const [id, admin] of Object.entries(data)) {
            if (admin.firebaseUid === firebaseUid) {
                return { id, ...admin };
            }
        }

        return null;
    }
};
