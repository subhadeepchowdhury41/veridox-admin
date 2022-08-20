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
        set(ref(realtimeDB, 'forms/' + user.uid), form.getState()).then(() => {
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
        form.pages[payload.page_id].fields = form.pages[payload.page_id].fields.filter((field) => {
            return (field.id !== payload.field_id);
        });
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

    const changeNoOfWords = (payload) => {
        form.pages[payload.page_id].fields[payload.field_id].length = payload.length;
        form.pages[payload.page_id].fields.forEach((field, index) => (field.id = index));
        notifyDatabase();
        return form.getState();
    }

    const changeDropDownOptions = (payload) => {
        if (form.pages[payload.page_id].fields[payload.field_id].options === undefined || 
            form.pages[payload.page_id].fields[payload.field_id].options === null) {
                form.pages[payload.page_id].fields[payload.field_id].options = [{value: payload.option, id: 0}];
        } else {
            form.pages[payload.page_id].fields[payload.field_id].options.push({value: payload.option});
            form.pages[payload.page_id].fields[payload.field_id].options.forEach((option, index) => (option.id = index));
        }

        form.pages[payload.page_id].fields.forEach((field, index) => (field.id = index));
        notifyDatabase();
        return form.getState();
    }

    const changeExtensionName = (payload) => {
        form.pages[payload.page_id].fields[payload.field_id].extensions.forEach((extension) => {
            if (extension.id === payload.extension_id) {
                extension.value = payload.extension;
            }
        });
        notifyDatabase();
        return form.getState();
    }

    const changeOptionName = (payload) => {
        form.pages[payload.page_id].fields[payload.field_id].options.forEach((option) => {
            if (option.id === payload.option_id) {
                option.value = payload.option;
            }
        });
        notifyDatabase();
        return form.getState();
    }

    const changeFileExtensions = (payload) => {
        if (form.pages[payload.page_id].fields[payload.field_id].extensions === undefined || 
            form.pages[payload.page_id].fields[payload.field_id].extensions === null) {
                form.pages[payload.page_id].fields[payload.field_id].extensions = [{value: payload.extension, id: 0}];
        } else {
            form.pages[payload.page_id].fields[payload.field_id].extensions.push({value: payload.extension});
            form.pages[payload.page_id].fields[payload.field_id].extensions.forEach((extension, index) => (extension.id = index));
        }

        form.pages[payload.page_id].fields.forEach((field, index) => (field.id = index));
        notifyDatabase();
        return form.getState(); 
    }

    const markRequired = (payload) => {
        form.pages[payload.page_id].fields[payload.field_id].required = payload.required;
        form.pages[payload.page_id].fields.forEach((field, index) => (field.id = index));
        notifyDatabase();
        return form.getState();
    }

    const markMultiLined = (payload) => {
        form.pages[payload.page_id].fields[payload.field_id].multi_line = payload.multi_line;
        form.pages[payload.page_id].fields.forEach((field, index) => (field.id = index));
        notifyDatabase();
        return form.getState();
    }

    const deleteDropDownOption = (payload) => {
        form.pages[payload.page_id].fields[payload.field_id].options = 
          form.pages[payload.page_id].fields[payload.field_id].options.filter((option) => (option.id !== payload.option_id));
        form.pages[payload.page_id].fields[payload.field_id].options.forEach((option, index) => (option.id = index));
        notifyDatabase();
        return form.getState();
    }

    const deleteFileExtension = (payload) => {
        form.pages[payload.page_id].fields[payload.field_id].extensions = 
          form.pages[payload.page_id].fields[payload.field_id].extensions.filter((extension) => (extension.id !== payload.extension_id));
        form.pages[payload.page_id].fields[payload.field_id].extensions.forEach((extension, index) => (extension.id = index));
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
            case 'markRequired':
                return markRequired(action.payload);
            case 'markMultiLined':
                return markMultiLined(action.payload);
            case 'changeNoOfWords':
                return changeNoOfWords(action.payload);
            case 'changeDropDownOptions':
                return changeDropDownOptions(action.payload);
            case 'changeOptionName':
                return changeOptionName(action.payload);
            case 'deleteDropDownOption':
                return deleteDropDownOption(action.payload);
            case 'changeFileExtensions':
                return changeFileExtensions(action.payload);
            case 'deleteFileExtension':
                return deleteFileExtension(action.payload);
            case 'changeExtensionName':
                return changeExtensionName(action.payload);
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