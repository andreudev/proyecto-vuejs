import type { AuthRepository } from "@/domain/repository/auth-firebase.repository";
import { FirebaseAuthRepository } from "../datasources/auth.firebase.datasource";
import User from "@/domain/entities/User";

export class AuthRepositoryImpl implements AuthRepository {
  private readonly authRepository: FirebaseAuthRepository;

  constructor() {
    this.authRepository = new FirebaseAuthRepository();
  }

  async login(email: string, password: string): Promise<User> {
    return this.authRepository.login(email, password);
  }

  async register(email: string, password: string): Promise<User> {
    return this.authRepository.register(email, password);
  }

  async logout(): Promise<void> {
    return this.authRepository.logout();
  }
}
