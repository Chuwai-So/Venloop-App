import {TaskAdapter} from "./taskAdapter";
import {requireAuth} from "@/app/contexts/authContext/requireAuth";

 const TaskService = {

     async createTask(data) {
         try {
             //requireAuth();
             return await TaskAdapter.createTask(data);
         } catch (err) {
             console.error("Error creating task: ", err);
             return null;
         }
     },

     async getTask(taskId) {
         try {
            // requireAuth();
             return await TaskAdapter.getTask(taskId);
         } catch (err) {
             console.error("Error getting task object back: ", err);
             return null;
         }
     },

     async getTaskQR(taskId) {
         try {
           //  requireAuth();
             const task = await TaskAdapter.getTask(taskId);
             return task?.qrURL || null;
         } catch (err) {
             console.error("Error getting task QR Code: ", err);
             return null;
         }
     },

     async deleteTask(taskId) {
         try {
             requireAuth();
             return TaskAdapter.deleteTask(taskId);
         } catch (err) {
             console.error("Error deleting task: ", err);
             return null;
         }
     },

     async getAllTasks() {
         try {
             return await TaskAdapter.getAllTasks();
         } catch (err) {
             console.error("Error getting all tasks");
             return null;
         }
     }

 }

 export default TaskService;