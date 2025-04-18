"use client";

import {useEffect, useState} from "react";
import TeamService from "@/app/TeamService/teamService";
import NavBar from "@/app/Component/NavBar";
import TeamBar from "@/app/Component/TeamBar";

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
                console.error("Error loading teams:", err);
                setTeams([]);
            });
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
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
    );
}
