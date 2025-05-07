'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TaskAdapter } from '@/app/TaskService/taskAdapter';
import TaskFeatureDescription from '@/app/Component/TaskFeatureDescription';
import TaskFeatureTimer from '@/app/Component/TaskFeatureTimer';
import TaskFeaturePicture from '@/app/Component/TaskFeaturePicture';
import TaskFeatureInput from '@/app/Component/TaskFeatureInput';
import TaskFeatureChoice from '@/app/Component/TaskFeatureChoice';
import NavBar from '@/app/Component/NavBars/NavBar';

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
                });
            }
        };
        fetchTask();
    }, [id]);

    const toggleFeature = (featureKey, enabled) => {
        setFeaturesDraft(prev => ({ ...prev, [featureKey]: enabled }));
    };

    const handleDataChange = (key, value) => {
        setEditedData(prev => ({ ...prev, [key]: value }));
    };

    const confirmChanges = async () => {
        await TaskAdapter.updateTask(id, {
            features: featuresDraft,
            description: editedData.description,
            timer: editedData.timer
        });
        alert("Changes saved!");
    };

    if (!id) return <div className="p-8">No task ID provided.</div>;
    if (!task) return <div className="p-8">Loading task...</div>;

    const { name, picture, answer, choices, score = 0 } = task;
    const features = featuresDraft;

    return (
        <div className="font-sans md:bg-[#3CA9E2] min-h-screen">
            <NavBar backTo="/admin-landing" />
            <div className="flex flex-col items-center py-6 px-4">
                <h2 className="text-xl font-bold mb-4 text-[#1F2A60]">Editing: {name}</h2>
                <div className="relative w-[360px] h-[640px] bg-gray-50 rounded-[40px] shadow-[0_4px_30px_rgba(255,255,255,0.4)] border border-white p-4 pr-1 overflow-y-auto">
                    <div className="relative">
                        <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-10 shadow-inner"></div>
                        <div className="absolute top-[53px] right-3 text-sm font-bold bg-white px-2 py-1 rounded shadow z-20">
                            Score: {score}
                        </div>
                    </div>
                    <div className="pt-[60px] px-4 space-y-3 flex flex-col">
                        <p className="text-lg font-semibold mb-2 mt-4 text-center">
                            Task: {name || 'Task Name'}
                        </p>

                        {features.description && (
                            <div className="relative">
                                <button
                                    onClick={() => toggleFeature('description', false)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs z-30 shadow"
                                >✕</button>
                                <div className="bg-white border rounded p-2 shadow text-sm text-center">
                                    <TaskFeatureDescription
                                        value={editedData.description}
                                        onChange={(val) => handleDataChange('description', val)}
                                    />
                                </div>
                            </div>
                        )}

                        {(features.timer || features.choice) && (
                            <div className="flex space-x-2 w-full">
                                {features.timer && (
                                    <div className="relative w-1/2">
                                        <button
                                            onClick={() => toggleFeature('timer', false)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs z-30 shadow"
                                        >✕</button>
                                        <div className="bg-white border rounded p-2 shadow flex justify-center items-center min-h-[120px]">
                                            <TaskFeatureTimer
                                                value={editedData.timer}
                                                onChange={(val) => handleDataChange('timer', val)}
                                            />
                                        </div>
                                    </div>
                                )}
                                {features.choice && (
                                    <div className="relative w-full">
                                        <button
                                            onClick={() => toggleFeature('choice', false)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs z-30 shadow"
                                        >✕</button>
                                        <div className="bg-white border rounded p-2 shadow max-h-[160px] overflow-y-auto">
                                            <TaskFeatureChoice value={choices} readOnly />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {features.picture && (
                            <div className="relative">
                                <button
                                    onClick={() => toggleFeature('picture', false)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs z-30 shadow"
                                >✕</button>
                                <div className="bg-white border rounded p-2 shadow w-full">
                                    <TaskFeaturePicture file={picture} readOnly />
                                </div>
                            </div>
                        )}

                        {features.input && (
                            <div className="relative">
                                <button
                                    onClick={() => toggleFeature('input', false)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs z-30 shadow"
                                >✕</button>
                                <div className="bg-white border rounded p-2 shadow w-full">
                                    <TaskFeatureInput value={answer} readOnly />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={confirmChanges}
                            className="mt-6 bg-[#D86F27] text-white p-2 w-full rounded hover:scale-105 transition-transform"
                        >
                            Confirm Changes
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-[360px] mt-6">
                    <h3 className="text-md font-semibold text-[#1F2A60] mb-2">Add Feature Blocks</h3>
                    {Object.entries(task.features || {}).map(([key]) =>
                        !features[key] ? (
                            <button
                                key={key}
                                onClick={() => toggleFeature(key, true)}
                                className="bg-[#1F2A60] text-white px-3 py-1 rounded w-full mb-2 shadow hover:scale-105 transition-transform"
                            >
                                + Add {key.charAt(0).toUpperCase() + key.slice(1)}
                            </button>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
}
