import React, {createContext, useContext, useEffect, useState} from 'react'
import {authentication} from '../Firebase/Firebase';
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({});

    const logOut = (onSuccess) => {
        try {
            authentication.signOut();
            onSuccess();
        } catch (err) {
            alert('There was some problem logging out');
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
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