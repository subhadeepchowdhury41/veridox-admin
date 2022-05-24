import PopUpBox from '../../Elements/PopUpBox/PopUpBox';
import React, { useState } from 'react';
import './HomePage.css';
import CustomTextField from '../../Elements/CustomTextField/CustomTextField';
import { Paper, Typography } from '@mui/material';
import SolidButton from '../../Elements/SolidButton/SolidButton';
import OtpInput from 'react-otp-input-rc-17';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { setUpRecaptcha } from '../../Providers/AuthProvider';
import { useFocus } from '../../Utils/CustomHooks';

const HomePage = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [helperPhone, setHelperPhone] = useState("");
    const [popUp, setPopUp] = useState("1");
    const [confirmObj, setConfirmObj] = useState();

    const [phoneRef, setPhoneFocus] = useFocus();
    const [otpRef, setOtpFocus] = useFocus();
    const [passwordRef, setPasswordFocus] = useFocus();

    // const [errorDialog, setErrorDialog] = useState("1");

    const isValidPhoneNumber = (number) => {
        var str = "Enter a valid phone number";
        var nullStr = "";
        if ((number.length !== 10) || isNaN(number)) {
            setHelperPhone(str);
        } else {
            setHelperPhone(nullStr);
        }
    }

    const handlePhone = (value) => {
        isValidPhoneNumber(value.target.value);
        setPhone(value.target.value);
        setPhoneFocus();
    }

    const goBack = () => {
        setPopUp("1");
    }

    
    const getOtp = async (e) => {
        e.preventDefault();
        try {
            var res = await setUpRecaptcha('recaptcha-container', phone);
            setConfirmObj(res);
            setPopUp("2");
        } catch (err) {
            console.log(err);
        }
    }
    
    const navigate = useNavigate();

    const verifyOtp = async () => {
        try {
            var res = await confirmObj.confirm(otp);
            console.log(res);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    }

    const OtpPopUp = () => {
        return (<PopUpBox >
            <Paper variant = "outlined"
            sx = {{ width: "98%", height: "480px" }}
            elevation = "5" >
            <div style = {
                {
                    width: '100%',
                    textAlign: 'center',
                }
            }>
                <div style = {
                    { margin: '60px'}
                } >
                  <Typography variant='h5'> Enter the OTP sent to</Typography>
                  <Typography variant='h5'>{'+91 ' + phone} </Typography>
                </div>

                <div style={{textAlign: 'center', paddingLeft: '8.3em', paddingTop: '2em', paddingBottom: '4em'}}>
                  <OtpInput className="OtpInput"
                    key="otp-input"
                    value={otp}
                    onChange={ e => setOtp(e.target.value)}
                    numInputs={6}/>
                </div>
              <SolidButton label = "Go Back"
                  size = "large"
                  display = "inline"
                  variant = "outlined"
                  background = "white"
                  color = "green"
                  onPress = { goBack } />
                
                <SolidButton 
                  display = "inline" 
                  label = "Verify OTP" 
                  size = "large"
                  onHover = "#398139"
                  onPress = {verifyOtp}
                  />
            </div>
            </Paper>
          </PopUpBox>)
    }

    const PhoneSignIn = () => {
        return (<PopUpBox >
            <Paper variant = "outlined"
            sx = {{ width: "98%", height: "480px" }}
            elevation = "5" >
            <div style = {
                {
                    width: '100%',
                    textAlign: 'center',
                }
            }>
            <CustomTextField value = { phone }
            onChange = { handlePhone }
            helperText = { helperPhone }
            ref={ phoneRef }
            key = "phone"
            label = "Phone No"
            variant = "outlined" />
    
            <CustomTextField value = { password }
              ref = {passwordRef}
              onChange = { (e) => setPassword(e.target.value) }
              key = "password"
              label = "Password"
              type = "password"
              variant = "outlined" />
                <div style={{alignItems: "center", margin: '30px'}}>
                    <div style={{marginLeft: "55px"}} id = "recaptcha-container" ></div>
                </div>

                <SolidButton
                  display = "inline"
                  label = "Get Otp"
                  size = "large"
                  onHover = "#398139"
                  onPress = { getOtp }/>

                <div style = {
                    { margin: '20px'}
                } >
                  <Typography > Create an account if you dont have one </Typography>
                </div>
                <SolidButton label = "Sign Up" size = "large" onHover = "#398139" />
            </div>
            </Paper>
          </PopUpBox>);
    }

    return (
        <>
            <PhoneSignIn/>
        </>
      
    );

}


export default HomePage;