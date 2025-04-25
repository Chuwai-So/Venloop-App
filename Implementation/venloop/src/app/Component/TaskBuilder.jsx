'use client';
import { useState } from "react";

export default function TaskBuilder() {
    const [features, setFeatures] = useState({
        description: false,
        timer: false,
        picture: false,
        video: false,
    });

    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        timer: "",
        picture: null,
        video: null,
    });

    const handleAddFeature = (feature) => {
        setFeatures((prev) => ({ ...prev, [feature]: true }));
    };

    const handleDataChange = (field, value) => {
        setTaskData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex h-screen font-sans">
            {/* Left Side - Functionality List */}
            <div className="w-1/2 bg-blue-50 p-6 border-r">
                <h2 className="text-xl font-bold mb-4">Task Creation</h2>

                {["description", "timer", "picture", "video"].map((feat) => (
                    <div key={feat} className="flex justify-between mb-3 items-center">
                        <span className="capitalize">{feat}</span>
                        <button
                            className={`px-3 py-1 rounded transition-colors ${
                                features[feat] ? "bg-red-400 text-white" : "bg-green-400 text-white"
                            }`}
                            onClick={() => {
                                if (features[feat]) {
                                    // Remove feature and reset its value
                                    setFeatures((prev) => ({ ...prev, [feat]: false }));
                                    setTaskData((prev) => ({
                                        ...prev,
                                        [feat]: feat === "picture" || feat === "video" ? null : "",
                                    }));
                                } else {
                                    // Add feature
                                    setFeatures((prev) => ({ ...prev, [feat]: true }));
                                }
                            }}
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

            {/* Right Side - Live Task Preview */}
            <div className="w-1/2 p-6 bg-white">
                <h2 className="text-xl font-bold mb-4">Task Preview</h2>

                <div className="border p-4 rounded bg-gray-50">
                    <p className="text-lg font-semibold">
                        Task: {taskData.name || "Task Name"}
                    </p>

                    {features.description && (
                        <textarea
                            placeholder="Add Description..."
                            value={taskData.description}
                            onChange={(e) => handleDataChange("description", e.target.value)}
                            className="my-2 p-2 border w-full"
                        />
                    )}

                    {features.timer && (
                        <input
                            type="time"
                            value={taskData.timer}
                            onChange={(e) => handleDataChange("timer", e.target.value)}
                            className="my-2 p-2 border w-full"
                        />
                    )}

                    {features.picture && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleDataChange("picture", e.target.files[0])}
                            className="my-2 w-full"
                        />
                    )}

                    {taskData.picture && (
                        <img
                            src={URL.createObjectURL(taskData.picture)}
                            alt="Preview"
                            className="my-2 h-32"
                        />
                    )}

                    {features.video && (
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleDataChange("video", e.target.files[0])}
                            className="my-2 w-full"
                        />
                    )}

                    {taskData.video && (
                        <video controls className="my-2 h-32">
                            <source src={URL.createObjectURL(taskData.video)} />
                        </video>
                    )}

                    <button className="mt-4 bg-green-500 text-white p-2 w-full rounded">
                        Finish Creation
                    </button>
                </div>
            </div>
        </div>
    );
}
