'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TaskAdapter } from '@/app/service/TaskService/taskAdapter';
import NavBar from '@/app/components/NavBars/NavBar';
import ProtectedRoute from '@/app/ProtectedRoute';
import TaskBar from "@/app/components/ContentBars/TaskBar";

function AdminTaskListContent() {
    const [tasks, setTasks] = useState([]);
    const [expanded, setExpanded] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const snapshot = await TaskAdapter.getAllTasks();
                const data = Object.values(snapshot || {});
                setTasks(data);
            } catch (err) {
                console.error("Failed to fetch tasks:", err);
            }
        };
        fetchTasks();
    }, []);

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleDelete = async (taskId) => {
        if (confirm("Are you sure you want to delete this task?")) {
            await TaskAdapter.deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-black">
            <NavBar backTo="/admin-landing"/>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-[#1F2A60] mb-6 text-center">All Tasks</h1>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <TaskBar
                            key={task.id}
                            task={task}
                            isExpanded={expanded[task.id]}
                            onToggle={() => toggleExpand(task.id)}
                            onDelete={handleDelete}
                            router={router}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function AdminTaskList() {
    return (
        <ProtectedRoute>
            <AdminTaskListContent/>
        </ProtectedRoute>
    );
}
