"use client";

import { useState } from 'react';
import NavBar from "@/app/Component/NavBar";
import GridButtons from "@/app/Component/GridButtons";
import Link from 'next/link';


export default function AdminLandingPage() {
    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            <NavBar/>
            <GridButtons/>
        </div>
    );
}
