'use client';
import { useEffect, useRef } from 'react';
import LeaderboardItem from './LeaderboardItem';

export default function LeaderboardList({ teams }) {
    const prevTeamsRef = useRef([]);

    const getMovement = (name, index) => {
        const prevIndex = prevTeamsRef.current.findIndex(t => t.name === name);
        if (prevIndex === -1) return 'same';
        if (prevIndex > index) return 'up';
        if (prevIndex < index) return 'down';
        return 'same';
    };

    useEffect(() => {
        prevTeamsRef.current = teams;
    }, [teams]);

    return (
        <div className="space-y-2 mt-4">
            {teams.map((team, index) => (
                <LeaderboardItem
                    key={team.name}
                    team={team.name}
                    score={team.score}
                    rank={index}
                    movement={getMovement(team.name, index)}
                />
            ))}
        </div>
    );
}
