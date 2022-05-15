import PopUpBox from '../../Elements/PopUpBox/PopUpBox';
import React, { useState } from 'react';
import './HomePage.css';
import CustomTextField from '../../Elements/CustomTextField/CustomTextField';
import { Paper, Typography } from '@mui/material';
import SolidButton from '../../Elements/SolidButton/SolidButton';
import { authentication } from '../../Firebase/Firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


const HomePage = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
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

    const auth = getAuth();
    auth.languageCode = 'it';

    const getRecaptcha = () => {
      console.log('lol');
      window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          console.log(response);
          onSignInSubmit();
        }
      }, authentication);
    }

    const getOtp = () => {
      getRecaptcha();
    }

    const verifyOtp = () => {

    }

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

    return (
        <PopUpBox>
          <Paper variant="outlined" sx={{width: "98%", height: "480px"}} elevation="5">
            <div style={{
              width: '100%',
              textAlign: 'center',
            }}>
              

              <CustomTextField
                value={phone}
                onChange={handlePhone}
                helperText={helperPhone}
                id="phone" label="Phone No" 
                variant="outlined" />

               <CustomTextField
               value={password}
               onChange={handlePassword}
               id="password" label="Password" type="password"
               variant="outlined" />

               <SolidButton label="Get Otp" size="large" onPress={getOtp} id="sign-in-button"/>
               <div style={{
                 margin: '20px'
               }}>
                 <Typography>Create an account if you dont have one</Typography>
               </div>
               <SolidButton label="Sign Up" size="large"/>
               <div id="recaptcha-container"></div>
            </div>
          </Paper>
        </PopUpBox>
    );

    
}



export default HomePage;