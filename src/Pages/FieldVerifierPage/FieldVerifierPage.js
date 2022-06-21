import React from 'react';
import { useFieldVerifiersContext } from '../../Providers/FieldVerifiersProvider';
import FieldVerifierCard from '../../Elements/FieldVerifierCard/FieldVerifierCard';
import { useLocation } from 'react-router-dom';


const FieldVerifierPage = () => {
    
  const {fvs} = useFieldVerifiersContext();
  const {state} = useLocation();

  const {mode} = state;

  console.log(fvs);

  return (
      <div>
        {fvs.map((element, index) => (
          <div key={index}>
            <FieldVerifierCard name={element.name}
              uid={element.uid}
              number={element.number}
              select={mode === "select" ? 1 : 0}/>
          </div>
        ))}
      </div>
  );
}

export default FieldVerifierPage;