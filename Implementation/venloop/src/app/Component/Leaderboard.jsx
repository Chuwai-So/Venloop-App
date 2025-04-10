'use client';
import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import LeaderboardList from './LeaderboardList';

const data = {
    day: [
        { name: 'Team A', score: 95 },
        { name: 'Team H', score: 60 },
        { name: 'Team C', score: 57 },
        { name: 'Team E', score: 44 },
        { name: 'Team G', score: 43 },
        { name: 'Team F', score: 38 },
        { name: 'Team B', score: 30 },
        { name: 'Team D', score: 28 },
    ],
    week: [
        { name: 'Team H', score: 100 },
        { name: 'Team C', score: 93 },
        { name: 'Team A', score: 78 },
        { name: 'Team E', score: 76 },
        { name: 'Team G', score: 71 },
        { name: 'Team F', score: 65 },
        { name: 'Team B', score: 59 },
        { name: 'Team D', score: 58 },
    ],
};

export default function Leaderboard() {
    const [mode, setMode] = useState('week');
    const sortedTeams = data[mode].slice().sort((a, b) => b.score - a.score);

    return (
        <div className="max-w-md mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <button className="text-xl">&larr;</button>
                <h2 className="text-xl font-bold text-center flex-1">OverallScores</h2>
                <ToggleSwitch value={mode} onChange={setMode} />
            </div>

            {/* Scrollable leaderboard container */}
            <div className="max-h-[360px] overflow-y-auto border border-gray-200 rounded-xl p-3 shadow-inner bg-white">
                <LeaderboardList teams={sortedTeams} />
            </div>
        </div>
    );
}
