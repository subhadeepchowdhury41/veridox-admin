import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../Firebase/Firebase";


const AddRequestContext = createContext();

export const AddRequestProvider = ({children}) => {
    const [addReq, setAddReq] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, 'agency/e277WEBvF8YHSl32PONlPlvEjYo1/add_requests'), 
            (snapshot) => {
                let data = [];
                snapshot.docs.forEach((element, index) => {
                    data.push({...element.data(), id: element.id, key: index });
                });
                setAddReq(data);
            });
        return () => {
            unsubscribe();
        }
    }, []);

    return (<AddRequestContext.Provider value={{addReq}}>
      {children}
    </AddRequestContext.Provider>);
}

export const useAddRequestContext = () => {
    return useContext(AddRequestContext);
}