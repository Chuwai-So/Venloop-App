import { ref, set } from "firebase/database"
import { db } from "@/app/firebase"

export function generateToken() {
    const token = crypto.randomUUID();
    console.log("Generated Token:", token);
    return token

}

export async function generateTeamToken(teamId) {
    const token = generateToken();
    const tokenRef = ref(db, `teamTokens/${token}`);
    const data = {
        teamId,
        createdAt: new Date().toISOString()
    };
    try {
        await set(tokenRef, data);
        console.log("Token successfully stored:", data);
    } catch (err) {
        console.error("❌ Error writing token to Firebase:", err);
    }
    return token;
}