"use client";

import NavBar from "@/app/Component/NavBar";
import { useState } from "react";

export default function CreateTeamsPage() {
    const [teamCount, setTeamCount] = useState(0);

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar backTo={"/AdminLandingPage.jsx"} />

            <div className="p-8 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-8 text-[#1F2A60]">Create Teams</h1>

                <div className="grid grid-cols-2 gap-12">
                    {/* Left side */}
                    <div>
                        <label htmlFor="team-count" className="block mb-2 font-medium text-[#1F2A60]">
                            Select number of teams:
                        </label>
                        <select
                            id="team-count"
                            className="mb-6 p-2 rounded border w-full text-[#1F2A60]"
                            value={teamCount}
                            onChange={(e) => setTeamCount(parseInt(e.target.value))}
                        >
                            <option value={0}>-- Select --</option>
                            {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>

                        <button
                            className="bg-[#D86F27] text-white px-6 py-2 rounded hover:scale-105 transition-transform w-full"
                        >
                            Submit
                        </button>
                    </div>

                    {/* Right side */}
                    <div className="space-y-4">
                        {teamCount > 0 && [...Array(teamCount)].map((_, index) => (
                            <div key={index} className="mb-4">
                                <label className="block mb-1 font-medium text-[#1F2A60]">
                                    Team {index + 1} Name:
                                </label>
                                <input
                                    type="text"
                                    className="p-2 border rounded w-full text-[#1F2A60]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
