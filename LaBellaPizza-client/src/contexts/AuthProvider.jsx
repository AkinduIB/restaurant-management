import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config"

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create an account
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
        
    }
    //signup with gmail
    const signUpWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)

    }

    //login using email & password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logout 
    const logOut = () => {
        signOut(auth)
  

        //update profile 
        const updateuserProfile = ({name, photoURL}) => {
            return updateProfile(auth.currentUser, {
                displayName: name, photoURL: photoURL
              })
        }


        //check signed-in user
        useEffect(() => {
            const unsubcribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/auth.user
                  const uid = user.uid;
                  // ...
                } else {
                  // User is signed out
                  // ...
                }
              });
        }, [])


  const authInfo = {
    user,
    createUser,
    signUpWithGoogle,
    login,
    logOut,
    updateuserProfile

    }
  
  
    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}
}
export default AuthProvider 
