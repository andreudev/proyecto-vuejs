import { FirestoreUserRepository } from "../datasources/firestore.user.datasource";
import type { UserRepository } from "@/domain/repository/user.repository";
import User from "@/domain/entities/User";

export class UserRepositoryImpl implements UserRepository {
  private readonly userRepository: FirestoreUserRepository;

  constructor() {
    this.userRepository = new FirestoreUserRepository();
  }

  async saveUser(user: User): Promise<void> {
    return this.userRepository.saveUser(user);
  }
}
