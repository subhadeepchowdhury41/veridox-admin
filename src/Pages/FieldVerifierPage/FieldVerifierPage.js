import React from 'react';
import { useFieldVerifiersContext } from '../../Providers/FieldVerifiersProvider';
import FieldVerifierCard from '../../Elements/FieldVerifierCard/FieldVerifierCard';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import './FieldVerifierPage.css';


const FieldVerifierPage = () => {
    
  const {fvs} = useFieldVerifiersContext();
  const {state} = useLocation();

  const {mode} = state;

  return (
      <div>
        <div style={{
                height: '47px',
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '14px',
                color: '#404040',
                fontWeight: 'bold',
                justifyContent: 'center',
            }}>
              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
                Identifier
              </Box>

              <Box className="OverflowTextContainer" sx={{width: "30%"}}>
                Name
              </Box>
              
              <Box className="OverflowTextContainer" sx={{width: "20%"}}>
                Phone Number
              </Box>
              
              Actions
            
        </div>
        <hr style={{width: '93%', margin: '0 auto 0.15em auto', border: '0.6px solid #dedede'}}/>

        {fvs.map((element, index) => (
          <div key={index}>
            <FieldVerifierCard
              uid={element}
              select={mode === "select" ? 1 : 0}/>
          </div>
        ))}
      </div>
  );
}

export default FieldVerifierPage;