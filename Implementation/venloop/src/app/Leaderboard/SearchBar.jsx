'use client';

export default function SearchBar({ value, onChange, compact = false }) {
    return (
        <div className={`flex items-center bg-gray-100 rounded-xl px-3 py-1 shadow-inner ${compact ? 'h-10' : 'py-2'} w-full`}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Zoek team..."
                className="w-full bg-transparent outline-none text-sm text-black"
            />
            <button className="text-[#3CA9E2] font-bold text-lg">🔍</button>
        </div>
    );
}
