"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function GridButtons() {
    const [openMenu, setOpenMenu] = useState(null); // 'tasks' | 'teams' | null

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const closeMenu = () => {
        setOpenMenu(null);
    };

    const router = useRouter();

    return (
        <main className="p-8 grid grid-cols-10 grid-rows-2 gap-6 h-[calc(100vh-72px)] font-black">

            {/* Top-left (70%) - TASKS */}
            <div className="col-span-7 row-start-1">
                {openMenu === "tasks" ? (
                    <div
                        className="bg-white border rounded-lg p-6 h-full flex flex-col justify-center items-center gap-4"
                        onClick={closeMenu}
                    >
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col gap-4">
                            <button
                                className="bg-[#3C8DC3] text-white rounded px-4 py-2 w-full"
                                onClick={() => (router.push("/task-creation"))}>
                                Create Task
                            </button>
                            <button className="bg-[#3C8DC3] text-white rounded px-4 py-2 w-full"
                                    onClick={() => (router.push("/admin/tasks"))}>
                                Edit Tasks
                            </button>
                            <button className="bg-[#3C8DC3] text-white rounded px-4 py-2 w-full"
                                    onClick={() => (router.push("/task-pending"))}>
                                Submissions
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => toggleMenu("tasks")}
                        className="bg-[#3C8DC3] text-white rounded-lg p-6 w-full h-full flex items-center justify-center text-xl hover:scale-102 cursor-pointer"
                    >
                        Tasks
                    </button>
                )}
            </div>

            {/* Top-right (30%) - STATIC */}
            <button
                className="bg-[#D86F27] text-white rounded-lg p-4 col-span-3 row-start-1 flex items-center justify-center text-lg hover:scale-102 cursor-pointer">
                Event Settings️
            </button>

            {/* Bottom-left (30%) - STATIC */}
            <button
                className="bg-[#D86F27] text-white rounded-lg p-4 col-span-3 row-start-2 flex items-center justify-center text-lg hover:scale-102 cursor-pointer">
                Leaderboard
            </button>

            {/* Bottom-right (70%) - TEAMS */}
            <div className="col-span-7 row-start-2">
                {openMenu === "teams" ? (
                    <div
                        className="bg-white border rounded-lg p-6 h-full flex flex-col justify-center items-center gap-4"
                        onClick={closeMenu}
                    >
                        <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col gap-4">
                            <button
                                className="bg-[#3C8DC3] text-white rounded px-4 py-2 w-full"
                                onClick={() => (router.push("/team-creation"))}>
                                Create Team
                            </button>
                            <button
                                className="bg-[#3C8DC3] text-white rounded px-4 py-2 w-full"
                                onClick={() => (router.push("/team-edit"))}>
                                Team Menu
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => toggleMenu("teams")}
                        className="bg-[#3C8DC3] text-white rounded-lg p-6 w-full h-full flex items-center justify-center text-xl hover:scale-102 cursor-pointer"
                    >
                        Teams
                    </button>
                )}
            </div>
        </main>
    );
}
