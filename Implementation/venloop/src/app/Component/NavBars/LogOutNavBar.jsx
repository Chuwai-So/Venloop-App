"use client"

import {useRouter} from "next/navigation";
import {doSignOut} from "@/app/auth";
import AccountDropdown from "@/app/Component/AccountDropdown";

export default function LogOutNavBar() {
    const router = useRouter();

    const handleSignOut = async () => {
        await doSignOut();
        router.push("/admin-login");
    }

    return (
        <header className="bg-[#1F2A60] shadow-md px-6 py-4 flex justify-between items-center z-30 relative">
            <button onClick={() => handleSignOut()}
                    className="text-white hover:text-blue-300 font-medium">
                Sign Out
            </button>
            <img src="/Avond4daagse_diapositief.png" alt="Logo" className="h-7"/>
            <AccountDropdown/>
        </header>
    );
}
