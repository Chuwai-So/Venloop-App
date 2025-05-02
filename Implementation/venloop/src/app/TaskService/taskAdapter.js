import { db } from '../firebase';
import {requireAuth} from "@/app/contexts/authContext/requireAuth";
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
             requireAuth();
             const newRef = push(ref(db, TASK_PATH)); //creates reference to the "teams" node in db
             const taskId = newRef.key; //auto generated id
             const taskURL = `https://venloop-ee862.web.app/tasks/${taskId}`;

             const task = {
                 id: taskId,
                 name: data.name,
                 description: data.description,
                 type: data.type,
                 choices: data.choices || [],
                 answer: data.answer || null,
                 timer: data.timer || null,
                 picture: data.picture || null,

                 features: data.features || {}, // true or false depending they were added to the the task template
                 qrURL: taskURL

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
             requireAuth();
             const snapshot = await get(ref(db, `${TASK_PATH}/${taskId}`));
             if (!snapshot.exists()) return null;
             return snapshot.val();
         } catch (err) {
             console.error("Firebase error in getTask: ", err);
             throw err;
         }
    },

    async deleteTask(taskId) {
         try {
             requireAuth();
             const taskRef = ref(db, `${TASK_PATH}/${taskId}`);
             await remove(taskRef);
         } catch (err) {
             console.error("Firebase error in deleteTask: ", err);
             throw err;
         }
    }
}