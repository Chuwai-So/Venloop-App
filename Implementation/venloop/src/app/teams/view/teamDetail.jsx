'use client';
import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useState } from "react";
import TeamService from "@/app/TeamService/teamService";
import { useSearchParams } from "next/navigation";
import CleanNavBar from "@/app/Component/NavBars/CleanNavBar";
import QRScannerButton from "@/app/Component/Scanner";
import { generateTeamToken } from "@/app/util/teamToken";


export default function TeamDetail() {
    const colors = {
        blue: '#61C3E6',
        orange: '#E64B27',
        yellow: '#FFD700',
        white: '#FFFFFF',
        black: '#000000',
    };
    console.log("Should have a team id")
    // const startScan = () => {
    //     const qrRegionId = "qr-reader";
    //     const html5QrCode = new Html5Qrcode(qrRegionId);
    //
    //     Html5Qrcode.getCameras().then(devices => {
    //         if (devices && devices.length) {
    //             const cameraId = devices[0].id;
    //             html5QrCode.start(
    //                 cameraId,
    //                 {
    //                     fps: 10,
    //                     qrbox: { width: 250, height: 250 }
    //                 },
    //                 (decodedText) => {
    //                     alert(`Scanned: ${decodedText}`);
    //                     html5QrCode.stop();
    //                 },
    //                 (errorMessage) => {
    //                     console.warn(errorMessage);
    //                 }
    //             );
    //         }
    //     }).catch(err => {
    //         console.error("Camera error: ", err);
    //     });
    // };

    const searchParams = useSearchParams();
    const teamId = searchParams.get("id");
    console.log(`Here is the id: ${teamId}`)
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const localToken = localStorage.getItem("teamAccessToken");
        if (!localToken && teamId) {
            console.log("⏳ No token found, issuing new one for:", teamId);
            generateTeamToken(teamId).then((token) => {
                localStorage.setItem("teamAccessToken", token);
                console.log("✅ Token saved to localStorage:", token);
            });
        } else {
            console.log("Token already exists:", localToken);
        }
    }, [teamId]);

    useEffect(() => {
        const fetchTeam = async () => {
            const data = await TeamService.getTeam(teamId);
            setTeam(data);
        };

        if (teamId) fetchTeam();
    }, [teamId]);

    if (!team) {
        return <div className="text-center p-6">Loading team...</div>;
    }

    return (
        <div style={{ backgroundColor: colors.blue, color: colors.white }} className="min-h-screen">
            <div className="w-full sticky top-0 z-50">
                <CleanNavBar />
            </div>

            <main className="p-4 flex flex-col gap-6">
                <header className="text-center border-b border-white pb-2">
                    <h1 className="text-5xl font-bold pb-2">{team.name}</h1>

                </header>

                <section style={{backgroundColor: colors.white, color: colors.black}} className="rounded-lg p-4 shadow">
                    <h2 style={{color: colors.orange}} className="text-lg font-semibold mb-2">Captain</h2>
                    <p>{team.captain || "Not assigned yet"}</p>
                </section>

                <section style={{backgroundColor: colors.white, color: colors.black}} className="rounded-lg p-4 shadow">
                    <h2
                        style={{color: colors.orange}}
                        className="text-lg font-semibold mb-4"
                    >
                        Completed Tasks
                    </h2>

                    {team.completedTasks && Object.keys(team.completedTasks).length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {Object.entries(team.completedTasks).map(([taskId, task]) => {
                                const borderColor =
                                    task.result === "correct"
                                        ? "border-l-green-500"
                                        : task.result === "incorrect"
                                            ? "border-l-red-500"
                                            : "border-l-gray-300"; // fallback for null or pending

                                return (
                                    <div
                                        key={taskId}
                                        className={`border border-gray-300 border-l-8 rounded-lg p-3 shadow-sm bg-gray-50 ${borderColor}`}
                                    >
                                        <h3 className="font-semibold text-base mb-1">
                                            {task.name || taskId}
                                        </h3>

                                        {task.status === 'pending' && task.picture ? (
                                            <div className="mt-2">
                                                <img
                                                    src={task.picture}
                                                    alt="Submitted task image"
                                                    className="w-full max-w-xs rounded shadow"
                                                />
                                                <p className="text-sm text-gray-600 mt-1">Status: Pending</p>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-sm text-gray-700">
                                                    Your answer: {task.userAnswer || "Completed"}
                                                </p>
                                                {task.result && (
                                                    <p className="text-sm text-gray-700">
                                                        Result: {task.result}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center mt-4">No tasks completed yet.</p>
                    )}
                </section>
                <div
                    className="sticky bottom-0 left-0 w-full bg-blue-500 text-white text-center py-4 z-10 shadow-inner">
                    <h3 className="text-lg font-semibold">
                        Use your camera to scan the task QR code
                    </h3>
                </div>
            </main>
        </div>
    );
}