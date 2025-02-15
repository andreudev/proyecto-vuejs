import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import User from "@/domain/entities/User";
import type { UserRepository } from "@/domain/repository/user.repository";

export class FirestoreUserRepository implements UserRepository {
  async saveUser(user: User): Promise<void> {
    await setDoc(doc(db, "users", user.id), {
      email: user.email,
      name: user.name,
    });
  }
}
