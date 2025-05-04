import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "@/firebase/init.js"

const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;  // Return true on successful sign-in
  } catch (error) {
    console.error('Error signing in:', error.code);
    switch(error.code){
      case "auth/invalid-email":
        errMsg.value = "Invalid Email";
        break;
      case "auth/user-not-found":
        errMsg.value = "No account found with that email";
        break;
      case "auth/wrong-password":
        errMsg.value = "Incorrect Password";
        break;
      default:
        errMsg.value = "Email or password was incorrect";
        break;
    }
    return error.code;  // Return the error code on failure
  }
}

export default signIn;
