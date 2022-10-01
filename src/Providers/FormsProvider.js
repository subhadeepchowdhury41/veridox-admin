import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../Firebase/Firebase";
// import { useAuthContext } from "./AuthProvider";

const FormsContext = createContext();

export const FormsProvider = ({children}) => {

    // const {user} = useAuthContext();

    const [forms, setForms] = useState([]);

    const addForm = async (data) => {
        await addDoc(collection(database, "agency/e277WEBvF8YHSl32PONlPlvEjYo1/forms/"), data);
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, "agency/e277WEBvF8YHSl32PONlPlvEjYo1/forms"), 
        (snapshot) => {
            let data = [];
            snapshot.docs.forEach((doc) => {
                data.push({...doc.data()});
            });
            setForms(data);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
    <FormsContext.Provider value={{forms, addForm}}>
        {children}
    </FormsContext.Provider>)
}

export const useFormsContext = () => {
    return useContext(FormsContext);
}