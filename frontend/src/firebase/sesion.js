import { auth, db, storage } from '@/firebase/init';
import { User } from '@/firebase/userServices';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';
import { ProductList } from './env_variables';




export class Sesion{
  static active = ref(false);
}

onAuthStateChanged(auth, async (u) => {
  if (u){
    await User.getUser(u.uid);
    Sesion.active.value = true;
  }
});


function getUserUUID() {
    const user = auth.currentUser;
    return user !== null && user !== undefined ? user.uid : "";
}

function getUserMail(){
    const user = auth.currentUser;
    return user?.email ?? "";
 }

 function getUserName() {
    const user = auth.currentUser;
    return user?.displayName ?? "";
 }


async function logInWithGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        new User(result.user.uid);
        Sesion.active.value = true;
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
    });
}

async function logOut() {
    return auth
      .signOut()
      .then(() => {
        User.uuid = "";
        User.nom = "";
        User.mail = "";
        User.favorites = [];
        Sesion.active.value = false;
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }

 async function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      User.getUser(user.uid);
      Sesion.active.value = true;

    })
    .catch((error) => {
      console.error(error);
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
    });
}

async function signUp(email, password, username){
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        new User(user.uid, true, username);
        Sesion.active.value = true;
      })
      .catch((error) => {
        throw new Error('Unable to create account');
      });
  }

  import { fetchSignInMethodsForEmail } from 'firebase/auth';



  async function isEmailRegistered(email) {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length > 0;
    } catch (error) {
      return false;
    }
  }

  async function checkEmail() {
    const registered = await isEmailRegistered(email.value);
    if (registered) {
      console.log('Email is registered');
    } else {
      console.log('Email is not registered');
    }
  }



 export { getUserUUID, getUserMail, getUserName, logInWithGoogle, logOut, logIn, signUp, isEmailRegistered};
