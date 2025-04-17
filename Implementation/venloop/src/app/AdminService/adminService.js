import {AdminAdapter} from "@/app/AdminService/adminAdapter";
import crypto from 'crypto';
import bcrypt from 'bcryptjs'

function randomPassword() {
    return crypto.randomBytes(12).toString('base64').slice(0, 12);
}

const AdminService = {

    async createAdmin(data) {
        try {
            return await AdminAdapter.createAdmin(data);
        } catch (err) {
            console.error("Error creating admin: ", err);
            return null;
        }
    },


    async getAdmin(adminId) {
        try {
            return await AdminAdapter.getAdmin(adminId);
        } catch (err) {
            console.error("Error getting admin back: ", err);
            return null;
        }
    },

    async approveAdmin(adminId) {
        try {
            const password = randomPassword();
            const hashed = await bcrypt.hash(password, 10)
            return await AdminAdapter.updateAdmin(adminId, { verified: true, password: hashed});
        } catch (err) {
            console.error("Error approving Admin: ", err);
            return null;
        }
    }
}