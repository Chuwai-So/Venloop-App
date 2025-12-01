import { db } from './firebase';
import { ref, set } from 'firebase/database';

function writeTeamData(teamId, name, score) {
    set(ref(db, 'teams/' + teamId), {
        name: name,
        score: score
    });
}