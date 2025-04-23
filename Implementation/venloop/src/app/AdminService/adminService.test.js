import { describe, it, expect, afterAll } from 'vitest';
import AdminService from './adminService';
import { AdminAdapter } from './adminAdapter'; // For deletion

describe('AdminService', () => {
    let testAdminId = null;

    it('Should create a new admin and return an ID', async () => {
        const data = {
            name: 'Test Admin',
            email: 'testadmin@venloop.com'
        };

        testAdminId = await AdminService.createAdmin(data);
        expect(testAdminId).toBeDefined();

        const created = await AdminService.getAdmin(testAdminId);
        expect(created).toBeDefined();
        expect(created.name).toBe('Test Admin');
        expect(created.verified).toBe(false);
    });

    it('Should approve the admin by setting verified to true', async () => {
        await AdminService.approveAdmin(testAdminId);

        const updated = await AdminService.getAdmin(testAdminId);
        expect(updated.verified).toBe(true);
    });

    it('Should set and store a hashed password', async () => {
        const password = 'SuperSecret123';
        await AdminService.setPassword(testAdminId, password);

        const admin = await AdminService.getAdmin(testAdminId);
        expect(admin.password).toBeDefined();
        expect(admin.password).not.toBe(password); // hashed check
    });

    afterAll(async () => {
        if (testAdminId) {
            await AdminService.deleteAdmin(testAdminId);
        }
    });
});