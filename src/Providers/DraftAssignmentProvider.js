import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../Firebase/Firebase";
// import { useAuthContext } from "./AuthProvider";

const DraftAssignmentContext = createContext();

export const DraftAssignmentProvider = ({children}) => {

    const [assignment, setAssignment] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [fvName, setFvName] = useState();

    const [form, setForm] = useState({});

    const getFv = async (uid) => {
        const snapshot = await getDoc(doc(database, "field_verifier", uid));
        setAssignment({...assignment, assigned_to: uid});
        setFvName(snapshot.data().name);
    }

    // const {user} = useAuthContext();

    const saveAssignment = async () => {
        
        await updateDoc(doc(database, "agency", "e277WEBvF8YHSl32PONlPlvEjYo1"), {
            draft_assignment: assignment
        });
        
    }

    const getAssignment = async () => {
        await getDoc(doc(database, "agency", "e277WEBvF8YHSl32PONlPlvEjYo1"))
        .then((snapshot) => {
            setAssignment(snapshot.data().draft_assignment ?? {});
            setIsLoading(false);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        getAssignment();
    }, []);

    return (<DraftAssignmentContext.Provider value={{isLoading, assignment,
        setAssignment, getFv, fvName, saveAssignment, form, setForm}}>
        {children}
    </DraftAssignmentContext.Provider>);
}

export const useDraftAssignmentContext = () => {
    return useContext(DraftAssignmentContext);
}