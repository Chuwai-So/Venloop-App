import { readFile } from 'fs/promises';
import { File } from 'buffer';
import { fileURLToPath } from 'node:url';         // ✅ Import from 'node:url'
import { dirname, resolve } from 'node:path';     // ✅ node:path is preferred
import { describe, it, expect } from 'vitest';
import TeamService from '@/app/TeamService/teamService';

// Get __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('approvePictureTaskDemo with real image', () => {
    it('should upload and store base64 of image', async () => {
        const teamId = '-OP4yImpm78haTDmZOjF';
        const taskId = 'real-image-task';

        const file = new Blob(['test content'], { type: 'image/jpeg' });

        // Override fileToBase64 for this test
        TeamService.fileToBase64 = async () => 'data:image/jpeg;base64,dGVzdCBjb250ZW50';


        const result = await TeamService.approvePictureTaskDemo(teamId, taskId, file);
        expect(result).toBe(true);
    });
});