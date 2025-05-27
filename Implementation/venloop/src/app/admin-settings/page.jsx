"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/NavBars/NavBar";
import ProtectedRoute from "@/app/ProtectedRoute";

export default function AdminSettings() {

    const [teamId, setTeamId] = useState("");
    const [days, setDays] = useState(7);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // TODO: Replace with actual team data
        setTeams([
            { id: "team1", name: "School1" },
            { id: "team2", name: "School2" },
            { id: "team3", name: "School3" }
        ]);
    }, []);

    const handleDeleteTeamPictures = () => {
        console.log("Delete pictures for team:", teamId);
    };

    const handleSetDeletionTimeframe = () => {
        console.log("Set deletion timeframe to:", days, "days");
    };

    return (
        <ProtectedRoute>
            <div className="h-screen flex flex-col">
                <NavBar backTo="/admin-landing" showInfoButton={true} />

                <main className="p-6 grid grid-rows-2 gap-6 flex-grow bg-white font-black">
                    {/* Top 3 buttons */}
                    <div className="grid grid-cols-12 gap-4 h-full">
                        <button
                            className="bg-[#3C8DC3] text-white rounded-xl col-span-4 flex items-center justify-center text-center text-sm p-4 hover:scale-102 transition-all"
                            onClick={() => console.log("Delete all teams")}
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
                                className="bg-gray-100 text-black rounded px-2 py-1 text-xs w-3/4"
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
                            onClick={() => console.log("Delete all tasks")}
                        >
                            Delete all tasks
                        </button>
                    </div>

                    {/* Bottom 2 buttons */}
                    <div className="grid grid-cols-12 gap-4 h-full">
                        <button
                            className="bg-[#D86F27] text-white rounded-xl col-span-6 flex items-center justify-center text-center text-sm p-6 hover:scale-102 transition-all"
                            onClick={() => console.log("Restart Event")}
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
                                className="bg-gray-100 text-black rounded px-2 py-1 text-xs w-3/4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
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
