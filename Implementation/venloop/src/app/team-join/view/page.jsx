'use client';

import { useEffect, useState } from 'react';
import TeamService from '@/app/service/TeamService/teamService';
import TeamJoinBar from '@/app/components/ContentBars/TeamJoinBar';
import CleanNavBar from "@/app/components/NavBars/CleanNavBar";
import {get, ref} from "firebase/database";
import {db} from "@/app/firebase";
import {TokenAdapter} from "@/app/service/TokenService/tokenAdapter";
import {router} from "next/client";
import qrUrls from "@/app/util/qrUrls";
import {useRouter} from "next/navigation";


export default function TeamJoinMenu() {
    const [teams, setTeams] = useState([]);
    const [showWarning, setShowWarning] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const checkTokenAndRedirect = async () => {
            try {
                const localToken = localStorage.getItem("teamAccessToken");
                if (localToken) {
                    const teamId = await TokenAdapter.getTeamId(localToken);
                    if (teamId) {
                        router.push(`/team-detail/view?id=${teamId}`);
                    }
                } }catch (err) {
                    console.error(err)
                }
            }



        checkTokenAndRedirect();
    }, [router]);


    const fetchTeams = async () => {
        try {
            const data = await TeamService.getAllTeams();
            if (Array.isArray(data)) {
                setTeams(data);
            } else {
                setTeams([]);
            }
        } catch (err) {
            console.error('Error loading teams:', err);
            setTeams([]);
        }
    };

    useEffect(() => {
        fetchTeams();
        if (typeof window !== 'undefined') {
            setUserToken(localStorage.getItem("teamAccessToken"));
        }
    }, []);

    const occupiedCount = teams.filter(t => t.occupied).length;

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            <CleanNavBar/>
            {showWarning && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center space-y-4">
                        <h2 className="text-lg font-semibold text-[#1F2A60]">Let op!</h2>
                        <p className="text-sm text-gray-700">
                            Gebruik deze pagina niet in privé- of incognitomodus. Als je dat hebt gedaan, kopieer dan de link en open deze in een normale browsermodus.
                        </p>
                        <button
                            onClick={() => setShowWarning(false)}
                            className="mt-4 bg-[#1F2A60] text-white px-4 py-2 rounded hover:bg-[#324285]"
                        >
                            Ik begrijp het
                        </button>
                    </div>
                </div>
            )}


            <div className="p-4">
                <h1 className="text-xl font-semibold text-center text-[#1F2A60] mb-4">
                    {occupiedCount}/{teams.length} Teams zijn bezet
                </h1>
                {teams.map((team) =>
                    team && team.id ? <TeamJoinBar key={team.id} team={team}/> : null
                )}
            </div>

            <footer
                className="fixed bottom-0 left-0 w-full bg-[#D6C8F3] text-[#4B0082] py-3 shadow-inner flex justify-center items-center gap-3 z-50">
                <img src="/fontys-logo.png" alt="Fontys Logo" className="h-6"/>
                <span className="text-sm font-light">Ontwikkeld door Fontys</span>
            </footer>
        </div>
    );
}
