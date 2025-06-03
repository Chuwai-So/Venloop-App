import { db } from '../../firebase';
import qrUrls from "@/app/util/qrUrls";
import {
    ref,
    push,
    set,
    get,
    update,
    remove
} from 'firebase/database';

const TASK_PATH = 'tasks';

export const TaskAdapter = {
    async createTask(data) {
        const newRef = push(ref(db, TASK_PATH));
        const taskId = newRef.key;
        const taskURL = qrUrls.taskDetail(taskId);

        const task = {
            id: taskId,
            name: data.name,
            description: data.description,
            type: data.type,
            choices: data.choices || [],
            answer: data.answer || null,
            timer: data.timer || null,
            picture: data.picture || null,
            features: data.features || {},
            qrURL: taskURL,
            isTemplate: data.isTemplate || false
        };

        await set(newRef, task);
        return taskId;
    },

    async getTask(taskId) {
        const snapshot = await get(ref(db, `${TASK_PATH}/${taskId}`));
        return snapshot.exists() ? snapshot.val() : null;
    },

    async getAllTasks() {
        const snapshot = await get(ref(db, TASK_PATH));
        return snapshot.exists() ? snapshot.val() : null;
    },

    async updateTask(taskId, data) {
        await update(ref(db, `${TASK_PATH}/${taskId}`), data);
    },

    async deleteTask(taskId) {
        await remove(ref(db, `${TASK_PATH}/${taskId}`));
    }
};
