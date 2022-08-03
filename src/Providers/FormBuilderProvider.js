import { createContext, useContext} from "react";
import {useAsyncReducer} from "./../Utils/CustomHooks";
import Form from "../Models/FormModel";
import Field from "../Models/FieldModel";
import { realtimeDB } from "../Firebase/Firebase";
import { ref, set } from "firebase/database";
import { useAuthContext } from "./AuthProvider";

const FormBuilderContext = createContext();
const form = new Form("new form", {name: "new form", pages: []});

export const FormBuilderProvider = ({children}) => {

    const {user} = useAuthContext();
    
    let initialState = form.getState();

    const notifyDatabase = () => {
        set(ref(realtimeDB, 'forms/'), form.getState()).then(() => {
            console.log("Upload Success.");
        }).catch((err) => {
            console.log(err);
        });
    }


    const changeFormName = (payload) => {
        form.name = payload.name;
        notifyDatabase();
        return form.getState();
    }

    const addPage = () => {
        form.addPage();
        notifyDatabase();
        return form.getState();
    }

    const deletePage = (payload) => {
        form.deletePage(payload.page_id);
        notifyDatabase();
        return form.getState();

    }

    const addField = (payload) => {
        let field = new Field("label", "widget");
        form.pages[payload.page_id].fields.push(field);
        form.pages[payload.page_id].fields.forEach((field, index) => (field.id = index));
        notifyDatabase();
        return form.getState();
    }

    const deleteField = (payload) => {
        console.log(form.pages[payload.page_id].fields);
        form.pages[payload.page_id].fields = form.pages[payload.page_id].fields.filter((field) => {
            return (field.id !== payload.field_id);
        });
        console.log(form.pages[payload.page_id].fields);
        form.pages[payload.page_id].fields.forEach((field, index) => (field.id = index));
        notifyDatabase();
        return form.getState();
    }

    const changeLabel = (payload) => {
        form.pages[payload.page_id].fields[payload.field_id].label = payload.label;
        form.pages[payload.page_id].fields.forEach((field, index) => (field.id = index));
        notifyDatabase();
        return form.getState();
    }

    const changeWidget = (payload) => {
        form.pages[payload.page_id].fields[payload.field_id].widget = payload.widget;
        form.pages[payload.page_id].fields.forEach((field, index) => (field.id = index));
        notifyDatabase();
        return form.getState();
    }

    const reducer = async (state, action) => {
        switch (action.type) {
            case 'changeFormName':
                return changeFormName(action.payload);
            case 'addPage':
                return addPage();
            case 'deletePage':
                return deletePage(action.payload);
            case 'addField':
                return addField(action.payload);
            case 'deleteField':
                return deleteField(action.payload);
            case 'changeLabel':
                return changeLabel(action.payload);
            case 'changeWidget':
                return changeWidget(action.payload);
            default:
                throw Error;
        }
        
    }

    const [state, dispatch] = useAsyncReducer(reducer, initialState);

    return (<FormBuilderContext.Provider value={{state, dispatch}}>
        {children}
    </FormBuilderContext.Provider>);
}

export const useFormBuilderContext = () => {
    return useContext(FormBuilderContext);
}