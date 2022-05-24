import React, {createContext, useContext, useEffect, useState} from 'react'
import {authentication} from '../Firebase/Firebase';
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState();

    const logOut = () => {
        authentication.signOut();
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
            setUser(currentUser);
            console.log(user);
        })
        return () => {
            unsubscribe();
        }
    
    }, [user]);

    return (
        <AuthContext.Provider value={{user, logOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export const setUpRecaptcha = async (element, phone) => {
    window.recaptchaVerifier = new RecaptchaVerifier(element, {}, authentication);
    window.recaptchaVerifier.render();
    return await signInWithPhoneNumber(authentication, '+91' + phone, window.recaptchaVerifier);
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}