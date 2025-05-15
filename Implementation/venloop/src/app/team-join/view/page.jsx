'use client';

import { useEffect, useState } from 'react';
import TeamService from '@/app/service/TeamService/teamService';
import TeamJoinBar from '@/app/components/ContentBars/TeamJoinBar';
import CleanNavBar from "@/app/components/NavBars/CleanNavBar";

export default function TeamJoinMenu() {
    const [teams, setTeams] = useState([]);
    const [userToken, setUserToken] = useState(null);

    const fetchTeams = async () => {
        try {
            const data = await TeamService.getAllTeams();
            if (Array.isArray(data)) {
                setTeams(data);
            } else {
                setTeams([]);
            }
        } catch (err) {
            console.error('Error loading teams:', err);
            setTeams([]);
        }
    };

    useEffect(() => {
        fetchTeams();
        if (typeof window !== 'undefined') {
            setUserToken(localStorage.getItem("captain_token"));
        }
    }, []);

    const occupiedCount = teams.filter(t => t.occupied).length;

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            <CleanNavBar />
            <div className="p-4">
                <h1 className="text-xl font-semibold text-center text-[#1F2A60] mb-4">
                    {occupiedCount}/{teams.length} Teams are occupied
                </h1>
                {teams.map((team) =>
                    team && team.id ? (
                        <TeamJoinBar key={team.id} team={team} userToken={userToken} />
                    ) : null
                )}
            </div>
        </div>
    );
}
