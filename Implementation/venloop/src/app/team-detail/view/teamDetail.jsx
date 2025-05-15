'use client';

import { Html5Qrcode } from 'html5-qrcode';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TeamService from "@/app/service/TeamService/teamService";
import { useSearchParams, useRouter } from "next/navigation";
import CleanNavBar from "@/app/components/NavBars/CleanNavBar";
import { generateTeamToken } from "@/app/util/teamToken";
import { db } from "@/app/firebase";
import { ref, get, update } from 'firebase/database';
import FeedbackPopup from "@/app/components/FeedbackPopup"; // Adjust path if needed

export default function TeamDetail() {
    const colors = {
        blue: '#61C3E6',
        orange: '#E64B27',
        yellow: '#FFD700',
        white: '#FFFFFF',
        black: '#000000',
    };

    const searchParams = useSearchParams();
    const teamId = searchParams.get("id");
    const [team, setTeam] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const FAQSection = dynamic(() => import('@/app/FAQ/FAQSection'), { ssr: false });
    const [showFAQ, setShowFAQ] = useState(false);

    useEffect(() => {
        if (!teamId) return;

        (async () => {
            const existingToken = localStorage.getItem("teamAccessToken");

            if (existingToken) {
                try {
                    const snapshot = await get(ref(db, `teamTokens/${existingToken}`));
                    const tokenData = snapshot.val();

                    if (tokenData?.teamId === teamId) {
                        console.log("✅ Valid token found:", existingToken);
                        return;
                    } else {
                        console.warn("⚠️ Token mismatch. Reissuing...");
                    }
                } catch (err) {
                    console.error("❌ Error verifying token:", err);
                }
            }

            const newToken = await generateTeamToken(teamId);
            localStorage.setItem("teamAccessToken", newToken);
            console.log("✅ New token saved:", newToken);
        })();
    }, [teamId]);

    useEffect(() => {
        const fetchTeam = async () => {
            const data = await TeamService.getTeam(teamId);
            setTeam(data);
        };

        if (teamId) fetchTeam();
    }, [teamId]);

    useEffect(() => {
        if (team?.completedTasks) {
            const completedCount = Object.keys(team.completedTasks).length;
            if (completedCount === 4 && !showPopup) {
                setShowPopup(true);
            }
        }
    }, [team]);

    const handleLeaveTeam = async () => {
        const confirmed = confirm("Are you sure you want to leave this team?");
        if (!confirmed) return;

        try {
            await update(ref(db, `teams/${teamId}`), {
                occupied: false,
                captain: null
            });

            localStorage.removeItem("teamAccessToken");
            alert("You have left the team.");
            router.push("/team-join/view");
        } catch (err) {
            console.error("Failed to leave team:", err);
            alert("Error leaving the team. Please try again.");
        }
    };

    if (!team) {
        return <div className="text-center p-6">Loading team...</div>;
    }

    return (
        <div style={{ backgroundColor: colors.blue, color: colors.white }} className="min-h-screen">
            <div className="w-full sticky top-0 z-50">
                <CleanNavBar />
            </div>

            <main className="p-4 flex flex-col gap-6 pb-20">
                <header className="text-center border-b border-white pb-2">
                    <h1 className="text-5xl font-bold pb-2 break-words max-w-full overflow-wrap break-all">
                        {team.name}
                    </h1>
                </header>

                <section style={{ backgroundColor: colors.white, color: colors.black }} className="rounded-lg p-4 shadow">
                    <h2 style={{ color: colors.orange }} className="text-lg font-semibold mb-4">Voltooide taken</h2>

                    {team.completedTasks && Object.keys(team.completedTasks).length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {Object.entries(team.completedTasks).map(([taskId, task]) => {
                                const borderColor =
                                    task.result === "correct" || task.status === "approved"
                                        ? "border-l-green-500"
                                        : task.result === "incorrect"
                                            ? "border-l-red-500"
                                            : "border-l-gray-300";

                                return (
                                    <div
                                        key={taskId}
                                        className={`border border-gray-300 border-l-8 rounded-lg p-3 shadow-sm bg-gray-50 ${borderColor}`}
                                    >
                                        <h3 className="font-semibold text-base mb-1">
                                            {task.name || taskId}
                                        </h3>

                                        {task.picture ? (
                                            <div className="mt-2">
                                                <img
                                                    src={task.picture}
                                                    alt="Submitted task image"
                                                    className="w-full max-w-xs rounded shadow"
                                                />
                                                <p className="text-sm text-gray-600 mt-1">Status: {task.status}</p>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-sm text-gray-700">
                                                    Uw antwoord: {task.userAnswer || "Completed"}
                                                </p>
                                                {task.result && (
                                                    <p className="text-sm text-gray-700">
                                                        Resultaat: {task.result}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center mt-4">Nog geen taken voltooid</p>
                    )}
                </section>

                <button
                    onClick={handleLeaveTeam}
                    className="mt-4 bg-red-500 text-white font-semibold px-4 py-2 rounded shadow hover:bg-red-700 transition w-full max-w-xs mx-auto"
                >
                    Team verlaten
                </button>
                <button
                    onClick={() => setShowFAQ(!showFAQ)}
                    className="w-full max-w-xs mx-auto bg-orange-500 text-white font-semibold px-4 py-2 rounded shadow hover:bg-orange-600 transition"
                >
                    {showFAQ ? "Verberg Veelgestelde Vragen" : "Bekijk Veelgestelde Vragen"}
                </button>

                {showFAQ && <FAQSection />}
            </main>

            {showPopup && <FeedbackPopup onClose={() => setShowPopup(false)} />}

            <footer className="fixed bottom-0 left-0 w-full bg-blue-500 text-white text-center py-2 z-10 shadow-inner">
                <h3 className="text-sm font-medium">
                    Gebruik je camera om de QR-code van de taak te scannen
                </h3>
            </footer>
        </div>
    );
}
