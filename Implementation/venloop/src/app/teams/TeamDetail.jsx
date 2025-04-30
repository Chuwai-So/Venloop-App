'use client';

import { useEffect, useState } from "react";
import TeamService from "@/app/TeamService/teamService";
import {useParams, useSearchParams} from "next/navigation";
import { Suspense } from 'react'

export default function TeamDetail() {
    const colors = {
        blue: '#61C3E6',
        orange: '#E64B27',
        yellow: '#FFD700',
        white: '#FFFFFF',
        black: '#000000',
    };
    const searchParams = useSearchParams();
    const teamId = searchParams.get("id");
    const [team, setTeam] = useState(null);

    useEffect(() => {
        console.log("haha")
        console.log("teamId:", teamId);
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
        <div className="min-h-screen bg-venloopBlue text-white p-4 flex flex-col gap-6">
            <header className="text-center border-b border-white pb-2">
                <h1 className="text-2xl font-bold">{team.name}</h1>
                <p className="text-sm text-venloopYellow">Team ID: {team.id}</p>
            </header>

            <section className="bg-white rounded-lg text-black p-4 shadow">
                <h2 className="text-lg font-semibold text-venloopOrange mb-2">Captain</h2>
                <p>{team.captain || "Not assigned yet"}</p>
            </section>

            <section className="bg-white rounded-lg text-black p-4 shadow">
                <h2 className="text-lg font-semibold text-venloopOrange mb-2">Completed Tasks</h2>
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

            <section className="bg-white rounded-lg text-black p-4 shadow">
                <h2 className="text-lg font-semibold text-venloopOrange mb-2">Score History</h2>
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
        </div>
    );
}