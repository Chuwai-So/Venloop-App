'use client';
import { useEffect, useState } from 'react';

export default function TaskFeatureChoice({ value = [], onChange, readOnly = false }) {
    const [options, setOptions] = useState(value);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        if (!readOnly && onChange) {
            onChange(options, selectedAnswer !== null ? options[selectedAnswer] : null);
        }
    }, [options, selectedAnswer]);

    const updateOption = (index, newVal) => {
        const updated = [...options];
        updated[index] = newVal;
        setOptions(updated);
        if (selectedAnswer === index && onChange) {
            onChange(updated, newVal);
        }
    };

    const addOption = () => setOptions((prev) => [...prev, '']);
    const removeOption = (index) => {
        const updated = options.filter((_, i) => i !== index);
        setOptions(updated);
        if (selectedAnswer === index) setSelectedAnswer(null);
        else if (selectedAnswer > index) setSelectedAnswer((prev) => prev - 1);
    };

    return (
        <div className="space-y-2 text-sm w-full">
            <p className="text-center font-semibold">Multiple Choice</p>
            {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="correctAnswer"
                        checked={selectedAnswer === index}
                        onChange={() => setSelectedAnswer(index)}
                        disabled={readOnly}
                        className="accent-[#3CA9E2] w-4 h-4"
                    />
                    <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="p-1 border rounded text-sm w-full"
                        disabled={readOnly}
                    />
                    {!readOnly && (
                        <button
                            className="text-red-500 font-bold text-lg"
                            onClick={() => removeOption(index)}
                        >
                            ✕
                        </button>
                    )}
                </div>
            ))}
            {!readOnly && (
                <button
                    className="w-full bg-[#3CA9E2] text-white py-1 rounded text-sm font-medium"
                    onClick={addOption}
                >
                    + Add Option
                </button>
            )}
        </div>
    );
}
