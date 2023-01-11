import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../Firebase/Firebase";
import { generateAssignmentId } from "../Utils/AssignmentIdGenerator";
import { useForm } from "../Utils/FormValidator";
import { useAlertBoxContext } from "./AlertBoxProvider";
import { useAuthContext } from "./AuthProvider";
import { useToastProvider } from "./ToastProvider";

const DraftAssignmentContext = createContext();

export const DraftAssignmentProvider = ({children}) => {
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isSavingDraft, setIsSavingDraft] = useState(false);
    const [gettingFv, setGettingFv] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const {showSuccess, showError, showWarning} = useToastProvider();
    const [mounted, setMounted] = useState(false);
    const [fvName, setFvName] = useState();
    const [fvId, setFvId] = useState();
    const [form, setForm] = useState({});
    const [assignment, setAssignment, validate, errors] = useForm({
        applicant_name: [{
            type: 'length',
            length: 3
        }, 'required'],
        applicant_phone: ['required', {
            type: 'pattern',
            msg: 'Enter a valid phone number',
            regex: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/,
        }],
        applicant_post_office: ['required'],
        applicant_city: ['required'],
        applicant_pincode: ['required', {
            type: 'pattern',
            regex: /^[1-9][0-9]{5}$/,
            msg: 'This is not a valid pincode'
        }],
        applicant_state: ['required'],
        coapplicant_name: ['required', {
            type: 'length',
            length: 3
        }],
        coapplicant_phone: ['required', {
            type: 'pattern',
            regex: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/,
            msg: 'Enter a valid phone number'
        }],
        coapplicant_post_office: ['required'],
        coapplicant_city: ['required'],
        coapplicant_pincode: ['required', {
            type: 'pattern',
            regex: /^[1-9][0-9]{5}$/,
            msg: 'This is not a valid pincode'
        }],
        coapplicant_state: ['required'],
        document_type: ['required'],
        assigned_to: ['required']
    });
    const {showDialog, submitRef, cancelRef} = useAlertBoxContext();

    const getFv = async (uid) => {
       if (uid !== null && uid !== undefined && uid !== '') {
            setGettingFv(true);
            await getDoc(doc(database, "field_verifier", uid)).then((snapshot) => {
               setAssignment({...assignment, assigned_to: uid});
               setFvName(snapshot.data().name);
               setFvId(snapshot.data().id);
               setGettingFv(false);
            }).catch(err => {
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
            showSuccess("Draft Assignement Saved");
            setIsSavingDraft(false);
        }).catch(err => {
            showError();
        });
    }

    const clearForm = () => {
        if (Object.entries(form).length === 0) {
            showError("No Form to Remove!");
            console.log(form);
            return;
        }
        showSuccess('Form Removed');
        setForm({});
    }

    const clearFv = () => {
        if (assignment.assigned_to === undefined
            || assignment.assigned_to === null) {
                showError('No Field Verifier Chosen');
                return;
        }
        setAssignment(prev => ({...prev, assigned_to: null}));
        showSuccess('Field Verifier Removed');
    }

    const saveAssignment = async () => {
        if (!validate()) {
            showError("Please fill all fields");
            return;
        }
        if (Object.entries(form).length === 0) {
            showError("Please choose a Form");
            console.log(form);
            return;
        }
        showDialog({
            title: 'Proceed to Asssign',
            message: 'Are you sure you want to assign this assignment?',
        });
        cancelRef.current.onclick = () => {
            showWarning('Assignment Submit Cancelled!');
            cancelRef.current.onclick = () => {}
        }
        submitRef.current.onclick = async () => {
            const date = new Date();
            setIsSaved(true);
            let assId = generateAssignmentId();
            await setDoc(doc(database, "agency/" + user.uid, "assignments/" + assId), {
              assigned_to: assignment.assigned_to,
              document_type: assignment.document_type,
              status: 'assigned',
              fvId: fvId
            }).then(async (snapshot) => {
                await setDoc(doc(database, "assignments", assId), {
                    agency: user.uid,
                    ...assignment,
                    assigned_at: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                    status: "assigned",
                    history: [{
                        status: 'assigned',
                        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                    }]
                }).then(async (snapshot) => {
                    await setDoc(doc(database, "assignments/" + assId, "form_data/data"),
                      {...form}).then(async (snapshot) => {
                        await setDoc(doc(database, "field_verifier/" + assignment.assigned_to,
                          "assignments/" + assId), {
                            agency: user.uid,
                            applicant_name: assignment.applicant_name,
                            applicant_phone: assignment.applicant_phone,
                            applicant_post_office: assignment.applicant_post_office,
                            applicant_city: assignment.applicant_city,
                            applicant_state: assignment.applicant_state,
                            coapplicant_name: assignment.coapplicant_name,
                            coapplicant_phone: assignment.coapplicant_phone,
                            coapplicant_post_office: assignment.coapplicant_post_office,
                            coapplicant_city: assignment.coapplicant_city,
                            coapplicant_state: assignment.coapplicant_state,
                            document_type: assignment.document_type,
                            assigned_at: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                            status: "assigned"
                        }).then(snap => {
                            showSuccess("Assignemnt assigned to " + fvName);
                        })
                        submitRef.current.onclick = () => {}
                        setIsSaved(false);
                    });
                });
            }).catch((err) => {
                showError();
            });;
        }
    }

    const getAssignment = async (uid) => {
        if (user !== null && user !== undefined) {
            await getDoc(doc(database, "agency", uid))
            .then(async (snapshot) => {
                if (snapshot.data() !== undefined) {
                    await getFv(snapshot.data().draft_assignment.assignment.assigned_to);
                    setAssignment(snapshot.data().draft_assignment.assignment ?? {});
                    setForm(snapshot.data().draft_assignment.form ?? {});
                }
                setIsLoading(false);
                showSuccess("Loaded Draft Assignemnt");
            }).catch(err => {
                showSuccess("Empty Draft Assignment Loaded");
                setIsLoading(false);
            });
        }
    }

    useEffect(() => {
        if (mounted === true && user.uid !== null && user.uid !== undefined) {
            setIsLoading(true);
            getAssignment(user.uid);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, mounted]);

    return (<DraftAssignmentContext.Provider value={{isLoading, assignment, clearForm,
        setAssignment, getFv, fvName, saveAssignment, gettingFv, isSaved, errors, clearFv,
          saveDraftAssignment, form, setForm, isSavingDraft, setMounted}}>
        {children}
    </DraftAssignmentContext.Provider>);
}

export const useDraftAssignmentContext = () => {
    return useContext(DraftAssignmentContext);
}