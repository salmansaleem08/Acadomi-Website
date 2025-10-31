// src/firebase/auth.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { auth } from './config';

export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Update user profile with name (optional, for display)
    await updateProfile(user, { displayName });
    return { success: true, user };
  } catch (error) {
    console.error('SignUp Error:', error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login Error:', error.code, error.message);
    return { success: false, error: error.message };
  }
};