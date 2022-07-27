import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../Firebase/Firebase";

const WidgetTypeContext = createContext();

export const WidgetTypeProvider = ({children}) => {

    const [widgets, setWidgets] = useState([]);
    

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, "form_widgets"),
          (snapshot) => {
            let data = [];
            snapshot.docs.forEach((doc, index) => {
                data.push({...doc.data(), value: index});
            });
            setWidgets(data);
          }
        );
        return () => {
            unsubscribe();
        }
    }, []);
    
    return (<WidgetTypeContext.Provider value={{widgets}}>
      {children}
    </WidgetTypeContext.Provider>);
};

export const useWidgetTypeContext = () => {
    return useContext(WidgetTypeContext);
};