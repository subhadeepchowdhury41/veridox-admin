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
        console.log(formData.data())

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

    //Create skeleton ------------start------------
    for (let i = 0; i < formData.data.length; i++) {
      let obj = {};
      obj[formData.data[i].name] = [];


      for (let j = 0; j < formData.data[i].fields.length; j++) {
        let obj2 = {};

        if (formData.data[i].fields[j].label) {
          obj2[formData.data[i].fields[j].label] = "";
          obj[formData.data[i].name].push(obj2);
        }

        if (formData.data[i].fields[j].widget == "table") {
          for (let k = 0; k < formData.data[i].fields[j].rows.length; k++) {
            let obj3 = {};
            let array5 = []

            for (let m = 0; m < formData.data[i].fields[j].columns.length; m++) {
              let obj4 = {};
              obj4[formData.data[i].fields[j].columns[m].label] = "";
              array5.push(obj4)
            }


            obj3[formData.data[i].fields[j].rows[k].label] = array5;


            obj[formData.data[i].name].push(obj3);
          }
        }
      }

      formMapped.push(obj);
      console.log(formMapped)
    }
    //Create skeleton ------------end------------


    // Add data in skeleton------------start------------
    for (let key in formResponse) {
      const array = key.split(',');

      let obj = {};
      if (array.length == 2) {
        let leafLabel = Object.keys(Object.values(formMapped[array[0]])[0][array[1]])[0];

        if (formResponse[key].hasOwnProperty('id')) {
          Object.values(formMapped[array[0]])[0][array[1]][leafLabel] = formResponse[key].value;
        } else {
          Object.values(formMapped[array[0]])[0][array[1]][leafLabel] = formResponse[key];
        }
      }

      if (array.length == 4) {
        let leafLabel = Object.keys(Object.values(Object.values(Object.values(formMapped[array[0]])[0])[array[1]])[0][array[3]])[0];

        try {
          (Object.values(Object.values(Object.values(formMapped[array[1]])[0])[Number(array[2]) + 1])[0][array[3]])[leafLabel] = formResponse[key];
        }
        catch (err) {
          console.log(err);
        }
      }
    }

    // Add data in skeleton------------end------------

    setFormMapped(formMapped);
    console.log(formMapped)
  }

  const handleSort = (item, asas?) => {
    console.log(item)
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

    if (Array.isArray(item[Object.keys(item)[0]]) && item[Object.keys(item)[0]].length) {
      returnValue = (<></>);
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
                          {handleSort(item2, item)}

                          {Array.isArray(item2[Object.keys(item2)[0]]) && item2[Object.keys(item2)[0]].length &&
                            <div>
                              {Object.values(item2)[0].map((item3) => (
                                <div style={{ borderBottom: "1px solid black", width: "100%", display: "flex" }}>
                                  <div style={{ width: "35%", padding: "3px 10px", display: "inline-block", fontWeight: "800" }}>
                                    {Object.keys(item3)[0]}
                                  </div>
                                  <div onClick={() => handleSort(item3)} style={{ width: "65%", padding: "3px 10px", borderLeft: "1px solid black", display: "inline-block" }}>
                                    {handleSort(item3)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          }
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
