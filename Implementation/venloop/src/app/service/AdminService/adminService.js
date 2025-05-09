import {AdminAdapter} from "./adminAdapter";
import bcrypt from 'bcryptjs'
import {requireAuth} from "@/app/contexts/authContext/requireAuth";



const AdminService = {


    async createAdmin(data) {
        try {
            return await AdminAdapter.createAdmin(data);
        } catch (err) {
            console.error("Error creating task-list: ", err);
            throw err;
        }
    },


    async getAdmin(adminId) {
        try {
            requireAuth()
            return await AdminAdapter.getAdmin(adminId);
        } catch (err) {
            console.error("Error getting task-list back: ", err);
            return null;
        }
    },

    async approveAdmin(adminId) {
        try {
            requireAuth()
            return await AdminAdapter.updateAdmin(adminId, { verified: true});
        } catch (err) {
            console.error("Error approving Admin: ", err);
            return null;
        }
    },

    async setPassword(adminId, password) {
        try {
            requireAuth()
            const saltRounds = 10;
            const hashed = await bcrypt.hash(password, saltRounds);
            return await AdminAdapter.updateAdmin(adminId, {password: hashed});
        } catch (err) {
            console.error("Error setting Password")
            return null;
        }
    },

    async deleteAdmin(adminId) {
        try {
            requireAuth()
            return await AdminAdapter.deleteAdmin(adminId);
        } catch (err) {
            console.error("Error deleting Admin")
            return null;
        }
    },

    async getAllAdmins() {
        try {
            requireAuth();
            return await AdminAdapter.getAllAdmins();
        } catch (err) {
            console.error("Error getting all admins:", err);
            return [];
        }
    },

    async getUnverifiedAdmins() {
        try {
            requireAuth();
            return await AdminAdapter.getUnverifiedAdmins();
        } catch (err) {
            console.error("Error getting unverified admins:", err);
            return [];
        }
    },

    async getAdminByFirebaseUid(firebaseUid){
        try {
            return await AdminAdapter.getAdminByFirebaseUid(firebaseUid);
        } catch (err) {
            console.error("Error getting adminByFirebaseUid:", err);
            return [];
        }
    }

}

export default AdminService;