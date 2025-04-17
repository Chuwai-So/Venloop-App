import {TaskAdapter} from "./taskAdapter";

 const TaskService = {

     async createTask(data) {
         try {
             return await TaskAdapter.createTask(data);
         } catch (err) {
             console.error("Error creating task: ", err);
             return null;
         }
     },

     async getTask(taskId) {
         try {
             return await TaskAdapter.getTask(taskId);
         } catch (err) {
             console.error("Error getting task object back: ", err);
             return null;
         }
     },

     async getTaskQR(taskId) {
         try {
             const task = await TaskAdapter.getTask(taskId);
             return task?.qrURL || null;
         } catch (err) {
             console.error("Error getting task QR Code: ", err);
             return null;
         }
     },

     async deleteTask(taskId) {
         try {
             return TaskAdapter.deleteTask(taskId);
         } catch (err) {
             console.error("Error deleting task: ", err);
             return null;
         }
     }

 }

 export default TaskService;