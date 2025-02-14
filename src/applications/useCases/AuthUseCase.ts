import type { AuthRepository } from "@/domain/repository/auth-firebase.repository";
import type { UserRepository } from "@/domain/repository/user.repository";
import User from "@/domain/entities/User";

export class AuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {}

  async login(email: string, password: string): Promise<User> {
    const user = await this.authRepository.login(email, password);
    await this.userRepository.saveUser(user);
    return user;
  }

  async register(email: string, password: string): Promise<User> {
    const user = await this.authRepository.register(email, password);
    await this.userRepository.saveUser(user);
    return user;
  }

  async logout(): Promise<void> {
    return this.authRepository.logout();
  }
}
