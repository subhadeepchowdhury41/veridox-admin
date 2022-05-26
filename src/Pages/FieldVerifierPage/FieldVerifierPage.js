import React, { useEffect, useState } from 'react';
import { database } from '../../Firebase/Firebase';
import { collection, getDocs } from 'firebase/firestore';


const FieldVerifierPage= () => {
    const [docs, setDocs] = useState([]);

    const fetchDocuments = async () => {
        console.log("....");
        const querySnapshots = await getDocs(collection(database, "field-verifier"));
        querySnapshots.forEach((doc) => {
            console.log(doc.id);
            setDocs(data => ([...data, doc.id]));
        })
    }

    useEffect(() => {
        fetchDocuments();
    }, [])

    return (
        
        <>
          {docs.map((val) => (<div>{val}</div>))}
        </>
    );
}

export default FieldVerifierPage;