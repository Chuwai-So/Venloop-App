'use client';
import { motion } from 'framer-motion';

export default function LeaderboardCard({ rank, team, highlight, compact = false }) {
    const borderColor =
        rank === 1 ? 'border-l-yellow-400' :
            rank === 2 ? 'border-l-gray-400' :
                rank === 3 ? 'border-l-orange-400' :
                    'border-l-blue-300';

    return (
        <motion.div
            className={`bg-white relative rounded-xl shadow p-3 border-l-4 ${borderColor} ${highlight ? 'ring-2 ring-yellow-400 scale-[1.02]' : ''} ${
                compact ? 'text-xs' : 'text-sm'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rank * 0.05 }}
        >
            {highlight && (
                <div className="absolute top-2 right-2 text-xs font-bold bg-yellow-300 text-black px-2 py-1 rounded shadow">
                    Jouw team
                </div>
            )}

            <div className="text-black text-center">
                <h2 className="font-bold">{rank}. {team.name}</h2>
                <p className="text-gray-600">Voltooid: {team.completedCount}</p>
                <p className="text-gray-600">Correct: {team.correctCount}</p>
            </div>
        </motion.div>
    );
}
