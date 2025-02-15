import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { AuthRepository } from "@/domain/repository/auth-firebase.repository";
import User from "@/domain/entities/User";

export class FirebaseAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return new User(userCredential.user.uid, userCredential.user.email!, "");
  }

  async register(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return new User(userCredential.user.uid, userCredential.user.email!, "");
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }
}
