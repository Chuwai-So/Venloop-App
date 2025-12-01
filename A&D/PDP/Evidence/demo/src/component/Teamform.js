import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, set } from 'firebase/database';

export default function TeamForm() {
    const [teamId, setTeamId] = useState('');
    const [teamName, setTeamName] = useState('');
    const [score, setScore] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Submitting to Firebase...');

        set(ref(db, 'teams/' + teamId), {
            name: teamName,
            score: Number(score),
        })
            .then(() => {
                console.log('✅ Team data saved!');
                alert('Team data saved!');
            })
            .catch((err) => {
                console.error('❌ Error writing to database:', err);
                alert('Error writing to Firebase. Check console.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Team ID"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
}