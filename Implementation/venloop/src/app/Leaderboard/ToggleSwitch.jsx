'use client';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ToggleSwitch({ value, onChange }) {
    const [isOn, setIsOn] = useState(value === 'completed');
    const controls = useAnimation();

    const toggle = async () => {
        const newVal = isOn ? 'correct' : 'completed';
        setIsOn(!isOn);
        onChange(newVal);

        await controls.start({
            x: 40,
            scale: 0.85,
            transition: { duration: 0.15 },
        });

        await controls.start({
            x: newVal === 'correct' ? 60 : 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 600, damping: 30 },
        });
    };

    return (
        <div
            onClick={toggle}
            className="w-35 h-16 rounded-full bg-[#003399] border-2 border-white shadow-inner flex items-center justify-between px-4 relative cursor-pointer transition-all"
        >
            <span
                className={`text-sm font-bold transition-colors ${
                    !isOn ? 'text-white' : 'text-[#3CA9E2]'
                }`}
            >
                Done
            </span>

            <motion.div
                animate={controls}
                initial={{ x: 0 }}
                className="absolute w-12 h-12 rounded-full bg-[#D86F27] top-2 flex items-center justify-center"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOn ? 'minus' : 'plus'}
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        className="text-white text-2xl font-bold"
                    >
                        {isOn ? '-' : '+'}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            <span
                className={`text-sm font-bold transition-colors ${
                    isOn ? 'text-white' : 'text-[#3CA9E2]'
                }`}
            >
                Right
            </span>
        </div>
    );
}
