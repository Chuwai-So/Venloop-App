"use client";
import { useState, useEffect } from "react";

export default function TaskFeatureChoiceDisplay({ value = [], selected, onSelect }) {
    const [selectedChoice, setSelectedChoice] = useState(selected || "");

    useEffect(() => {
        if (onSelect) {
            onSelect(selectedChoice);
        }
    }, [selectedChoice]);

    return (
        <div className="space-y-2 text-sm w-full text-black">
            <p className="text-center font-semibold">Select Your Answer</p>
            {value.map((opt, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="selectedChoice"
                        checked={selectedChoice === opt}
                        onChange={() => setSelectedChoice(opt)}
                        className="accent-[#3CA9E2] w-4 h-4"
                    />
                    <label className="text-sm">{opt}</label>
                </div>
            ))}
        </div>
    );
}
