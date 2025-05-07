import { Suspense } from 'react';
import TeamDetail from './TeamDetail';

export default function TeamDetailPageWrapper() {
    return (
        <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <TeamDetail />
        </Suspense>
    );
}