import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GoogleAuthProvider, } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create an account
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //signup with gmail
    const signUpWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    //login using email & password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    //logout 
    const logOut = () => {
        return signOut(auth);
    };

    //update profile 
    const updateUserProfile = ({ name, photoURL }) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        }).then(() => {
            // Update the user in context
            setUser((prevUser) => ({
                ...prevUser,
                displayName: name,
                photoURL: photoURL,
            }));
        }).catch((error) => {
            console.error("Error updating profile: ", error);
            throw error;
        });
    };
    

    //check signed-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email: currentUser.email }
            axios.post('http://localhost:6001/jwt', userInfo)
                .then((response) => {
                // console.log(response.data.token);
                if(response.data.token){
                    localStorage.setItem('access-token', response.data.token);
                }
            })
            } else {
                localStorage.removeItem('access-token')
            }
            

            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        createUser,
        signUpWithGoogle,
        login,
        logOut,
        updateUserProfile,
        loading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
