'use client';

export default function AppLeaderboardWrapper({ children }) {
    return (
        <div className="bg-gradient-to-b from-[#3CA9E2] to-[#D86F27] min-h-screen flex justify-center items-start p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-4 space-y-4">
                <h1 className="text-center text-2xl font-bold text-black">Leaderboard</h1>
                {children}
            </div>
        </div>
    );
}
