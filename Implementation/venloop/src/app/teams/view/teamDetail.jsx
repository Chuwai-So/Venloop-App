'use client';

import { useEffect, useState } from "react";
import TeamService from "@/app/TeamService/teamService";
import { useSearchParams } from "next/navigation";
import CleanNavBar from "@/app/Component/CleanNavBar";

export default function TeamDetail() {
    const colors = {
        blue: '#61C3E6',
        orange: '#E64B27',
        yellow: '#FFD700',
        white: '#FFFFFF',
        black: '#000000',
    };
    console.log("Should have a team id")

    const searchParams = useSearchParams();
    const teamId = searchParams.get("id");
    console.log(`Here is the id: ${teamId}`)
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            const data = await TeamService.getTeam(teamId);
            setTeam(data);
        };

        if (teamId) fetchTeam();
    }, [teamId]);

    if (!team) {
        return <div className="text-center p-6">Loading team...</div>;
    }

    return (
        <div style={{ backgroundColor: colors.blue, color: colors.white }} className="min-h-screen">
            <div className="w-full sticky top-0 z-50">
                <CleanNavBar />
            </div>

            <main className="p-4 flex flex-col gap-6">
                <header className="text-center border-b border-white pb-2">
                    <h1 className="text-2xl font-bold">{team.name}</h1>
                </header>

                <section style={{ backgroundColor: colors.white, color: colors.black }} className="rounded-lg p-4 shadow">
                    <h2 style={{ color: colors.orange }} className="text-lg font-semibold mb-2">Captain</h2>
                    <p>{team.captain || "Not assigned yet"}</p>
                </section>

                <section style={{ backgroundColor: colors.white, color: colors.black }} className="rounded-lg p-4 shadow">
                    <h2 style={{ color: colors.orange }} className="text-lg font-semibold mb-2">Completed Tasks</h2>
                    {team.completedTasks && Object.keys(team.completedTasks).length > 0 ? (
                        <ul className="list-disc list-inside">
                            {Object.entries(team.completedTasks).map(([taskId, task]) => (
                                <li key={taskId}>
                                    {task.name || taskId} — {task.status || "completed"}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tasks completed yet.</p>
                    )}
                </section>

                <section style={{ backgroundColor: colors.white, color: colors.black }} className="rounded-lg p-4 shadow">
                    <h2 style={{ color: colors.orange }} className="text-lg font-semibold mb-2">Score History</h2>
                    {team.scoreHistory && Object.keys(team.scoreHistory).length > 0 ? (
                        <ul className="text-sm">
                            {Object.entries(team.scoreHistory).map(([date, score]) => (
                                <li key={date}>
                                    {date}: {score}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No score history yet.</p>
                    )}
                </section>
            </main>
        </div>
    );
}