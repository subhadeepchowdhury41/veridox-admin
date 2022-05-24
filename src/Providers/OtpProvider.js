import { useState, createContext, useContext  } from "react";
import { setUpRecaptcha } from "./AuthProvider";

const OtpContext = createContext();

export const OtpProvider = ({children}) => {

    const [phoneNo, setPhoneNo] = useState();
    const [confirmObj, setConfirmObj] = useState();
    const [otp, setOtp] = useState();
    const [popUp, setPopUp] = useState("1");

    const getOtp = async (e) => {
        e.preventDefault();
        try {
            var res = await setUpRecaptcha('recaptcha-container', phoneNo);
            setConfirmObj(res);
            setPopUp("2");
        } catch (err) {
            console.log(err);
        }
    }

    const verifyOtp = async (onSuccess) => {
        try {
            var res = await confirmObj.confirm(otp);
            console.log(res);
            onSuccess();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <OtpContext.Provider value={{getOtp, verifyOtp, phoneNo, setPhoneNo,
         otp, setOtp, popUp, setPopUp}}>
          {children}
        </OtpContext.Provider>
    );
}

export const useOtpContext = () => {
    return useContext(OtpContext);
}