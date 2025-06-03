import { useEffect, useState } from 'react';

function AnalogCountdownClock({ timeLeft }) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const minuteAngle = (minutes % 60) * 6;
    const secondAngle = seconds * 6;

    return (
        <div className="flex flex-col items-center text-black">
            <svg viewBox="0 0 100 100" className="w-[80px] h-[80px]">
                <circle cx="50" cy="50" r="48" stroke="black" strokeWidth="2" fill="black" />
                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const x1 = 50 + 40 * Math.cos(angle);
                    const y1 = 50 + 40 * Math.sin(angle);
                    const x2 = 50 + 45 * Math.cos(angle);
                    const y2 = 50 + 45 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2" />;
                })}
                <line x1="50" y1="50" x2={50 + 25 * Math.cos((minuteAngle - 90) * (Math.PI / 180))} y2={50 + 25 * Math.sin((minuteAngle - 90) * (Math.PI / 180))} stroke="white" strokeWidth="3" />
                <line x1="50" y1="50" x2={50 + 35 * Math.cos((secondAngle - 90) * (Math.PI / 180))} y2={50 + 35 * Math.sin((secondAngle - 90) * (Math.PI / 180))} stroke="red" strokeWidth="2" />
                <circle cx="50" cy="50" r="2" fill="white" />
            </svg>

            <div className="text-sm font-mono mt-1 text-black">
                {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
        </div>
    );
}

export default function TaskFeatureTimer({ value, onChange }) {
    const [running, setRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(parseInt(value));

    useEffect(() => {
        setTimeLeft(parseInt(value));
    }, [value]);

    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [running]);

    const startCountdown = () => {
        setTimeLeft(parseInt(value));
        setRunning(true);
    };

    const stopCountdown = () => {
        setRunning(false);
    };

    const resetCountdown = () => {
        setRunning(false);
        setTimeLeft(parseInt(value));
    };

    return (
        <div className="flex flex-col items-center w-full text-black">
            {!running && (
                <input
                    type="number"
                    placeholder="Seconds"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-20 text-center p-1 border rounded mb-2 text-black"
                />
            )}

            <AnalogCountdownClock timeLeft={timeLeft} />

            <div className="flex gap-2 mt-2">
                {!running ? (
                    <button
                        onClick={startCountdown}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                    >
                        Start
                    </button>
                ) : (
                    <button
                        onClick={stopCountdown}
                        className="bg-yellow-400 text-black text-xs px-2 py-1 rounded"
                    >
                        Stop
                    </button>
                )}
                <button
                    onClick={resetCountdown}
                    className="bg-gray-300 text-black text-xs px-2 py-1 rounded"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
