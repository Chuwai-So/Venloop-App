"use client";

import { useRouter } from "next/navigation";
import Icon from "@/app/components/Icon";

export default function BackButton({ to }) {
    const router = useRouter();
    return (
        <button
            onClick={() => (to ? router.push(to) : router.back())}
            className="text-white hover:text-blue-300 font-medium"
        >
            <Icon name={"arrow-left-circle-white"}/>
        </button>
    );
}