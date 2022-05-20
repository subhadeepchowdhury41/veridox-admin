import PopUpBox from '../../Elements/PopUpBox/PopUpBox';
import React, { useState } from 'react';
import './HomePage.css';
import CustomTextField from '../../Elements/CustomTextField/CustomTextField';
import { Paper, Typography } from '@mui/material';
import SolidButton from '../../Elements/SolidButton/SolidButton';
import { authentication } from '../../Firebase/Firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import OtpInput from 'react-otp-input-rc-17';
import './HomePage.css';

const HomePage = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [helperPhone, setHelperPhone] = useState("");

    const [errorDialog, setErrorDialog] = useState("");

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
    }

    const handlePassword = (value) => {
        setPassword(value.target.value);
    }

    const handleOtp = (value) => {
        setOtp(value);
        console.log(otp);
    }

    const auth = getAuth();

    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                console.log(response);
                onSignInSubmit();
            }
        }, authentication);
        window.recaptchaVerifier.render();
        return signInWithPhoneNumber(authentication, '+91' + phone, window.recaptchaVerifier);
    }

    const getOtp = async() => {
        try {
            var res = await setUpRecaptcha();
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    const verifyOtp = () => {}

    const onSignInSubmit = () => {
        var number = '+91' + phone;
        var verifier = window.recaptchaVerifier;
        console.log(number);
        signInWithPhoneNumber(auth, number, verifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
            })
            .catch((error) => {
                console.log(error);
            });
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
                    value={otp}
                    onChange={handleOtp}
                    numInputs={6}/>
                </div>
              <SolidButton label = "Go Back"
                  size = "large"
                  display = "inline"
                  variant = "outlined"
                  background = "white"
                  color = "green"
                  onPress = { getOtp } />
                
                <SolidButton 
                  display = "inline" 
                  label = "Sign Up" 
                  size = "large" 
                  onHover = "#398139"
                  />
            </div>
            </Paper>
          </PopUpBox>)
    }

    const phoneSignIn = () => {
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
            id = "phone"
            label = "Phone No"
            variant = "outlined" />
    
            <CustomTextField value = { password }
            onChange = { handlePassword }
            id = "password"
            label = "Password"
            type = "password"
            variant = "outlined" />
    
                <SolidButton
                  display = "inline"
                  label = "Get Otp"
                  size = "large"
                  onPress = { getOtp }
                  id = "sign-in-button" />
                <div style = {
                    { margin: '20px'}
                } >
                  <Typography > Create an account if you dont have one </Typography>
                </div>
                <SolidButton label = "Sign Up" size = "large" />
                <div id = "recaptcha-container" >
              </div>
            </div>
            </Paper>
          </PopUpBox>);
    }

    return (
      <OtpPopUp/>
    );

}


export default HomePage;