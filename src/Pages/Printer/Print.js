import React, { useEffect, useState } from "react";
import FormBuilder from "./formBuilder";
import { Print } from "@mui/icons-material";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../Firebase/Firebase";
import { useProfileContext } from "../../Providers/ProfileProvider";
import { useNavigate, useParams } from "react-router-dom";
import { getUrl } from "../../Utils/StorageMethods";

const PrintScreen = () => {
  let [formMapped, setFormMapped] = useState([]);
  let [applicantSelfie, setApplicantSelfie] = useState();
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
              var fv = await getDoc(
                doc(database, "field_verifier", assignment.data()?.assigned_to)
              );
              setAssignment(assignment.data());
              setForm(formData.data());
              setResponse(formResponse.data());
              setFv(fv.data());
              console.log("assignment", assignment.data());
              console.log("formData", formData.data());
              console.log("formResponse", formResponse.data());
              console.log("fv", fv.data());
              await mapFormDataToResponse(formData.data(), formResponse.data());
            }
          );
        });
      }
    );
  };

  const mapFormDataToResponse = async (formData, formResponse) => {
    setFormMapped([]);
    for (let i = 0; i < formData.data.length; i++) {
      let obj = {};
      obj[formData.data[i].name] = [];
      formMapped.push(obj);
    }

    for (let key in formResponse) {
      const array = key.split(',');
      let obj = {};
      let label = formData.data[array[0]].fields[array[1]].label;

      if (array.length == 4) {
      }

      if (String(label.trim()) == "Applicant Selfie") {
        let pfpUrl = String(formResponse[key]);
        if (pfpUrl !== undefined && pfpUrl !== null && pfpUrl !== "") {
          await getUrl(pfpUrl).then(async (url) => {
            setApplicantSelfie(url);
            obj[label] = url;
          });
        }
      } else {
        obj[label] = formResponse[key];
      }

      formMapped[array[0]][Object.keys(formMapped[array[0]])].push(obj);
    }
    setFormMapped(formMapped);
    console.log(formMapped);
  }

  const handleSort = (item) => {
    let returnValue;
    let label = Object.keys(item)[0]

    if (label == "Applicant Selfie ") {
      returnValue = (<><img src={item[Object.keys(item)[0]]} style={{ width: "200px" }} /></>);
      return returnValue;
    }

    if (item[Object.keys(item)[0]].hasOwnProperty('id')) {
      returnValue = String(item[Object.keys(item)[0]].value);
      return returnValue;
    }

    returnValue = String(item[Object.keys(item)[0]]);
    return returnValue;
  }


  useEffect(() => {
    getDetails();
    mapFormDataToResponse();
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

        <div style={{}}>
          <div>

            {formMapped.map((item, index) => (
              <div>
                <div style={{ border: "1px solid black" }}>
                  <h3 key={index} style={{ backgroundColor: "#002060", color: "white", padding: "3px 10px", borderBottom: "1px solid black", fontWeight: "800" }}>
                    {Object.keys(item)[0]}
                  </h3>
                  <div style={{}}>
                    {Object.values(item)[0].map((item2) => (
                      <div style={{ borderBottom: "1px solid black", width: "100%", display: "flex" }}>
                        <div style={{ width: "35%", padding: "3px 10px", display: "inline-block", fontWeight: "800" }}>
                          {Object.keys(item2)[0]}
                        </div>
                        <div onClick={() => handleSort(item2)} style={{ width: "65%", padding: "3px 10px", borderLeft: "1px solid black", display: "inline-block" }}>
                          {handleSort(item2)}

                          {/* {Object.values(item2)[0].map((item3) => (
                            <div style={{ borderBottom: "1px solid black", width: "100%", display: "flex" }}>
                              <div style={{ width: "35%", padding: "3px 10px", display: "inline-block", fontWeight: "800" }}>
                                {Object.keys(item3)[0]}
                              </div>
                              <div onClick={() => handleSort(item3)} style={{ width: "65%", padding: "3px 10px", borderLeft: "1px solid black", display: "inline-block" }}>
                                {handleSort(item3)}
                                &nbsp;
                              </div>
                            </div>
                          ))} */}
                          &nbsp;
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <br></br>
                <br></br>
                <br></br>

              </div>
            ))}



          </div>
        </div>

        <br></br>

        {/* <div style={{}}>
          <div
            style={{ border: "1px solid black" }}
          >
            <h3 style={{ backgroundColor: "#002060", color: "white", padding: "3px 10px", borderBottom: "1px solid black", fontWeight: "800" }}>
              Customer Details
            </h3>
            <div style={{}}>
              {Object.keys(assignment.persons[0].details).map((key) => (
                <div style={{ borderBottom: "1px solid black", width: "100%" }}>
                  <div style={{ width: "35%", padding: "3px 10px", display: "inline-block", fontWeight: "800" }}>
                    {key}
                  </div>
                  <div style={{ width: "65%", padding: "3px 10px", borderLeft: "1px solid black", display: "inline-block" }}>
                    {assignment.persons[0].details[key]}
                    &nbsp;
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <br></br> */}

        {/* <div style={{}}>
          <div
            style={{ border: "1px solid black" }}
          >
            <h3 style={{ backgroundColor: "#002060", color: "white", padding: "3px 10px", borderBottom: "1px solid black", fontWeight: "800" }}>
              Agency Details
            </h3>
            <div style={{}}>
              {Object.keys(agency).map((key) => (
                <div style={{ borderBottom: "1px solid black", width: "100%", display: "flex" }}>
                  <div style={{ width: "35%", padding: "3px 10px", display: "inline-block", fontWeight: "800" }}>
                    {key}
                  </div>
                  <div style={{ wordWrap: "break-word", width: "65%", padding: "3px 10px", borderLeft: "1px solid black", display: "inline-block" }}>
                    {agency[key]}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <br></br>

        <div style={{}}>
          <div
            style={{ border: "1px solid black" }}
          >
            <h3 style={{ backgroundColor: "#002060", color: "white", padding: "3px 10px", borderBottom: "1px solid black", fontWeight: "800" }}>
              Files list
            </h3>
            <div style={{}}>
              {assignment.files.map((file) => (
                <div style={{ borderBottom: "1px solid black", width: "100%" }}>
                  <div style={{ padding: "3px 10px", display: "inline-block", fontWeight: "800" }}>
                    {file.name}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <br></br> */}


      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default PrintScreen;
