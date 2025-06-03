'use client';
import { motion } from 'framer-motion';
import LeaderboardCard from './LeaderboardCard';

export default function FullTeamList({ teams, loggedInTeamId, view }) {
    return (
        <div>
            {teams.map(team => (
                <motion.div key={team.id} layout>
                    <LeaderboardCard
                        rank={team.globalRank}
                        team={team}
                        view={view}
                        highlight={String(team.id) === String(loggedInTeamId)}
                    />
                </motion.div>
            ))}
        </div>
    );
}
