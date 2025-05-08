"use client";

import { useState } from "react";
import TeamService from "@/app/TeamService/teamService";

export default function TaskApplicationBar({ task, refreshList }) {
    const [processing, setProcessing] = useState(false);

    const handleApprove = async () => {
        if (!confirm(`Approve task from ${task.teamName}?`)) return;
        setProcessing(true);
        await TeamService.updateTaskStatus(task.teamId, task.taskId, "approved");
        await refreshList();
        setProcessing(false);
    };

    const handleDecline = async () => {
        if (!confirm(`Decline task from ${task.teamName}?`)) return;
        setProcessing(true);
        await TeamService.removeCompletedTask(task.teamId, task.taskId);
        await refreshList();
        setProcessing(false);
    };

    return (
        <div className="bg-white shadow-md rounded-xl mb-4 p-4 border border-gray-200 hover:shadow-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {task.picture ? (
                        <img
                            src={task.picture}
                            alt={`Submission by ${task.teamName}`}
                            className="w-24 h-24 object-cover rounded border"
                        />
                    ) : (
                        <div className="text-gray-500 italic">No picture</div>
                    )}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            {task.teamName} – {task.name || task.taskId}
                        </h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {task.status !== "approved" ? (
                        <>
                            <button
                                onClick={handleApprove}
                                disabled={processing}
                                className="px-4 py-1 bg-[#3C8DC3] text-white rounded hover:bg-[#1F2A60] disabled:opacity-50"
                            >
                                Approve
                            </button>
                            <button
                                onClick={handleDecline}
                                disabled={processing}
                                className="px-4 py-1 bg-[#D86F27] text-white rounded hover:bg-red-700 disabled:opacity-50"
                            >
                                Decline
                            </button>
                        </>
                    ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">
                            Approved
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
