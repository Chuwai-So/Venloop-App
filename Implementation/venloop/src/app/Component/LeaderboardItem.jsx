'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function LeaderboardItem({ team, score, rank, movement }) {
    const controls = useAnimation();

    useEffect(() => {
        if (movement === 'same') {
            controls.start({ y: 0, backgroundColor: '#ffffff' });
            return;
        }

        const color = movement === 'up' ? '#D1FAE5' : '#FECACA';
        const yValue = movement === 'up' ? -10 : 10;

        controls.start({
            y: yValue,
            backgroundColor: [color, '#ffffff'],
            transition: {
                y: { type: 'spring', stiffness: 300, damping: 25 },
                backgroundColor: { duration: 1 },
            },
        });

        if (movement === 'up') {
            confetti({
                particleCount: 40,
                spread: 80,
                origin: { y: 0.3 },
                colors: ['#00b894', '#55efc4'],
            });
        }
    }, [movement, controls]);

    const medals = ['🥇', '🥈', '🥉'];

    return (
        <motion.div
            layout
            animate={controls}
            initial={{ backgroundColor: '#ffffff' }}
            className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm"
        >
            <div className="flex items-center gap-3 text-gray-800 font-medium">
                <span className="w-6 text-right text-gray-500">{rank + 1}.</span>
                <span>{team} - {score}</span>
            </div>
            {rank < 3 && <span className="text-2xl">{medals[rank]}</span>}
        </motion.div>
    );
}
