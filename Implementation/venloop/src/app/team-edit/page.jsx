"use client";

import {useEffect, useState} from "react";
import TeamService from "@/app/service/TeamService/teamService";
import NavBar from "@/app/components/NavBars/NavBar";
import TeamBar from "@/app/components/ContentBars/TeamBar";
import ProtectedRoute from "@/app/ProtectedRoute";

export default function TeamMenu() {
    const [teams, setTeams] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const fetchTeams = () => {
        TeamService.getAllTeams()
            .then(data => {
                if (Array.isArray(data)) {
                    setTeams(data);
                } else {
                    setTeams([]);
                }
            })
            .catch(err => {
                console.error("Error loading team-detail:", err);
                setTeams([]);
            });
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 relative overflow-hidden">
                <NavBar backTo={"/admin-landing"}/>
                <div className="p-4">
                    {teams.map((team) => (
                        <TeamBar
                            key={team.id}
                            team={team}
                            isExpanded={expanded === team.id}
                            onToggle={() => setExpanded(expanded === team.id ? null : team.id)}
                            refreshTeams={fetchTeams} // Pass it down
                        />
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    );
}
