'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TaskAdapter } from '@/app/service/TaskService/taskAdapter';
import TaskFeatureDescription from '@/app/components/TaskFeatures/TaskFeatureDescription';
import TaskFeatureTimer from '@/app/components/TaskFeatures/TaskFeatureTimer';
import TaskFeaturePicture from '@/app/components/TaskFeatures/TaskFeaturePicture';
import TaskFeatureInput from '@/app/components/TaskFeatures/TaskFeatureInput';
import TaskFeatureChoiceEditor from '@/app/components/TaskFeatures/TaskFeatureChoiceEditor';
import NavBar from '@/app/components/NavBars/NavBar';
import ProtectedRoute from "@/app/ProtectedRoute";

export default function EditTaskPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [task, setTask] = useState(null);
    const [featuresDraft, setFeaturesDraft] = useState({});
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        const fetchTask = async () => {
            if (!id) return;
            const fetched = await TaskAdapter.getTask(id);
            if (fetched) {
                setTask(fetched);
                setFeaturesDraft(fetched.features || {});
                setEditedData({
                    description: fetched.description || '',
                    timer: fetched.timer || '30',
                    choice: fetched.choices || [],
                    answer: fetched.answer || '',
                });
            }
        };
        fetchTask();
    }, [id]);

    const toggleFeature = (featureKey, enabled) => {
        setFeaturesDraft(prev => ({ ...prev, [featureKey]: enabled }));
    };

    const handleDataChange = (key, value, extra = null) => {
        setEditedData(prev => ({
            ...prev,
            [key]: value,
            ...(extra !== null && { answer: extra })
        }));
    };

    const confirmChanges = async () => {
        try {
            await TaskAdapter.updateTask(id, {
                features: featuresDraft,
                description: editedData.description,
                timer: editedData.timer,
                choices: editedData.choice,
                answer: editedData.answer,
            });
            alert("Changes saved!");
        } catch (error) {
            console.error("Error saving changes:", error);
            alert("Failed to save changes.");
        }
    };

    if (!id) return <div className="p-8">No task ID provided.</div>;
    if (!task) return <div className="p-8">Loading task...</div>;

    const { name, picture, score = 0 } = task;
    const features = featuresDraft;

    return (
        <ProtectedRoute>
            <div className="font-sans bg-[#F9FAFB] min-h-screen">
                <NavBar backTo="/admin-landing" />
                <div className="flex flex-col md:flex-row-reverse">
                    {/* Phone Preview */}
                    <div className="w-full md:w-1/2 p-4 bg-white md:bg-[#3CA9E2] flex justify-center items-center">
                        <div className="relative w-[360px] h-[640px] bg-gray-50 rounded-[40px] shadow border border-white p-4 pr-1 overflow-y-auto text-black">
                            <div className="relative">
                                <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-10 shadow-inner"></div>
                                <div className="absolute top-[53px] right-3 text-sm font-bold bg-white px-2 py-1 rounded shadow z-20">
                                    Score: {score}
                                </div>
                            </div>

                            <div className="pt-[60px] space-y-3">
                                <p className="text-lg font-semibold mb-2 mt-4 text-center">
                                    Task: {name || 'Task Name'}
                                </p>

                                {features.description && (
                                    <div className="bg-white border rounded p-2 shadow text-sm text-center">
                                        <p>{editedData.description}</p>
                                    </div>
                                )}

                                {(features.timer || features.choice) && (
                                    <div className="flex space-x-2 w-full">
                                        {features.timer && (
                                            <div className="w-1/2 bg-white border rounded p-2 shadow flex justify-center items-center min-h-[120px]">
                                                <p>{editedData.timer}s</p>
                                            </div>
                                        )}
                                        {features.choice && (
                                            <div className="w-1/2 bg-white border rounded p-2 shadow text-sm overflow-y-auto max-h-[140px]">
                                                {editedData.choice.map((c, i) => (
                                                    <div key={i} className="mb-1">
                                                        {c} {c === editedData.answer && <span className="text-green-600 font-bold">✔</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {features.picture && (
                                    <div className="bg-white border rounded p-2 shadow">
                                        <TaskFeaturePicture file={picture} readOnly />
                                    </div>
                                )}

                                {features.input && (
                                    <div className="bg-white border rounded p-2 shadow">
                                        <p className="text-center">{editedData.answer}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Config Panel */}
                    <div className="w-full md:w-1/2 bg-[#E3F4FC] p-6 border-t md:border-t-0 md:border-r text-black shadow-inner">
                        <h2 className="text-xl font-bold mb-4 text-[#1F2A60]">Edit Task: {name}</h2>

                        {Object.entries(task.features || {}).map(([key]) => (
                            <div key={key} className="mb-5">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="capitalize text-[#1F2A60]">{key}</span>
                                    <button
                                        className={`px-3 py-1 rounded transition-colors ${
                                            featuresDraft[key] ? "bg-red-400" : "bg-[#3CA9E2]"
                                        } text-white`}
                                        onClick={() => toggleFeature(key, !featuresDraft[key])}
                                    >
                                        {featuresDraft[key] ? "Remove" : "Add"}
                                    </button>
                                </div>

                                {featuresDraft[key] && (
                                    <div className="bg-white p-2 rounded shadow text-black">
                                        {key === "description" && (
                                            <TaskFeatureDescription
                                                value={editedData.description}
                                                onChange={(val) => handleDataChange("description", val)}
                                            />
                                        )}
                                        {key === "timer" && (
                                            <TaskFeatureTimer
                                                value={editedData.timer}
                                                onChange={(val) => handleDataChange("timer", val)}
                                            />
                                        )}
                                        {key === "choice" && (
                                            <TaskFeatureChoiceEditor
                                                value={editedData.choice}
                                                correctAnswer={editedData.answer}
                                                onChange={(choices, correct) =>
                                                    handleDataChange("choice", choices, correct)
                                                }
                                            />
                                        )}
                                        {key === "input" && (
                                            <TaskFeatureInput
                                                value={editedData.answer}
                                                onChange={(val) => handleDataChange("answer", val)}
                                            />
                                        )}
                                        {key === "picture" && (
                                            <p className="text-sm italic text-gray-500">Picture cannot be changed.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={confirmChanges}
                            className="mt-6 bg-[#D86F27] text-white p-2 w-full rounded hover:scale-105 transition-transform"
                        >
                            Confirm Changes
                        </button>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
