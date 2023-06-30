import React, { useEffect, useState } from "react";
import FormBuilder from "./formBuilder";
import { Print } from "@mui/icons-material";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../Firebase/Firebase";
import { useProfileContext } from "../../Providers/ProfileProvider";
import { useNavigate, useParams } from "react-router-dom";

const PrintScreen = () => {
  const [assignment, setAssignment] = useState();
  const [fv, setFv] = useState();
  const [form, setForm] = useState();
  const { id } = useParams();
  const [response, setResponse] = useState();
  const { profile } = useProfileContext();
  const agency = profile;
  const navigate = useNavigate();
  const getDetails = async () => {
    await getDoc(doc(database, "assignments/" + id, "form_data/data")).then(
      async (formData) => {
        await getDoc(
          doc(database, "assignments/" + id, "form_data/response")
        ).then(async (formResponse) => {
          await getDoc(doc(database, "assignments", id)).then(
            async (assignment) => {
              console.log(assignment.data());
              var fv = await getDoc(
                doc(database, "field_verifier", assignment.data()?.assigned_to)
              );
              setAssignment(assignment.data());
              setForm(formData.data());
              setResponse(formResponse.data());
              setFv(fv.data());
              console.log(assignment.data(), formData.data(), formResponse.data(), fv.data());
            }
          );
        });
      }
    );
  };
  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return fv && form && assignment ? (
    <div>
      <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <Print
          onClick={() => {
            const printable = document.getElementById("printablediv").innerHTML;
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
            const printWindow = window.open(
              "",
              "_blank"
            );
            printWindow.document.open();
            printWindow.document.write("<html><head><title></title>");
            printWindow.document.write(`<style>${printStyle}</style>`);
            printWindow.document.write("</head><body>");
            printWindow.document.write(document.body.innerHTML);
            printWindow.document.write("</body></html>");
            printWindow.document.close();
            printWindow.print();
            navigate('/dashboard/assignment/result');
          }}
        />
      </div>
      <div id="printablediv">
        <h1 style={{ backgroundColor: "#C00000", color: "white" }}>
          {assignment.document_type}
        </h1>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div
            style={{ width: "50%", height: "20vh", border: "1px solid black" }}
          >
            <h3 style={{ backgroundColor: "#002060", color: "white" }}>
              Customer Details
            </h3>
            <h4>
              Applicant name : {assignment.persons[0].details.fName}{" "}
              {assignment.persons[0].details.lName}
            </h4>
            <h4>Applicant Phone : {assignment.persons[0].details.phone}</h4>
            <h4>
              Applicant Address : {assignment.persons[0].details.address1}
            </h4>
          </div>
          <div
            style={{ width: "50%", height: "20vh", border: "1px solid black" }}
          >
            <h3 style={{ backgroundColor: "#002060", color: "white" }}>
              Agency Details
            </h3>
            <h4>Agency name : {agency.agency_name}</h4>
            {/* <h4>Agency Detail : {" "}{agency.detail}</h4> */}
            {/* <h4>Agency Address : {" "}{agency.address}</h4> */}
            <h4>Field Verifier : {fv.name}</h4>
            {/* {props.agency.field_verifiers.map((fv) => (
            <h4>Field Verifier: {fv}</h4>
          ))} */}
          </div>
        </div>
        <div
          style={{ width: "100%", height: "5vh", border: "1px solid black" }}
        >
          <h3 style={{ backgroundColor: "#002060", color: "white" }}>
            Verification Type
          </h3>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <h3>{form.name}</h3>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div
            style={{ width: "50%", height: "20vh", border: "1px solid black" }}
          >
            <h3 style={{ backgroundColor: "#002060", color: "white" }}>
              Claimant/insured Details
            </h3>
          </div>
          <div
            style={{ width: "50%", height: "20vh", border: "1px solid black" }}
          >
            <h3 style={{ backgroundColor: "#002060", color: "white" }}>
              Policy Details
            </h3>
          </div>
        </div>
        {form.data.map((page, i) => {
          return (
            <div key={i}>
              {page.fields.map((field, j) => (
                <FormBuilder
                  field={field.widget}
                  data={field}
                  response={response}
                  key={j}
                  options={field.options}
                />
              ))}
            </div>
          );
        })}
        <div
          style={{
            width: "100%",
            height: "5vh",
            border: "1px solid black",
            backgroundColor: "#C0C0C0",
          }}
        >
          <h3 style={{ backgroundColor: "#002060", color: "white" }}>
            Remarks:{" "}
          </h3>
        </div>
        <div
          style={{ width: "100%", height: "5vh", border: "1px solid black" }}
        >
          <h3 style={{ backgroundColor: "#002060", color: "white" }}>
            Proofs of Documents:{" "}
          </h3>
        </div>
        <div
          style={{ width: "100%", height: "20vh", border: "1px solid black" }}
        >
          <h3 style={{ backgroundColor: "#002060", color: "white" }}>Footer</h3>
        </div>
        <div
          style={{
            width: "100%",
            height: "5vh",
            border: "1px solid black",
            backgroundColor: "#C0C0C0",
          }}
        >
          <h3 style={{ backgroundColor: "#002060", color: "white" }}>
            Disclaimer:{" "}
          </h3>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default PrintScreen;
