import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../Firebase/Firebase";

const FieldVerifiersContext = createContext();

export const FieldVerifiersProvider = ({children}) => {

    const [fvs, setFvs] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, "field_verifier"),
          (snapshot) => {
            let data = [];
            snapshot.docs.forEach((doc, index) => {
                data.push({...doc.data(), key: index, uid: doc.id});
            })
            setFvs(data);
          });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <FieldVerifiersContext.Provider value={{fvs}}>
            {children}
        </FieldVerifiersContext.Provider>
    );
}

export const useFieldVerifiersContext = () => {
    return useContext(FieldVerifiersContext);
}