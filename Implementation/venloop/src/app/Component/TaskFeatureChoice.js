'use client';
import { useState, useEffect } from 'react';

export default function TaskFeatureChoice({ value = [], onChange }) {
    const [options, setOptions] = useState(value);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        onChange(options, selectedAnswer !== null ? options[selectedAnswer] : null);
    }, [options, selectedAnswer]);

    const updateOption = (index, newVal) => {
        const updated = [...options];
        updated[index] = newVal;
        setOptions(updated);
        if (selectedAnswer === index) {
            onChange(updated, newVal); // Update answer as well
        }
    };

    const addOption = () => {
        const updated = [...options, ""];
        setOptions(updated);
    };

    const removeOption = (index) => {
        const updated = options.filter((_, i) => i !== index);
        setOptions(updated);
        if (selectedAnswer === index) {
            setSelectedAnswer(null); // reset if selected was deleted
        } else if (selectedAnswer > index) {
            setSelectedAnswer((prev) => prev - 1); // shift index
        }
    };

    return (
        <div className="space-y-3">
            <p className="text-center font-semibold text-sm">Multiple Choice Options</p>
            {options.map((opt, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 p-1 border rounded"
                    />
                    <input
                        type="radio"
                        name="correctAnswer"
                        checked={selectedAnswer === index}
                        onChange={() => setSelectedAnswer(index)}
                    />
                    <span className="text-xs">Correct</span>
                    <button
                        className="text-red-500 font-bold"
                        onClick={() => removeOption(index)}
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button className="text-blue-500 text-sm" onClick={addOption}>
                + Add Option
            </button>
        </div>
    );
}
