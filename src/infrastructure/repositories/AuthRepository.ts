import {
  User,
  getAuth,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseApp } from '@infrastructure/firebase/firebaseConfig';

const auth = getAuth(firebaseApp);

const login = async (email: string, password: string): Promise<User> => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

const register = async (email: string, password: string): Promise<User> => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(result.user);
  return result.user;
};

const logout = async (): Promise<void> => {
  await signOut(auth);
};

const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const AuthRepository = {
  login,
  logout,
  register,
  resetPassword,
  getCurrentUser,
};
