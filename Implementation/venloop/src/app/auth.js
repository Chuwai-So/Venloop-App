import {auth} from "@/app/firebase";
import AdminService from "@/app/AdminService/adminService";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword} from "firebase/auth"

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;

    const admin = await AdminService.getAdminByFirebaseUid(user.uid);

    if (!admin || !admin.verified) {
        await doSignOut()
        alert("Your account has not been verified yet. Please try again later.");
        throw new Error("Your account has not been verified yet. Please try again later.");
    }
    return user;
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
}