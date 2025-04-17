"use client";

import {useState} from "react";
import NavBar from "@/app/Component/NavBar";
import TeamBar from "@/app/Component/TeamBar";
import GridButtons from "@/app/Component/GridButtons";

export default function TeamMenu() {
    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            <NavBar backTo={"/admin-landing"}/>
            <ol>
                <TeamBar />
            </ol>
        </div>
    )
}