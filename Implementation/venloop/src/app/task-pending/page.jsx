"use client";

import { useEffect, useState } from "react";
import TeamService from "@/app/service/TeamService/teamService";
import NavBar from "@/app/components/NavBars/NavBar";
import TaskApplicationBar from "@/app/components/ContentBars/TaskApplicationBar";
import ProtectedRoute from "@/app/ProtectedRoute";

export default function PictureSubmissionPage() {
    const [pendingTasks, setPendingTasks] = useState([]);

    const fetchPendingTasks = async () => {
        try {
            const allTeams = await TeamService.getAllTeams();
            const result = [];

            for (const team of allTeams || []) {
                const completedTasks = team.completedTasks || {};

                for (const [taskId, task] of Object.entries(completedTasks)) {
                    const status = task.status?.toString().trim().toLowerCase();
                    if (task.picture && status === "pending") {
                        result.push({
                            teamId: team.id,
                            teamName: team.name,
                            taskId,
                            ...task,
                        });
                    }
                }
            }

            result.sort((a, b) => a.teamName.localeCompare(b.teamName));

            setPendingTasks(result);
        } catch (err) {
            console.error("Failed to fetch pending tasks", err);
            setPendingTasks([]);
        }
    };


    useEffect(() => {
        fetchPendingTasks();
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                <NavBar backTo="/admin-landing" />
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4 text-black">Pending Picture Tasks</h1>

                    {pendingTasks.length > 0 ? (
                        pendingTasks.map((task) => (
                            <TaskApplicationBar
                                key={`${task.teamId}-${task.taskId}`}
                                task={task}
                                refreshList={fetchPendingTasks}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No pending picture submissions.</p>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
