'use client';

import { useEffect, useState } from 'react';
import TeamService from '@/app/service/TeamService/teamService';
import AppLeaderboardWrapper from '@/app/Leaderboard/AppLeaderboardWrapper';
import TopThreePodium from '@/app/Leaderboard/TopThreePodium';
import FullTeamList from '@/app/Leaderboard/FullTeamList';
import ToggleSwitch from '@/app/Leaderboard/ToggleSwitch';
import SearchBar from '@/app/Leaderboard/SearchBar';
import CleanNavBar from "@/app/components/NavBars/CleanNavBar";
import NavBar from "@/app/components/NavBars/NavBar";

export default function LeaderboardPage() {
    const [teams, setTeams] = useState([]);
    const [view, setView] = useState('day');
    const [search, setSearch] = useState('');
    const [loggedInTeamId, setLoggedInTeamId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Get token from localStorage
                const token = localStorage.getItem('teamToken');
                let teamIdFromToken = null;

                if (token) {
                    try {
                        teamIdFromToken = await TeamService.verifyTokenAndGetTeamId(token);
                        setLoggedInTeamId(teamIdFromToken); // ✅ highlight will use this
                    } catch (err) {
                        console.warn('Invalid team token in localStorage.');
                    }
                }

                const allTeams = await TeamService.getAllTeams();

                const enriched = allTeams.map(team => {
                    const completed = team.completedTasks || {};
                    const completedCount = Object.keys(completed).length;
                    const correctCount = Object.values(completed).filter(task =>
                        task?.result === 'correct' || task?.status === 'approved'
                    ).length;

                    return { ...team, completedCount, correctCount };
                });

                setTeams(enriched);
            } catch (err) {
                console.error("Error loading teams:", err);
            }
        }

        fetchData();
    }, []);

    // Normalize helper
    const normalize = str => str
        ?.toLowerCase()
        .replace(/[^a-z0-9\s]/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

    // Sort teams globally
    const rankedTeams = [...teams].sort((a, b) => {
        const key = view === 'day' ? 'completedCount' : 'correctCount';
        return b[key] - a[key];
    });

    // Add ranks globally (1-based)
    const rankedTeamsWithRanks = rankedTeams.map((team, index) => ({
        ...team,
        globalRank: index + 1,
    }));

    const topThree = rankedTeamsWithRanks.slice(0, 3);

    // Filter only rank 4+ teams for the lower list
    const rest = rankedTeamsWithRanks.slice(3);

    // Apply search to rest only (top 3 stays visible)
    const filteredRest = rest.filter(team => {
        const teamName = normalize(team.name);
        const searchTerm = normalize(search);
        return teamName.includes(searchTerm);
    });

    return (
        <>
            <NavBar backTo="/admin-landing" />
            <AppLeaderboardWrapper>
                <div className="flex justify-between items-center gap-2 mb-4">
                    <div className="flex-1">
                        <SearchBar value={search} onChange={setSearch} compact />
                    </div>
                    <ToggleSwitch value={view} onChange={setView} />
                </div>

                <div className="mt-14">
                    <TopThreePodium teams={topThree} loggedInTeamId={loggedInTeamId} />
                </div>
                <div className="bg-[#1F2A60] rounded-3xl shadow p-4 space-y-2">
                    <FullTeamList teams={filteredRest} loggedInTeamId={loggedInTeamId} />
                </div>
            </AppLeaderboardWrapper>
        </>

    );
}
