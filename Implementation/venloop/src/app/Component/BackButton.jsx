"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BackButton({ to }) {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(to)}
            className="text-white hover:text-blue-300 font-medium"
        >
            &#8592; Back
        </button>
    );
}