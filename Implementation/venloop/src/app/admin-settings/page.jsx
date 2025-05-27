"use client";

import { useState, useEffect } from "react";
import NavBar from "@/app/components/NavBars/NavBar";
import ProtectedRoute from "@/app/ProtectedRoute";
import TeamService from "@/app/service/TeamService/teamService";
import TaskService from "@/app/service/TaskService/taskService";
import {TokenAdapter} from "@/app/service/TokenService/tokenAdapter";

export default function AdminSettings() {
    const [teamId, setTeamId] = useState("");
    const [days, setDays] = useState(7);
    const [teams, setTeams] = useState([]);

    const fetchTeams = async () => {
        try {
            const allTeams = await TeamService.getAllTeams();

            // Filter teams where at least one completedTask has a 'picture'
            const teamsWithPictures = allTeams.filter(team =>
                team.completedTasks &&
                Object.values(team.completedTasks).some(task => task.picture)
            );

            setTeams(teamsWithPictures);
        } catch (err) {
            console.error("Error loading teams with pictures:", err);
            setTeams([]);
        }
    };

    const handleRestartEvent = async () => {
        const confirmed = confirm("This will restart the event and invalidate all old QR codes. Proceed?");
        if (!confirmed) return;

        try {
            const newToken = await TokenAdapter.setGlobalEventToken();
            alert(`Event restarted. New token generated: ${newToken}`);
        } catch (err) {
            console.error("Failed to restart event:", err);
            alert("Failed to restart event. Please try again.");
        }
    };


    useEffect(() => {
        fetchTeams();
    }, []);

    const handleDeleteTeamPictures = async () => {
        if (!teamId) {
            alert("Please select a team first.");
            return;
        }

        const confirmed = confirm("Are you sure you want to delete all submitted pictures for this team?");
        if (!confirmed) return;

        const success = await TeamService.deleteSubmittedPictures(teamId);
        if (success) {
            alert("Submitted pictures deleted successfully.");
            setTeamId("");
            fetchTeams();
        } else {
            alert("No pictures found or failed to delete.");
        }
    };

    const handleDeleteAllTeams = async () => {
        const confirmed = confirm("Are you sure you want to delete ALL teams?");
        if (!confirmed) return;

        const success = await TeamService.deleteAllTeams();
        if (success) {
            alert("All teams deleted.");
            setTeamId("");
            fetchTeams();
        } else {
            alert("Failed to delete all teams.");
        }
    };

    const handleDeleteAllTasks = async () => {
        const confirmed = confirm("Are you sure you want to delete ALL tasks?");
        if (!confirmed) return;

        const success = await TaskService.deleteAllTasks();
        if (success) {
            alert("All tasks deleted.");
        } else {
            alert("Failed to delete all tasks.");
        }
    };

    const handleSetDeletionTimeframe = () => {
        console.log("Set deletion timeframe to:", days, "days");
    };

    return (
        <ProtectedRoute>
            <div className="h-screen flex flex-col">
                <NavBar backTo="/admin-landing" showInfoButton={true} />

                <main className="pt-20 p-6 grid grid-rows-2 gap-6 flex-grow bg-white font-black">
                    {/* Top 3 buttons */}
                    <div className="grid grid-cols-12 gap-4 h-full">
                        <button
                            className="bg-[#3C8DC3] text-white rounded-xl col-span-4 flex items-center justify-center text-center text-sm p-4 hover:scale-102 transition-all"
                            onClick={handleDeleteAllTeams}
                        >
                            Delete all teams
                        </button>

                        {/* Team selector in the middle */}
                        <button
                            onClick={handleDeleteTeamPictures}
                            className="bg-[#3C8DC3] text-white rounded-xl col-span-4 flex flex-col justify-center items-center text-sm p-4 gap-3 hover:scale-102 transition-all"
                        >
                            <div className="text-center leading-tight">Delete picture submission</div>
                            <select
                                value={teamId}
                                onChange={(e) => setTeamId(e.target.value)}
                                className="bg-gray-200 text-black rounded px-2 py-1 text-xs w-3/4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <option value="">Select team</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </button>

                        <button
                            className="bg-[#3C8DC3] text-white rounded-xl col-span-4 flex items-center justify-center text-center text-sm p-4 hover:scale-102 transition-all"
                            onClick={handleDeleteAllTasks}
                        >
                            Delete all tasks
                        </button>
                    </div>

                    {/* Bottom 2 buttons */}
                    <div className="grid grid-cols-12 gap-4 h-full">
                        <button
                            className="bg-[#D86F27] text-white rounded-xl col-span-6 flex items-center justify-center text-center text-sm p-6 hover:scale-102 transition-all"
                            onClick={handleRestartEvent}
                        >
                            Restart Event
                        </button>


                        {/* Timeframe selector with styling match */}
                        <button
                            onClick={handleSetDeletionTimeframe}
                            className="bg-[#D86F27] text-white rounded-xl col-span-6 flex flex-col justify-center items-center text-sm p-4 gap-3 hover:scale-102 transition-all"
                        >
                            <div className="text-center">Set Data Deletion Timeframe</div>
                            <select
                                value={days}
                                onChange={(e) => setDays(Number(e.target.value))}
                                className="bg-gray-200 text-black rounded px-2 py-1 text-xs w-3/4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {Array.from({length: 30}, (_, i) => i + 1).map((d) => (
                                    <option key={d} value={d}>{d} days</option>
                                ))}
                            </select>
                        </button>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
