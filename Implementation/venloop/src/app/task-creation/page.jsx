"use client";

import { useState } from "react";
import TaskFeatureDescription from "@/app/components/TaskFeatureDescription";
import TaskFeatureTimer from "@/app/components/TaskFeatureTimer";
import TaskFeaturePicture from "@/app/components/TaskFeaturePicture";
import TaskFeatureInput from "@/app/components/TaskFeatureInput";
import TaskFeatureChoiceEditor from "@/app/components/TaskFeatureChoiceEditor";
import TaskService from "@/app/service/TaskService/taskService";
import QRCodeComponent from "@/app/components/QRCode";
import NavBar from "@/app/components/NavBars/NavBar";
import ProtectedRoute from "@/app/ProtectedRoute";

export default function TaskCreation() {
    const [features, setFeatures] = useState({
        description: false,
        timer: false,
        picture: false,
        input: false,
        choice: false,
    });

    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        timer: "30",
        picture: null,
        input: "",
        choice: [],
        score: 0,
    });

    const [isTemplate, setIsTemplate] = useState(false);
    const [qrUrl, setQrUrl] = useState(null);

    const handleToggleFeature = (feat) => {
        setFeatures((prev) => ({ ...prev, [feat]: !prev[feat] }));
        if (features[feat]) {
            setTaskData((prev) => ({
                ...prev,
                [feat]: feat === "picture" ? null : feat === "choice" ? [] : "",
            }));
        }
    };

    const handleDataChange = (field, value) => {
        setTaskData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmitTask = async () => {
        let type = "text";
        if (features.choice) type = "choice";
        else if (features.picture && !features.input) type = "image";

        const taskPayload = {
            name: taskData.name,
            description: features.description ? taskData.description : null,
            picture: features.picture ? taskData.picture : null,
            timer: features.timer ? taskData.timer : null,
            choices: features.choice ? taskData.choice : [],
            answer: features.choice ? taskData.answer : (features.input ? taskData.input : null),
            type,
            features: { ...features },
            isTemplate,
        };


        try {
            const taskId = await TaskService.createTask(taskPayload);
            const qrLink = `https://venloop-ee862.web.app/task-submission/view?id=${taskId}`;
            setQrUrl(qrLink);
            alert("Task created successfully!");
        } catch (err) {
            console.error("Failed to create task:", err);
            alert("Failed to create task.");
        }
    };

    return (
        <ProtectedRoute>
            <div className="font-sans bg-[#F9FAFB] min-h-screen text-black">
                <NavBar backTo="/admin-landing" />

                <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 p-4 bg-white md:bg-[#3CA9E2] flex justify-center items-start md:items-center">
                        <div className="relative w-[360px] h-[640px] bg-gray-50 rounded-[40px] shadow border border-white p-4 pr-1 overflow-y-auto text-black">
                            <div className="relative">
                                <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-10 shadow-inner"></div>
                                <div className="absolute top-[53px] right-3 text-sm font-bold bg-white px-2 py-1 rounded shadow z-20 text-black">
                                    Score: {taskData.score || 0}
                                </div>
                            </div>

                            <div className="pt-[60px] space-y-3">
                                <p className="text-lg font-semibold mb-2 mt-4 text-center text-black">
                                    Task: {taskData.name || "Task Name"}
                                </p>

                                {features.description && (
                                    <div className="bg-white border rounded p-2 shadow text-sm text-center text-black">
                                        <TaskFeatureDescription
                                            value={taskData.description}
                                            onChange={(val) => handleDataChange("description", val)}
                                        />
                                    </div>
                                )}

                                {(features.timer || features.choice) && (
                                    <div className="flex space-x-2 w-full">
                                        {features.timer && (
                                            <div className="w-1/2 bg-white border rounded p-2 shadow flex justify-center items-center min-h-[120px] text-black">
                                                <TaskFeatureTimer
                                                    value={taskData.timer}
                                                    onChange={(val) => handleDataChange("timer", val)}
                                                />
                                            </div>
                                        )}
                                        {features.choice && (
                                            <div className="w-1/2 bg-white border rounded p-2 shadow flex items-center min-h-[120px] text-black">
                                                <TaskFeatureChoiceEditor
                                                    value={taskData.choice}
                                                    correctAnswer={taskData.answer}
                                                    onChange={(choices, correct) => {
                                                        handleDataChange("choice", choices);
                                                        handleDataChange("answer", correct);
                                                    }}
                                                />

                                            </div>
                                        )}
                                    </div>
                                )}

                                {features.picture && (
                                    <div className="bg-white border rounded p-2 shadow w-full text-black">
                                        <TaskFeaturePicture
                                            file={taskData.picture}
                                            onChange={(file) => handleDataChange("picture", file)}
                                        />
                                    </div>
                                )}

                                {features.input && (
                                    <div className="bg-white border rounded p-2 shadow w-full text-black">
                                        <TaskFeatureInput
                                            value={taskData.input}
                                            onChange={(val) => handleDataChange("input", val)}
                                        />
                                    </div>
                                )}

                                <div className="mt-4 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isTemplate"
                                        checked={isTemplate}
                                        onChange={() => setIsTemplate(prev => !prev)}
                                    />
                                    <label htmlFor="isTemplate" className="text-sm text-black">
                                        Save as Task Template
                                    </label>
                                </div>

                                <button
                                    onClick={handleSubmitTask}
                                    className="mt-6 bg-[#D86F27] text-white p-2 w-full rounded hover:scale-105 transition-transform"
                                >
                                    Submit Task
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 bg-blue-50 p-6 border-t md:border-t-0 md:border-l text-black">
                        <h2 className="text-xl font-bold mb-4 text-[#1F2A60]">Configure Features</h2>

                        {["description", "timer", "choice", "picture", "input"].map((feat) => (
                            <div key={feat} className="flex justify-between mb-3 items-center">
                                <span className="capitalize text-[#1F2A60]">{feat}</span>
                                <button
                                    className={`px-3 py-1 rounded transition-colors ${
                                        features[feat] ? "bg-red-400" : "bg-[#3CA9E2]"
                                    } text-white`}
                                    onClick={() => handleToggleFeature(feat)}
                                >
                                    {features[feat] ? "Remove" : "Add"}
                                </button>
                            </div>
                        ))}

                        <input
                            type="text"
                            placeholder="Task Name"
                            value={taskData.name}
                            onChange={(e) => handleDataChange("name", e.target.value)}
                            className="mt-6 p-2 border w-full rounded text-black bg-white"
                        />
                    </div>
                </div>

                {qrUrl && (
                    <div className="mt-6 flex flex-col items-center text-black">
                        <QRCodeComponent value={qrUrl} size={180} label="Scan to open task" />
                        <button
                            onClick={() => setQrUrl(null)}
                            className="mt-2 text-sm text-blue-500 hover:underline"
                        >
                            Hide QR Code
                        </button>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
