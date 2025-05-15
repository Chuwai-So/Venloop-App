import { TaskAdapter } from "./taskAdapter";
import { requireAuth } from "@/app/contexts/authContext/requireAuth";

async function handle(promise, context) {
    try {
        return await promise;
    } catch (err) {
        console.error(`Error ${context}:`, err);
        return null;
    }
}

const TaskService = {
    async createTask(data) {
        return handle(TaskAdapter.createTask(data), "creating task");
    },

    async getTask(taskId) {
        return handle(TaskAdapter.getTask(taskId), "fetching task");
    },

    async getTaskQR(taskId) {
        return handle(
            (async () => {
                const task = await TaskAdapter.getTask(taskId);
                return task?.qrURL || null;
            })(),
            "getting task QR"
        );
    },

    async deleteTask(taskId) {
        requireAuth();
        return handle(TaskAdapter.deleteTask(taskId), "deleting task");
    },

    async getAllTasks() {
        return handle(TaskAdapter.getAllTasks(), "fetching all tasks");
    }
};

export default TaskService;
