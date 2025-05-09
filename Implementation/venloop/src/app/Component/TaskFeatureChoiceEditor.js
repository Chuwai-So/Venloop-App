"use client";
import { useEffect, useState } from "react";

export default function TaskFeatureChoiceEditor({ value = [], correctAnswer = "", onChange }) {
    const [options, setOptions] = useState(value);
    const [selectedCorrect, setSelectedCorrect] = useState(correctAnswer);

    useEffect(() => {
        if (onChange) {
            onChange(options, selectedCorrect);
        }
    }, [options, selectedCorrect]);

    const updateOption = (index, newVal) => {
        const updated = [...options];
        updated[index] = newVal;
        setOptions(updated);
        if (selectedCorrect === options[index]) {
            setSelectedCorrect(newVal); // Update correct answer string
        }
    };

    const addOption = () => setOptions(prev => [...prev, ""]);

    const removeOption = (index) => {
        const removed = options[index];
        const updated = options.filter((_, i) => i !== index);
        setOptions(updated);
        if (selectedCorrect === removed) {
            setSelectedCorrect(""); // Reset correct answer if deleted
        }
    };

    return (
        <div className="space-y-2 text-sm w-full text-black">
            <p className="text-center font-semibold">Define Multiple Choice Options</p>
            {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="correctAnswer"
                        checked={selectedCorrect === opt}
                        onChange={() => setSelectedCorrect(opt)}
                        className="accent-[#3CA9E2] w-4 h-4"
                    />
                    <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="p-1 border rounded text-sm w-full bg-white text-black"
                    />
                    <button
                        className="text-red-500 font-bold text-lg"
                        onClick={() => removeOption(index)}
                    >
                        ✕
                    </button>
                </div>
            ))}
            <button
                className="w-full bg-[#3CA9E2] text-white py-1 rounded text-sm font-medium"
                onClick={addOption}
            >
                + Add Option
            </button>
        </div>
    );
}
