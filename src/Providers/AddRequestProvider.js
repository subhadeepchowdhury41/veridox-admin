import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../Firebase/Firebase";
import { useAuthContext } from "./AuthProvider";


const AddRequestContext = createContext();

export const AddRequestProvider = ({children}) => {
    const [addReq, setAddReq] = useState([]);

    const {user} = useAuthContext();

    useEffect(() => {
        let unsubscribe = () => {};
        if (user.uid !== null && user.uid !== undefined) {
            unsubscribe = onSnapshot(collection(database, `agency/${user.uid}/add_requests`), 
            (snapshot) => {
                let data = [];
                snapshot.docs.forEach((element) => {
                    data.push({...element.data(), id: element.id});
                });
                setAddReq(data);
            });
        }
        return () => {
            unsubscribe();
        }
    }, [user.uid]);

    return (<AddRequestContext.Provider value={{addReq}}>
      {children}
    </AddRequestContext.Provider>);
}

export const useAddRequestContext = () => {
    return useContext(AddRequestContext);
}