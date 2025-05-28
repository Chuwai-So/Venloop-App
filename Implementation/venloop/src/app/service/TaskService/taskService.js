import { TaskAdapter } from "./taskAdapter";
import { requireAuth } from "@/app/contexts/authContext/requireAuth";
import { handle } from "@/app/service/serviceHandler";

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
    },

    async deleteAllTasks() {
        requireAuth();
        const tasks = await TaskAdapter.getAllTasks();
        if (!tasks || typeof tasks !== 'object') return false;

        const deletions = await Promise.all(
            Object.keys(tasks).map((taskId) =>
                TaskAdapter.deleteTask(taskId)
            )
        );
        return deletions.every(() => true);
    }
};

export default TaskService;
