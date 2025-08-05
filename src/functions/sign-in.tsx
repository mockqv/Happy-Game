import { signInWithEmailAndPassword, UserCredential } from "@firebase/auth";
import { auth } from "../../database/firebase";

type User = {
    email: string;
    password: string;
};

export default function loginWithEmailAndPassword(user: User): Promise<UserCredential> | unknown {
    try {
        const response = signInWithEmailAndPassword(auth, user.email, user.password);
        return response;
    } catch (err) {
        return err;
    }
}