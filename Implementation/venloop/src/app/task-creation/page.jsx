'use client';
import {useState} from "react";
import TaskFeatureDescription from "../Component/TaskFeatureDescription";
import TaskFeatureTimer from "../Component/TaskFeatureTimer";
import TaskFeaturePicture from "../Component/TaskFeaturePicture";
import TaskFeatureInput from "../Component/TaskFeatureInput";
import TaskFeatureChoice from "../Component/TaskFeatureChoice";
import TaskService from "@/app/TaskService/taskService";
import QRCodeComponent from "@/app/Component/QRCode";
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

    //qr constant
    const [qrUrl, setQrUrl] = useState(null);

    const handleToggleFeature = (feat) => {
        setFeatures((prev) => ({...prev, [feat]: !prev[feat]}));
        if (features[feat]) {
            setTaskData((prev) => ({
                ...prev,
                [feat]: feat === "picture" ? null : feat === "choice" ? [] : "",
            }));
        }
    };

    const handleDataChange = (field, value) => {
        setTaskData((prev) => ({...prev, [field]: value}));
    };

    const handleSubmitTask = async () => {
        let type = "text";
        if (features.choice) {
            type = "choice";
        } else if (features.picture && !features.input) {
            type = "image";
        }

        const taskPayload = {
            name: taskData.name,
            description: features.description ? taskData.description : null,
            picture: features.picture ? taskData.picture : null,
            timer: features.timer ? taskData.timer : null,
            choices: features.choice ? taskData.choice : [],
            answer: taskData.input || null,
            type,
            features: {...features}
        };


        try {
            const taskId = await TaskService.createTask(taskPayload);
            const createdTask = await TaskService.getTask(taskId);
            console.log("🚀 Created task:", createdTask);

            if (createdTask?.qrURL) {
                setQrUrl(createdTask.qrURL); // show it after submit
                alert("Task created successfully!");
            } else {
                alert("Task created, but no QR code was generated.");
            }
        } catch (err) {
            console.error("Failed to create task:", err);
            alert("Failed to create task.");
        }
    };


    return (
        <ProtectedRoute>
            <div className="flex h-screen font-sans">
                {/* Left Panel */}
                <div className="w-1/2 bg-blue-50 p-6 border-r">
                    <h2 className="text-xl font-bold mb-4">Task Creation</h2>

                    {["description", "timer", "input", "picture", "choice"].map((feat) => (
                        <div key={feat} className="flex justify-between mb-3 items-center">
                            <span className="capitalize">{feat}</span>
                            <button
                                className={`px-3 py-1 rounded transition-colors ${
                                    features[feat] ? "bg-red-400 text-white" : "bg-green-400 text-white"
                                }`}
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
                        className="mt-6 p-2 border w-full"
                    />
                </div>

                {/* Right Panel - Mobile Preview */}
                <div className="w-1/2 p-6 bg-white flex justify-center items-center">
                    <div
                        className="relative w-[360px] h-[640px] bg-gray-50 rounded-[40px] shadow-lg border-[6px] border-black p-4 pr-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">

                        {/* Notch */}
                        <div
                            className="absolute top-4 left-1/2 -translate-x-1/2 w-25 h-7 bg-black rounded-full z-10 shadow-inner"></div>

                        {/* Score */}
                        <div
                            className="absolute top-[53px] right-3 text-sm font-bold bg-white px-2 py-1 rounded shadow z-20">
                            Score: {taskData.score || 0}
                        </div>

                        <div className="pt-[60px] space-y-3">
                            <p className="text-lg font-semibold mb-2 mt-4 text-center">
                                Task: {taskData.name || "Task Name"}
                            </p>

                            {features.description && (
                                <div className="bg-white border rounded p-2 shadow text-sm text-center">
                                    <TaskFeatureDescription
                                        value={taskData.description}
                                        onChange={(val) => handleDataChange("description", val)}
                                    />
                                </div>
                            )}

                            {(features.timer || features.input) && (
                                <div className="flex space-x-2 w-full">
                                    {features.timer && (
                                        <div
                                            className="w-1/2 bg-white border rounded p-2 shadow flex justify-center items-center min-h-[120px]">
                                            <TaskFeatureTimer
                                                value={taskData.timer}
                                                onChange={(val) => handleDataChange("timer", val)}
                                            />
                                        </div>
                                    )}
                                    {features.input && (
                                        <div
                                            className="w-1/2 bg-white border rounded p-2 shadow flex items-center min-h-[120px]">
                                            <TaskFeatureInput
                                                value={taskData.input}
                                                onChange={(val) => handleDataChange("input", val)}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {features.picture && (
                                <div className="bg-white border rounded p-2 shadow w-full">
                                    <TaskFeaturePicture
                                        file={taskData.picture}
                                        onChange={(file) => handleDataChange("picture", file)}
                                    />
                                </div>
                            )}

                            {features.choice && (
                                <div className="bg-white border rounded p-2 shadow w-full">
                                    <TaskFeatureChoice
                                        value={taskData.choice}
                                        onChange={(choices, selectedAnswer) => {
                                            handleDataChange("choice", choices);
                                            handleDataChange("input", selectedAnswer); // store the selected answer
                                        }}
                                    />
                                </div>
                            )}

                            <button
                                onClick={handleSubmitTask}
                                className="mt-4 bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
                            >
                                Submit Task
                            </button>
                        </div>
                    </div>
                </div>
                {/*{qrUrl && (*/}
                {/*    <div className="mt-6 flex justify-center">*/}
                {/*        <QRCodeComponent value={qrUrl} size={180} label="Scan to open task" />*/}
                {/*        {qrUrl && (*/}
                {/*            <button*/}
                {/*                onClick={() => setQrUrl(null)}*/}
                {/*                className="mt-2 text-sm text-blue-500 hover:underline"*/}
                {/*            >*/}
                {/*                Hide QR Code*/}
                {/*            </button>*/}
                {/*        )}*/}

                {/*    </div>*/}
                {/*)}*/}

            </div>
        </ProtectedRoute>
    );
}
