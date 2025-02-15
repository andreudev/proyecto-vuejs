import { defineStore } from "pinia";
import { auth } from "@/infrastructure/firebase/firebaseConfig";
import User from "@/domain/entities/User";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    initializeAuthListener() {
      auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          this.user = new User(firebaseUser.uid, firebaseUser.email!, "");
        } else {
          this.user = null;
        }
      });
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
