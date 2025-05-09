// File: app/TaskService/taskAdapter.js
import { db } from '../../firebase';
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
        try {

            const newRef = push(ref(db, TASK_PATH));
            const taskId = newRef.key;
            const taskURL = `https://venloop-ee862.web.app/teamleader-task-submition/view${taskId}`;


            const task = {
                id: taskId,
                name: data.name,
                description: data.description,
                type: data.type,
                choices: data.choices || [],
                answer: data.answer || null, // ← will now be a string from either input or selected choice
                timer: data.timer || null,
                picture: data.picture || null,
                features: data.features || {},
                qrURL: taskURL,
                isTemplate: data.isTemplate || false
            };

            await set(newRef, task);
            return taskId;
        } catch (err) {
            console.error("Firebase error in createTask: ", err);
            throw err;
        }
    },

    async getTask(taskId) {
        try {
            const snapshot = await get(ref(db, `${TASK_PATH}/${taskId}`));
            if (!snapshot.exists()) return null;
            return snapshot.val();
        } catch (err) {
            console.error("Firebase error in getTask: ", err);
            throw err;
        }
    },

    async getAllTasks() {
        try {
            const snapshot = await get(ref(db, TASK_PATH));
            if (!snapshot.exists()) return null;
            return snapshot.val();
        } catch (err) {
            console.error("Firebase error in getAllTasks: ", err);
            throw err;
        }
    },

    async updateTask(taskId, data) {
        try {
            const taskRef = ref(db, `${TASK_PATH}/${taskId}`);
            await update(taskRef, data);
        } catch (err) {
            console.error("Firebase error in updateTask: ", err);
            throw err;
        }
    },

    async deleteTask(taskId) {
        try {
            const taskRef = ref(db, `${TASK_PATH}/${taskId}`);
            await remove(taskRef);
        } catch (err) {
            console.error("Firebase error in deleteTask: ", err);
            throw err;
        }
    }
};
