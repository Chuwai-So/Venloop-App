'use client';

import {Html5Qrcode} from 'html5-qrcode';
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import TeamService from "@/app/service/TeamService/teamService";
import {useSearchParams, useRouter} from "next/navigation";
import CleanNavBar from "@/app/components/NavBars/CleanNavBar";
import {generateTeamToken} from "@/app/util/teamToken";
import {db} from "@/app/firebase";
import {ref, get, update} from 'firebase/database';
import FeedbackPopup from "@/app/components/FeedbackPopup";
import TokenService from "@/app/service/TokenService/tokenService"; // Adjust path if needed

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
    const FAQSection = dynamic(() => import('@/app/FAQ/FAQSection'), {ssr: false});
    const [showFAQ, setShowFAQ] = useState(false);

    useEffect(() => {
        if (!teamId) return;

        (async () => {
            const existingToken = localStorage.getItem("teamAccessToken");
            console.log("LOGhere is the accessToken:", existingToken);

            if (existingToken) {
                try {
                    const verifiedTeamId = await TeamService.verifyTokenAndGetTeamId(existingToken);
                    console.log("LOGteamId from token:", `"${verifiedTeamId}"`);
                    console.log("LOGteamId from URL:", `"${teamId}"`);

                    if (verifiedTeamId && verifiedTeamId.trim() === teamId.trim()) {
                        console.log("✅ Valid token and teamId match.");
                        return; // token is valid, nothing more to do
                    }

                    console.warn("⚠️ Token mismatch. Reissuing...");

                } catch (err) {
                    console.error("❌ Error verifying token:", err);
                    // falls through to token generation
                }
            }

            // Generate a new token if not found or invalid
            const newToken = await generateTeamToken(teamId);

            if (typeof newToken === 'string') {
                localStorage.setItem("teamAccessToken", newToken);
                console.log("✅ New token saved:", newToken);
            } else {
                console.error("❌ Failed to save token – invalid format:", newToken);
            }
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

            const existingToken = localStorage.getItem("teamAccessToken");
            await TokenService.deleteTeamToken(existingToken);
            localStorage.removeItem("teamAccessToken");
            alert("You have left the team.");
            const eventToken = await TokenService.getGlobalEventToken();
            router.push(`/team-join/view?event=${eventToken}`);
        } catch (err) {
            console.error("Failed to leave team:", err);
            alert("Error leaving the team. Please try again.");
        }
    };

    if (!team) {
        return <div className="text-center p-6">Loading team...</div>;
    }

    return (
        <div style={{backgroundColor: colors.blue, color: colors.white}} className="min-h-screen">
            <div className="w-full sticky top-0 z-50">
                <CleanNavBar/>
            </div>

            <main className="p-4 flex flex-col gap-6 pb-20">
                <header className="text-center border-b border-white pb-2">
                    <h1 className={`font-bold pb-2 max-w-full break-words ${
                        team.name.length > 20 ? "text-2xl" : "text-5xl"
                    }`}>
                        {team.name}
                    </h1>
                </header>

                <section style={{backgroundColor: colors.white, color: colors.black}} className="rounded-lg p-4 shadow">
                    <h2 style={{color: colors.orange}} className="text-lg font-semibold mb-4">Voltooide taken</h2>

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
                                        className={`border border-gray-300 border-l-8 rounded-lg p-3 shadow bg-gray-50 ${borderColor}`}
                                    >
                                        <h3 className="font-semibold text-base mb-1">
                                            {task.name || taskId}
                                        </h3>

                                        {task.picture ? (
                                            <div className="mt-2">
                                                <div className="flex justify-center items-center">
                                                    <img
                                                    src={task.picture}
                                                    alt="Submitted task image"
                                                    className="h-24 w-auto object-cove rounded shadow"
                                                />
                                                </div>

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

                <div className="flex justify-center items-center gap-4 mt-4 items-stretch">
                    <button
                        onClick={handleLeaveTeam}
                        className="w-40 bg-red-500 text-white font-semibold px-4 py-2 rounded shadow hover:bg-red-700 transition"
                    >
                        Team verlaten
                    </button>
                    <button
                        onClick={() => setShowFAQ(!showFAQ)}
                        className="w-40 bg-orange-500 text-white text-xs font-semibold px-2 py-2 rounded shadow hover:bg-orange-600 transition"
                    >
                        {showFAQ ? "Verberg Veelgestelde Vragen" : "Bekijk Veelgestelde Vragen"}
                    </button>
                </div>

                {showFAQ && <FAQSection/>}
            </main>

            {showPopup && <FeedbackPopup onClose={() => setShowPopup(false)}/>}

            <footer className="fixed bottom-0 left-0 w-full bg-blue-500 text-white text-center py-4 z-10 shadow-inner">
                <h3 className="text-xs font-medium">
                    Gebruik je camera om de QR-code van de taak te scannen
                </h3>
            </footer>
        </div>
    );
}