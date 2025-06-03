'use client';
import { motion } from 'framer-motion';
import LeaderboardCard from './LeaderboardCard';
import { Users, Trophy, Shield, Crown } from 'lucide-react';

export default function TopThreePodium({ teams, loggedInTeamId, view }) {
    if (teams.length < 3) return null;
    const [first, second, third] = teams;

    return (
        <motion.div layout className="relative flex justify-center items-end h-44">
            {/* 2nd */}
            <motion.div layout className="absolute left-0 bottom-2 w-24 flex flex-col items-center">
                <AvatarCircle rank={2} />
                <LeaderboardCard
                    rank={2}
                    team={second}
                    view={view}
                    highlight={second.id === loggedInTeamId}
                    compact
                />
            </motion.div>

            {/* 1st */}
            <motion.div layout className="w-28 mb-6 flex flex-col items-center">
                <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="inline-block mb-1"
                    style={{ perspective: 800 }}
                >
                    <div style={{ transformStyle: 'preserve-3d' }}>
                        <Crown className="w-8 h-8 text-yellow-400" />
                    </div>
                </motion.div>

                <AvatarCircle rank={1} />
                <LeaderboardCard
                    rank={1}
                    team={first}
                    view={view}
                    highlight={first.id === loggedInTeamId}
                    compact
                />
            </motion.div>

            {/* 3rd */}
            <motion.div layout className="absolute right-0 bottom-2 w-24 flex flex-col items-center">
                <AvatarCircle rank={3} />
                <LeaderboardCard
                    rank={3}
                    team={third}
                    view={view}
                    highlight={third.id === loggedInTeamId}
                    compact
                />
            </motion.div>
        </motion.div>
    );
}


function AvatarCircle({ rank }) {
    const bgColors = {
        1: 'bg-yellow-300',
        2: 'bg-gray-300',
        3: 'bg-orange-300',
    };

    const icons = {
        1: <Trophy className="w-6 h-6 text-white" />,
        2: <Shield className="w-6 h-6 text-white" />,
        3: <Users className="w-6 h-6 text-white" />,
    };

    return (
        <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${bgColors[rank]}`}>
            {icons[rank]}
        </div>
    );
}
