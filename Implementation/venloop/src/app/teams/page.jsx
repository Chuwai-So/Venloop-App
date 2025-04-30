import { Suspense } from 'react';
import TeamDetail from "@/app/teams/TeamDetail";


export default function PageWrapper() {
    return (
        <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
            <TeamDetail />
        </Suspense>
    );
}