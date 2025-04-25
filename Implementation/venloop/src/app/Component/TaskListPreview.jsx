'use client';
import { useEffect, useState } from "react";
import { ref, get } from 'firebase/database';
import { db } from "../firebase";
import {QRCodeSVG} from "qrcode.react";

export default function TaskListPreview() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const snapshot = await get(ref(db, 'tasks'));
            const data = snapshot.exists() ? snapshot.val() : {};
            const taskList = Object.entries(data).map(([id, task]) => ({ id, ...task }));
            setTasks(taskList);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="mt-8 p-4 border rounded bg-white shadow w-full max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🗂 All Created Tasks</h3>
                <button
                    onClick={fetchTasks}
                    className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Refresh
                </button>
            </div>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : tasks.length === 0 ? (
                <p className="text-gray-500">No tasks found.</p>
            ) : (
                <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {tasks.map((task) => (
                        <li key={task.id} className="p-3 border rounded shadow-sm bg-gray-50">
                            <p className="font-semibold text-lg">🧩 {task.name || "Untitled Task"}</p>
                            <p className="text-sm text-gray-600">Type: {task.type}</p>

                            {/* Description */}
                            {task.features?.description && task.description && (
                                <p className="text-sm mt-2 text-gray-700">
                                    📄 <strong>Description:</strong> {task.description}
                                </p>
                            )}

                            {/* Timer */}
                            {task.features?.timer && task.timer && (
                                <p className="text-sm mt-1 text-purple-700">
                                    ⏱️ <strong>Timer:</strong> {task.timer} seconds
                                </p>
                            )}

                            {/* Picture */}
                            {task.features?.picture && task.picture && (
                                <div className="mt-2 text-sm text-blue-700">
                                    🖼️ <strong>Picture:</strong> Uploaded
                                    {typeof task.picture === 'string' && task.picture.startsWith("data:image") && (
                                        <img src={task.picture} alt="Task Visual" className="mt-2 rounded max-w-full" />
                                    )}
                                </div>
                            )}

                            {/* Choices */}
                            {task.features?.choice && task.choices?.length > 0 && (
                                <div className="text-sm mt-2">
                                    <p><strong>Options:</strong></p>
                                    <ul className="list-disc ml-5">
                                        {task.choices.map((opt, idx) => (
                                            <li key={idx}>{opt}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {task.features && (
                                <div className="mt-3 text-xs text-gray-600">
                                    <p className="font-semibold mb-1">Enabled Features:</p>
                                    <ul className="list-disc ml-5">
                                        {Object.entries(task.features).map(([key, value]) => (
                                            <li key={key}>
                                                {key}: <span className={value ? "text-green-600" : "text-red-500"}>{value ? "true" : "false"}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {/* Task QR Code Preview */}
                            {task.qrURL && (
                                <div className="mt-3 flex flex-col items-center space-y-2">
                                    <QRCodeSVG value={task.qrURL} size={128} />
                                    <a
                                        href={task.qrURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 underline break-all"
                                    >
                                        {task.qrURL}
                                    </a>
                                </div>
                            )}

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
