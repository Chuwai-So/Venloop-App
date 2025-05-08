'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TaskAdapter } from '@/app/TaskService/taskAdapter';
import QRCodeComponent from '@/app/Component/QRCode';
import { ChevronDown, ChevronUp } from 'lucide-react';
import NavBar from '@/app/Component/NavBars/NavBar';
import ProtectedRoute from '@/app/ProtectedRoute';

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
        <div className="min-h-screen bg-[#F9FAFB]">
            <NavBar backTo="/admin-landing" />

            <div className="max-w-3xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-[#1F2A60] mb-6 text-center">All Tasks</h1>

                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold break-words w-2/3">{task.name}</h2>
                                <button onClick={() => toggleExpand(task.id)}>
                                    {expanded[task.id] ? <ChevronUp /> : <ChevronDown />}
                                </button>
                            </div>

                            {expanded[task.id] && (
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-center">
                                        <QRCodeComponent value={`https://venloop-ee862.web.app/teamleader-task-submition/view?id=${task.id}`} size={120} />
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
                                        <button
                                            className="bg-[#D86F27] text-white px-4 py-2 rounded hover:scale-105 transition-transform"
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-[#3CA9E2] text-white px-4 py-2 rounded hover:scale-105 transition-transform"
                                            onClick={() => router.push(`/admin-edit-task-template/view?id=${task.id}`)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function AdminTaskList() {
    return (
        <ProtectedRoute>
            <AdminTaskListContent />
        </ProtectedRoute>
    );
}
