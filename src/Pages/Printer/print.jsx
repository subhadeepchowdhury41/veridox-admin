import React, { useEffect,useState } from 'react';
import FormBuilder from './formBuilder';

const PrintScreen = (props) => {

  const [data, setData] = useState([]);


  useEffect(() => {
    setData(props.data);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
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
    printWindow.close();

    document.body.innerHTML = originalContents;
    window.location.href="/dashboard/assignment/approve"
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="printablediv">

<h1 style={{backgroundColor:"#C00000",color:"white"}} >{props.title}</h1>
<div style={{display:"flex",justifyContent:"space-evenly"}} >
<div style={{width:"50%",height:"20vh", border:"1px solid black"}}>
  <h3 style={{backgroundColor:"#002060",color:"white"}} >Customer Details</h3>
</div>
<div style={{width:"50%",height:"20vh", border:"1px solid black"}}>

<h3 style={{backgroundColor:"#002060",color:"white"}} >Agency Details</h3>
</div>


</div>
<div style={{width:"100%",height:"5vh", border:"1px solid black"}}>
  <h3 style={{backgroundColor:"#002060",color:"white"}} >Verification Type</h3>
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
        <FormBuilder field={field.widget} data={field} key={j} />
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
