"use client";

import NavBar from "@/app/components/NavBars/NavBar";
import {useState} from "react";
import {TeamAdapter} from "@/app/service/TeamService/teamAdapter";
import ProtectedRoute from "@/app/ProtectedRoute";

export default function CreateTeamsPage() {
    const [teamCount, setTeamCount] = useState(0);

    const [teamNames, setTeamNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [failure, setFailure] = useState("");

    const handleTeamCountChange = (e) => {
        const count = parseInt(e.target.value);
        setTeamCount(count);
        setTeamNames(Array(count).fill(""));
        setSuccess("");
        setFailure("");
    }

    const handleInputChange = (index, value) => {
        const updated = [...teamNames];
        updated[index] = value;
        setTeamNames(updated);
    }

    const handleSubmit = async () => {
        setLoading(true);
        setSuccess("");
        setFailure("");

        try {
            const createdIds = [];
            for (let name of teamNames) {
                if (!name.trim()) continue;
                const id = await TeamAdapter.createTeam({name});
                createdIds.push(id);
            }
            setSuccess(`${createdIds.length} team(s) created successfully.`);
            setTeamNames([]);
            setTeamCount(0);
        } catch (error) {
            console.error(error);
            setFailure("An error occurred while creating team-detail.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                <NavBar backTo={"/admin-landing"}/>

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
                                onChange={handleTeamCountChange}
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
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Submit"}
                            </button>

                            {success && <p className="text-green-600 mt-4">{success}</p>}
                            {failure && <p className="text-red-600 mt-4">{failure}</p>}

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
                                        placeholder="Enter team name..."
                                        value={teamNames[index] || ""}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        className="p-2 border rounded w-full text-[#1F2A60]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
