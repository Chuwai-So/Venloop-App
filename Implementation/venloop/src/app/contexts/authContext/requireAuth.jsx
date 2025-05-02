import {getAuth} from "firebase/auth";

export function requireAuth() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");
    return user;
}