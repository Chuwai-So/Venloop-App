import {AdminAdapter} from "./adminAdapter";
import crypto from 'crypto';
import bcrypt from 'bcryptjs'
import {requireAuth} from "@/app/contexts/authContext/requireAuth";

const AdminService = {


    async createAdmin(data) {
        try {
            requireAuth()
            return await AdminAdapter.createAdmin(data);
        } catch (err) {
            console.error("Error creating admin: ", err);
            return null;
        }
    },


    async getAdmin(adminId) {
        try {
            requireAuth()
            return await AdminAdapter.getAdmin(adminId);
        } catch (err) {
            console.error("Error getting admin back: ", err);
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
            const hashed = await bcrypt.hash(password, 10);
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
            console.error("Error deleteing Admin")
            return null;
        }
    }
}

export default AdminService;