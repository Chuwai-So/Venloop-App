'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/app/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';
import TeamService from '@/app/service/TeamService/teamService';

export default function TeamJoinBar({ team }) {
    const router = useRouter();
    const [joining, setJoining] = useState(false);

    if (!team || !team.id || !team.name) {
        throw new Error('Fetching teams failed');
    }

    const isOccupied = team.occupied;

    const handleJoin = async () => {
        if (isOccupied || joining) return;

        setJoining(true);
        try {
            const tokenRef = ref(db, 'qr_tokens');
            const newTokenRef = await push(tokenRef, {
                teamId: team.id,
                createdAt: serverTimestamp(),
            });
            const token = newTokenRef.key;

            const success = await TeamService.joinTeamAsCaptain(team.id, token);
            if (success) {
                localStorage.setItem('captain_token', token);
                router.push(`/team-detail/view?id=${team.id}`);
            } else {
                alert('Failed to join team.');
            }
        } catch (err) {
            console.error('Join failed:', err);
            alert('An error occurred while joining the team.');
        } finally {
            setJoining(false);
        }
    };

    return (
        <div
            className={`bg-white rounded-xl mb-4 p-4 flex justify-between items-center border transition-all duration-300 
                ${isOccupied ? 'border-gray-300 shadow-sm opacity-70' : 'border-gray-200 hover:shadow-lg shadow-md'} 
                ${joining ? 'opacity-60' : ''}`}
        >
            <h2 className="text-xl font-bold text-gray-800">{team.name}</h2>
            <button
                disabled={isOccupied || joining}
                className={`px-4 py-2 rounded-lg shadow transition 
                    ${isOccupied || joining
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#3C8DC3] text-white hover:bg-[#1F2A60]'}`}
                onClick={handleJoin}
            >
                {isOccupied ? 'Occupied' : 'Join'}
            </button>
        </div>
    );
}
