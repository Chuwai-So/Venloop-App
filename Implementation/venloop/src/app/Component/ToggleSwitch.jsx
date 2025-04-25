'use client';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ToggleSwitch({ value, onChange }) {
    const [isOn, setIsOn] = useState(value === 'day');
    const controls = useAnimation();

    const toggle = async () => {
        const newVal = isOn ? 'day' : 'week';
        setIsOn(!isOn);
        onChange(newVal);

        // Midpoint squish
        await controls.start({
            x: 40,
            scale: 0.85,
            transition: { duration: 0.15 },
        });

        // Final slide
        await controls.start({
            x: newVal === 'week' ? 60 : 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 600, damping: 30 },
        });
    };

    return (
        <div
            onClick={toggle}
            className="w-36 h-16 rounded-full bg-[#a6f6cf] border-2 border-white shadow-inner flex items-center justify-between px-4 relative cursor-pointer transition-all"
        >
            {/* OFF label */}
            <span
                className={`text-lg font-bold transition-colors ${
                    !isOn ? 'text-white' : 'text-[#1b4d3e]'
                }`}
            >
        Day
      </span>

            {/* Toggle knob */}
            <motion.div
                animate={controls}
                initial={{ x: 0 }}
                className="absolute w-12 h-12 rounded-full bg-[#1b4d3e] top-2 flex items-center justify-center"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOn ? 'minus' : 'plus'}
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#a6f6cf] text-2xl font-bold"
                    >
                        {isOn ? '-' : '+'}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* ON label */}
            <span
                className={`text-lg font-bold transition-colors ${
                    isOn ? 'text-white' : 'text-[#1b4d3e]'
                }`}
            >
        Week
      </span>
        </div>
    );
}

