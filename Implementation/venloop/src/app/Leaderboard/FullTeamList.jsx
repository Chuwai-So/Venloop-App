'use client';
import { motion } from 'framer-motion';
import LeaderboardCard from './LeaderboardCard';

export default function FullTeamList({ teams, loggedInTeamId }) {
    return (
        <div>
            {teams.map(team => (
                <motion.div key={team.id} layout>
                    <LeaderboardCard
                        rank={team.globalRank || index + 1}
                        team={team}
                        highlight={String(team.id) === String(loggedInTeamId)}
                    />

                </motion.div>
            ))}
        </div>
    );
}
