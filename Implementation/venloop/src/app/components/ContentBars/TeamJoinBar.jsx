'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {db} from '@/app/firebase';
import {ref, push, get, serverTimestamp} from 'firebase/database';
import TeamService from '@/app/service/TeamService/teamService';

export default function TeamJoinBar({team, userToken}) {
    const router = useRouter();
    const [joining, setJoining] = useState(false);
    const [canRejoin, setCanRejoin] = useState(false);

    const isOccupied = team.occupied;

    useEffect(() => {
        const checkRejoinPermission = async () => {
            if (isOccupied && userToken) {
                try {
                    const tokenRef = ref(db, `teams/${team.id}/${userToken}`);
                    const snapshot = await get(tokenRef);
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        if (data.teamId === team.id) {
                            setCanRejoin(true);
                        }
                    }
                } catch (error) {
                    console.error("Error checking token:", error);
                }
            }
        };

        checkRejoinPermission();
    }, [team, isOccupied, userToken]);

    const handleJoin = async () => {
        if (joining) return;

        setJoining(true);
        try {
            if (canRejoin && userToken) {
                router.push(`/team-detail/view?id=${team.id}`);
                return;
            }

            if (isOccupied) {
                alert("Team is already occupied.");
                return;
            }


            const token = crypto.randomUUID();

            console.log('token to be added to the team:', token);
            await TeamService.updateTeam(team.id, {teamToken: token});
            console.log('token has been added to the team:', token);

            const success = await TeamService.joinTeamAsCaptain(team.id);
            if (success) {
                localStorage.setItem('teamAccessToken', token);
                router.push(`/team-detail/view?id=${team.id}`);
            } else {
                alert("Failed to join team.");
            }
        } catch (err) {
            console.error('Join failed:', err);
            alert("An error occurred while joining the team.");
        } finally {
            setJoining(false);
        }
    };

    const highlightClasses = canRejoin
        ? 'border-[#3C8DC3] bg-[#e6f4ff]'
        : isOccupied
            ? 'border-gray-300 shadow-sm opacity-70'
            : 'border-gray-200 hover:shadow-lg shadow-md';

    return (
        <div
            className={`bg-white rounded-xl mb-4 p-4 flex justify-between items-center border transition-all duration-300 ${highlightClasses} ${joining ? 'opacity-60' : ''}`}
        >
            <h2 className="text-xl font-bold text-gray-800">{team.name}</h2>
            <button
                disabled={!canRejoin && (isOccupied || joining)}
                className={`px-4 py-2 rounded-lg shadow transition 
                    ${(!canRejoin && (isOccupied || joining))
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#3C8DC3] text-white hover:bg-[#1F2A60]'}`}
                onClick={handleJoin}
            >
                {canRejoin ? 'Rejoin' : isOccupied ? 'Occupied' : 'Join'}
            </button>
        </div>
    );
}
