import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../Firebase/Firebase";
import { generateAssignmentId } from "../Utils/AssignmentIdGenerator";
import { useAuthContext } from "./AuthProvider";

const DraftAssignmentContext = createContext();

export const DraftAssignmentProvider = ({children}) => {

    const {user} = useAuthContext();

    const [assignment, setAssignment] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSavingDraft, setIsSavingDraft] = useState(false);
    const [gettingFv, setGettingFv] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [fvName, setFvName] = useState();

    const [form, setForm] = useState({});

    const getFv = async (uid) => {
       console.log(uid);
       setGettingFv(true);
       if (uid !== undefined ) {
            await getDoc(doc(database, "field_verifier", uid)).then((snapshot) => {
               setAssignment({...assignment, assigned_to: uid});
               setFvName(snapshot.data().name);
               setGettingFv(false);
            });
       }
    }

    const saveDraftAssignment = async () => {
        setIsSavingDraft(true);
        await updateDoc(doc(database, "agency",
         user.uid), {
            'draft_assignment': {
            assignment: assignment,
            form: form
        }}).then((snapshot) => {
            setIsSavingDraft(false);
        });
    }

    const saveAssignment = async () => {
        const date = new Date();
        setIsSaved(true);
        let assId = generateAssignmentId();
        await setDoc(doc(database, "agency/" + user.uid, "assignments/" + assId), {
            assigned_to: assignment.assigned_to,
            document_type: assignment.document_type
        }).then(async (snapshot) => {
            await setDoc(doc(database, "assignments", assId), {
                agency: user.uid,
                ...assignment,
                assigned_at: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
                status: "assigned"
            }).then(async (snapshot) => {
                await setDoc(doc(database, "assignments/" + assId, "form_data/data"), {...form}).then(async (snapshot) => {
                    await setDoc(doc(database, "field_verifier/" + assignment.assigned_to, "assignments/" + assId), {
                        agency: user.uid,
                        document_type: assignment.document_type,
                        assigned_at: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
                        status: "assigned"
                    });
                    setIsSaved(false);
                });
            });
        });
    }

    const getAssignment = async () => {
        await getDoc(doc(database, "agency", user.uid))
        .then(async (snapshot) => {
            if (snapshot.data() !== undefined) {
                await getFv(snapshot.data().draft_assignment.assignment.assigned_to);
                setAssignment(snapshot.data().draft_assignment.assignment ?? {});
                setForm(snapshot.data().draft_assignment.form);
            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        console.log(user.uid);

        if (user.uid != null && user.uid !== undefined) {
            setIsLoading(true);
            getAssignment();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.uid]);

    return (<DraftAssignmentContext.Provider value={{isLoading, assignment,
        setAssignment, getFv, fvName, saveAssignment, gettingFv, isSaved,
          saveDraftAssignment, form, setForm, isSavingDraft}}>
        {children}
    </DraftAssignmentContext.Provider>);
}

export const useDraftAssignmentContext = () => {
    return useContext(DraftAssignmentContext);
}