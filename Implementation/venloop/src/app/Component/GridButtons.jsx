"use client";

export default function GridButtons() {
    return (
        <main className="p-8 grid grid-cols-10 grid-rows-2 gap-6 h-[calc(100vh-72px)] font-[Nunito black] font-black">

            {/* Top-left (70%) */}
            <button className="bg-[#3C8DC3] text-white rounded-lg p-6 col-span-7 row-start-1 flex items-center justify-center text-xl">
                Tasks
            </button>

            {/* Top-right (30%) */}
            <button className="bg-[#D86F27] text-white rounded-lg p-4 col-span-3 row-start-1 flex items-center justify-center text-lg">
                Event Settings️
            </button>

            {/* Bottom-left (30%) */}
            <button className="bg-[#D86F27] text-white rounded-lg p-4 col-span-3 row-start-2 flex items-center justify-center text-lg">
                Leaderboard
            </button>

            {/* Bottom-right (70%) */}
            <button className="bg-[#3C8DC3] text-white rounded-lg p-6 col-span-7 row-start-2 flex items-center justify-center text-xl">
                Teams
            </button>

        </main>
    );
}
