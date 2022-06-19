import React from 'react';
import { useFieldVerifiersContext } from '../../Providers/FieldVerifiersProvider';
import FieldVerifierCard from '../../Elements/FieldVerifierCard/FieldVerifierCard';


const FieldVerifierPage = () => {
    
  const {fvs} = useFieldVerifiersContext();

  console.log(fvs);

  return (
      <div>
        {fvs.map((element, index) => (
          <div key={index}>
            <FieldVerifierCard name={element.name}
              uid={element.uid}
              number={element.number}
              select={0}/>
          </div>
        ))}
      </div>
  );
}

export default FieldVerifierPage;