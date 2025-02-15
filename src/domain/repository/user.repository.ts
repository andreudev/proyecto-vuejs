import User from "../entities/User";

export interface UserRepository {
  saveUser(user: User): Promise<void>;
}
