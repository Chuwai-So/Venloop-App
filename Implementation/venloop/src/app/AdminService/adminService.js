import {AdminAdapter} from "./adminAdapter";
import crypto from 'crypto';
import { promisify } from 'util'
import {requireAuth} from "@/app/contexts/authContext/requireAuth";

const scrypt = promisify(crypto.scrypt);
const SALT = crypto.randomBytes(16).toString('hex');


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
            const key = await scrypt(password, SALT, 64);
            const hashed = `${SALT}:${key.toString('hex')}`;
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