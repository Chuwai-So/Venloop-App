'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TaskService from "@/app/TaskService/taskService";
import TeamService from "@/app/TeamService/teamService";
import TaskFeatureDescription from "@/app/Component/TaskFeatureDescription";
import TaskFeatureTimer from "@/app/Component/TaskFeatureTimer";
import TaskFeaturePicture from "@/app/Component/TaskFeaturePicture";
import TaskFeatureInput from "@/app/Component/TaskFeatureInput";
import TaskFeatureChoice from "@/app/Component/TaskFeatureChoice";
import CleanNavBar from "@/app/Component/NavBars/CleanNavBar";
import {TaskAdapter} from "@/app/TaskService/taskAdapter";

export default function Page() {

    const searchParams = useSearchParams();
    const taskId = searchParams.get("id");
    const [task, setTask] = useState(null);
    const [answer, setAnswer] = useState("");
    const [picture, setPicture] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
    console.log('Here should be task id');
    console.log(taskId);

    const handleSubmit = async () => {
        const teamToken = localStorage.getItem("teamAccessToken");
        console.log("Team token from localStorage:", teamToken);
        if (!teamToken) {
            alert("Team not authenticated.");
            return;
        }

        setIsSubmitting(true);

        const submission = {
            userAnswer: answer || selectedChoice || "",
            userPicture: picture || null,
            submittedAt: Date.now(),
        };
        console.log("Picture at submit time:", picture);
        if (picture) {
            console.log("Picture type:", picture.constructor.name);
            console.log("Is File?", picture instanceof File);
            console.log("Is Blob?", picture instanceof Blob);
        }

        try {
            const teamId = await TeamService.verifyTokenAndGetTeamId(teamToken);
            if ((submission.userPicture) != null) {
                await TeamService.approvePictureTaskDemo(teamId, taskId, submission.userPicture)
            } else {
                await TeamService.completeTask(teamId, taskId, submission);
            }
            alert("Task submitted!");
        } catch (err) {
            console.error(err);
            alert("Submission failed.");
        }

        setIsSubmitting(false);
    };

    if (!task) return <div className="p-6 text-center">Loading task...</div>;

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <CleanNavBar />
            <div className="max-w-md mx-auto mt-4 px-4 py-6 bg-white shadow rounded-lg space-y-6">
                <h1 className="text-xl font-bold text-center">{task.name}</h1>

                {task.features.description && (
                    <div className="border p-3 rounded bg-gray-50">
                        <TaskFeatureDescription value={task.description} onChange={() => {}} readOnly />
                    </div>
                )}

                {task.features.timer && (
                    <div className="border p-3 rounded bg-gray-50">
                        <TaskFeatureTimer value={task.timer} onChange={() => {}} readOnly />
                    </div>
                )}

                {task.features.choice && (
                    <div className="border p-3 rounded bg-gray-50">
                        <TaskFeatureChoice
                            value={task.choices}
                            selected={selectedChoice}
                            onSelect={(val) => setSelectedChoice(val)}
                            readOnly={false}
                        />
                    </div>
                )}

                {task.features.picture && (
                    <div className="border p-3 rounded bg-gray-50">
                        <TaskFeaturePicture file={picture} onChange={(f) => setPicture(f)} />
                    </div>
                )}

                {task.features.input && (
                    <div className="border p-3 rounded bg-gray-50">
                        <TaskFeatureInput value={answer} onChange={setAnswer} />
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-[#D86F27] text-white font-semibold py-2 rounded hover:scale-105 transition-transform"
                >
                    {isSubmitting ? "Submitting..." : "Submit Task"}
                </button>
            </div>
        </div>
    );
}
