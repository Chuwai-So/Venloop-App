'use client';
import { useEffect, useState } from "react";
import TaskService from "@/app/TaskService/taskService";

export default function TaskViewer() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const allTasks = await TaskService.getAllTasks();
            setTasks(allTasks);
        };
        fetchTasks();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Created Tasks</h1>
            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li key={task.id} className="p-4 border rounded shadow">
                            <h2 className="font-semibold">{task.name}</h2>
                            <p><strong>Description:</strong> {task.description || "None"}</p>
                            <p><strong>Features:</strong></p>
                            <ul className="list-disc pl-6 text-sm text-gray-600">
                                {task.features
                                    ? Object.entries(task.features).map(([key, val]) => (
                                        <li key={key}>{key}: {val ? "Enabled" : "Disabled"}</li>
                                    ))
                                    : <li className="italic text-gray-400">No feature data</li>}
                            </ul>

                            <p className="mt-2 text-xs text-gray-500">QR URL: {task.qrURL}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
