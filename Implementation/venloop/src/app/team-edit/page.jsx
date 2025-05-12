'use client';

import { useEffect, useState } from 'react';
import TeamService from '@/app/service/TeamService/teamService';
import NavBar from '@/app/components/NavBars/NavBar';
import TeamBar from '@/app/components/ContentBars/TeamBar';
import ProtectedRoute from '@/app/ProtectedRoute';
import QRCodeWithDownload from '@/app/components/QR/DownloadableQR';
import qrUrls from '@/app/util/qrUrls';

export default function TeamMenu() {
    const [teams, setTeams] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [showQR, setShowQR] = useState(false);

    const fetchTeams = () => {
        TeamService.getAllTeams()
            .then(data => {
                if (Array.isArray(data)) {
                    setTeams(data);
                } else {
                    setTeams([]);
                }
            })
            .catch(err => {
                console.error("Error loading team-detail:", err);
                setTeams([]);
            });
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 relative overflow-hidden">
                <NavBar backTo={"/admin-landing"} />

                <div className="p-4 pb-32">
                    {teams.map((team) => (
                        <TeamBar
                            key={team.id}
                            team={team}
                            isExpanded={expanded === team.id}
                            onToggle={() => setExpanded(expanded === team.id ? null : team.id)}
                            refreshTeams={fetchTeams}
                        />
                    ))}
                </div>

                <div className="fixed bottom-0 left-0 w-full bg-white shadow-inner border-t p-4 z-50">
                    {!showQR ? (
                        <div className="flex justify-center">
                            <button
                                onClick={() => setShowQR(true)}
                                className="bg-[#3C8DC3] text-white px-6 py-2 rounded shadow hover:bg-[#1F2A60] transition"
                            >
                                Universal QR Code
                            </button>
                        </div>
                    ) : (
                        <div className="relative flex flex-col items-center">
                            <button
                                onClick={() => setShowQR(false)}
                                className="absolute top-0 right-0 text-sm text-black hover:underline flex items-center gap-1"
                            >
                                <span className="text-xl text-black">▲</span> Hide
                            </button>
                            <QRCodeWithDownload
                                id="universal-team-join"
                                url={qrUrls.teamJoin()}
                            />
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
