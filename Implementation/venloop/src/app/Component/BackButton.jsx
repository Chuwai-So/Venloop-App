"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ to }) {
    const router = useRouter();
    return (
        <button
            onClick={() => (to ? router.push(to) : router.back())}
            className="text-white hover:text-blue-300 font-medium"
        >
            &#8592; Back
        </button>
    );
}