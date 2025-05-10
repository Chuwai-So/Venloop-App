'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TaskService from "@/app/TaskService/taskService";
import TeamService from "@/app/TeamService/teamService";
import TaskFeatureDescription from "@/app/Component/TaskFeatureDescription";
import TaskFeatureTimer from "@/app/Component/TaskFeatureTimer";
import TaskFeaturePicture from "@/app/Component/TaskFeaturePicture";
import TaskFeatureInput from "@/app/Component/TaskFeatureInput";
import TaskFeatureChoiceEditor from "@/app/Component/TaskFeatureChoiceEditor";
import CleanNavBar from "@/app/Component/NavBars/CleanNavBar";
import Toast from "@/app/Component/Toast";
import TaskFeatureChoiceDisplay from "@/app/Component/TaskFeatureChoiceDisplay";

export default function Page() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get("id");

    const [task, setTask] = useState(null);
    const [answer, setAnswer] = useState("");
    const [picture, setPicture] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [toast, setToast] = useState("");
    const [completionStats, setCompletionStats] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const fetchCompletionStats = async () => {
        try {
            const teams = await TeamService.getAllTeams();
            const total = teams.length;
            const completed = teams.filter(t => t.completedTasks && t.completedTasks[taskId]).length;

            setCompletionStats({ total, completed });
            setToast(`${completed} out of ${total} teams have  completed this task task as well!`);
        } catch (err) {
            console.error("Error fetching task stats:", err);
        }
    };

    useEffect(() => {
        const fetchTask = async () => {
            if (!taskId) return;
            const data = await TaskService.getTask(taskId);
            if (data?.isTemplate) {
                setTask(data);
            } else {
                alert("Invalid or non-template task.");
            }
        };
        fetchTask();
    }, [taskId]);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const teamToken = localStorage.getItem("teamAccessToken");
        if (!teamToken) {
            alert("Team not authenticated.");
            setIsSubmitting(false);
            return;
        }

        try {
            const teamId = await TeamService.verifyTokenAndGetTeamId(teamToken);
            const finalAnswer = selectedChoice || answer || "";

            if (task.features.input || task.features.choice) {
                await TeamService.completeTask(teamId, taskId, finalAnswer);
            }

            if (task.features.picture && picture) {
                await TeamService.approvePictureTaskDemo(teamId, taskId, picture);
            }

            setToast("Task submitted!");
            await fetchCompletionStats();
            setHasSubmitted(true);
        } catch (err) {
            console.error("Submission failed:", err);
            setToast("Failed to submit task.");
        }

        setIsSubmitting(false);
    };

    if (!task) return <div className="p-6 text-center">Loading task...</div>;

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-black">
            <CleanNavBar />
            <div className="max-w-md mx-auto mt-4 px-4 py-6 bg-white shadow rounded-lg space-y-6">
                <h1 className="text-xl font-bold text-center">{task.name}</h1>

                {task.features.description && (
                    <div className="border p-3 rounded bg-gray-50">
                        <TaskFeatureDescription value={task.description} onChange={() => {
                        }} readOnly/>
                    </div>
                )}

                {task.features.timer && (
                    <div className="border p-3 rounded bg-gray-50">
                        <TaskFeatureTimer value={task.timer} onChange={() => {
                        }} readOnly/>
                    </div>
                )}

                {task.features.choice && (
                    <div className="border p-3 rounded bg-gray-50">
                        <TaskFeatureChoiceDisplay
                            value={task.choices}
                            selected={selectedChoice}
                            onSelect={setSelectedChoice}
                            disabled={hasSubmitted}
                        />

                    </div>
                )}

                {task.features.picture && (
                    <div className="border p-3 rounded bg-gray-50">
                        <TaskFeaturePicture file={picture} onChange={setPicture} disabled={hasSubmitted}/>
                    </div>
                )}

                {task.features.input && (
                    <div className="border p-3 rounded bg-gray-50">
                        <TaskFeatureInput value={answer} onChange={setAnswer} disabled={hasSubmitted}/>
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || hasSubmitted}
                    className={`w-full text-white font-semibold py-2 rounded transition-transform ${
                        hasSubmitted
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#D86F27] hover:scale-105"
                    }`}
                >
                    {isSubmitting
                        ? "Submitting..."
                        : hasSubmitted
                            ? "Submitted"
                            : "Submit Task"}
                </button>
            </div>

            {toast && (
                <Toast
                    message={toast}
                    onClose={() => setToast("")}
                    type="success"
                />
            )}

        </div>
    );
}
