import React, { useState } from 'react';
import PopUpBox from '../PopUpBox/PopUpBox';
import { Paper  } from '@mui/material';
import CustomTextField from '../CustomTextField/CustomTextField';
import SolidButton from '../SolidButton/SolidButton';
import { useOtpContext } from '../../Providers/OtpProvider';

const SignInPopUp = () => {

    const  { phoneNo, id, setPhoneNo, setId, getOtp } = useOtpContext();
    
    const [helperPhone, setHelperPhone] = useState("");

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
        setPhoneNo(value.target.value);
    }

    return (
      <PopUpBox >
        <Paper variant = "outlined"
        sx = {{ width: "98%", height: "480px" }}
        elevation = {5} >
        <div style = {
            {
                width: '100%',
                textAlign: 'center',
            }
        }>
        <CustomTextField value = { phoneNo }
          onChange = { handlePhone }
          helperText = { helperPhone }
          label = "Phone No"
          variant = "outlined" />

        <CustomTextField value = { id }
          onChange = { (e) => setId(e.target.value) }
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
            
        </div>
        </Paper>
      </PopUpBox>);
}

export default SignInPopUp;