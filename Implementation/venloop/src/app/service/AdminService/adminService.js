import { AdminAdapter } from "./adminAdapter";
import bcrypt from 'bcryptjs';
import { requireAuth } from "@/app/contexts/authContext/requireAuth";
import {handle} from "@/app/service/serviceHandler";




const AdminService = {
    async createAdmin(data) {
        return handle(AdminAdapter.createAdmin(data), "creating admin");
    },

    async getAdmin(adminId) {
        requireAuth();
        return handle(AdminAdapter.getAdmin(adminId), "fetching admin");
    },

    async approveAdmin(adminId) {
        requireAuth();
        return handle(AdminAdapter.updateAdmin(adminId, { verified: true }), "approving admin");
    },

    async setPassword(adminId, password) {
        requireAuth();
        try {
            const hashed = await bcrypt.hash(password, 10);
            return await AdminAdapter.updateAdmin(adminId, { password: hashed });
        } catch (err) {
            console.error("Error setting password:", err);
            return null;
        }
    },

    async deleteAdmin(adminId) {
        requireAuth();
        return handle(AdminAdapter.deleteAdmin(adminId), "deleting admin");
    },

    async getAllAdmins() {
        requireAuth();
        return handle(AdminAdapter.getAllAdmins(), "getting all admins");
    },

    async getUnverifiedAdmins() {
        requireAuth();
        return handle(AdminAdapter.getUnverifiedAdmins(), "getting unverified admins");
    },

    async getAdminByFirebaseUid(firebaseUid) {
        requireAuth()
        return handle(AdminAdapter.getAdminByFirebaseUid(firebaseUid), "getting admin by Firebase UID");
    }
};

export default AdminService;
