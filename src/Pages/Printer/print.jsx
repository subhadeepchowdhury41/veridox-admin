import React, { useEffect,useState } from 'react';
import FormBuilder from './formBuilder';
import { Box, Button, Grid, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import {  } from "@mui/system";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { database } from "../../Firebase/Firebase";

const PrintScreen = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [assignment, setAssignment] = useState({});
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({});


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const getForm = async () => {
    const snapshot1 = await getDoc(doc(database, "assignments/" + props.customer, "form_data/data"));
    const snapshot2 = await getDoc(doc(database, "assignments/" + props.customer, "form_data/result"));
    
    setForm({data: snapshot1.data(), response: snapshot2.data() ?? {}});
    console.log("snapshot1",snapshot1.data());
    console.log("snapshot2",snapshot2.data());
  }


  useEffect(() => {

    setData(props.data)
    console.log("props",props.data);

  
  }, []);
  useEffect(() => {
    const timer = setTimeout(async () => {
      
  

    const printable = document.getElementById('printablediv').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printable;

    const printStyle = `
      @media print {
        @page {
          size: A4;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          width: 210mm;
          height: 297mm;
          font-size: 12pt;
          font-family: Arial, sans-serif;
        }
      }
    `;
    const printWindow = window.open('', '_blank', 'height=600,width=800');
    printWindow.document.write('<html><head><title></title>');
    printWindow.document.write(`<style>${printStyle}</style>`);
    printWindow.document.write('</head><body>');
    printWindow.document.write(document.body.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    await sleep(1000);
    printWindow.close();
 
    

    
 
    

    // document.body.innerHTML = originalContents;
    // window.location.href="/dashboard/assignment/approve"
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(doc(database, "assignments", props.customer),
      { includeMetadataChanges: true },
      snapshot => {
        setAssignment({...snapshot.data(), id: snapshot.id});
        // getFv(snapshot.data().assigned_to);
        // getForm();
        setHistory(snapshot.data().history);
        if (snapshot.data()?.history?.length > 3) {
         
        } else {
        
        }
        setIsLoading(false);
      }
    )
    return () => {
        unsubscribe();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.customer]);

  return (
    <div id="printablediv">

<h1 style={{backgroundColor:"#C00000",color:"white"}} >{props.title}</h1>
<div style={{display:"flex",justifyContent:"space-evenly"}} >
<div style={{width:"50%",height:"20vh", border:"1px solid black"}}>
  <h3 style={{backgroundColor:"#002060",color:"white"}} >Customer Details</h3>
  
<h4>Applicant name : {" "}{assignment.applicant_name}</h4>
<h4>Applicant Detail : {" "}{assignment.detail}</h4>
<h4>Applicant Address : {" "}{assignment.address}</h4>

</div>
<div style={{width:"50%",height:"20vh", border:"1px solid black"}}>

<h3 style={{backgroundColor:"#002060",color:"white"}} >Agency Details</h3>

<h4>Agency name : {" "}{props.agency.agency_name}</h4>
<h4>Agency Detail : {" "}{props.agency.detail}</h4>
<h4>Agency Address : {" "}{props.agency.address}</h4>
<h4>Field Verifier : {" "}{props.agency.field_verifiers[0]}</h4>
{props.agency.field_verifiers.map((fv) => (
  <h4>Field Verifier: {fv}</h4>
))}





</div>


</div>
<div style={{width:"100%",height:"5vh", border:"1px solid black"}}>
  <h3 style={{backgroundColor:"#002060",color:"white"}} >Verification Type</h3>
<div style={{width:"100%",display:"flex",justifyContent:"space-evenly",flexDirection:"row"}} >
<h3>{props.agency.draft_assignment.form.name}</h3>  
</div>
</div>
<div style={{display:"flex",justifyContent:"space-evenly"}} >
<div style={{width:"50%",height:"20vh", border:"1px solid black"}}>
  <h3 style={{backgroundColor:"#002060",color:"white"}} >Claimant/insured Details</h3>
</div>
<div style={{width:"50%",height:"20vh", border:"1px solid black"}}>

<h3 style={{backgroundColor:"#002060",color:"white"}} >Policy Details</h3>
</div>
</div>



{data.map((page, i) => {
  return (
    <div key={i}>
      {page.fields.map((field, j) => (



          
            
              




        
        <FormBuilder field={field.widget} data={field} key={j} options={field.options} />
        

        




        
      ))}
    </div>
  )
})}
 
 <div style={{width:"100%",height:"5vh", border:"1px solid black",backgroundColor:"#C0C0C0"}}>
  <h3 style={{backgroundColor:"#002060",color:"white"}} >Remarks: </h3>
</div>
<div style={{width:"100%",height:"5vh", border:"1px solid black"}}>
  <h3 style={{backgroundColor:"#002060",color:"white"}} >Proofs of Documents: </h3>
</div>
 <div style={{width:"100%",height:"20vh", border:"1px solid black"}}>

<h3 style={{backgroundColor:"#002060",color:"white"}} >Footer</h3>
</div>
 <div style={{width:"100%",height:"5vh", border:"1px solid black", backgroundColor:"#C0C0C0" }}>
  <h3 style={{backgroundColor:"#002060",color:"white"}} >Disclaimer: </h3>
</div>

    </div>
  );
};

export default PrintScreen;
