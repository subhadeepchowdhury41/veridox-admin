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

              //create form json
              let formValues = await mapFormDataToResponse(formData.data(), formResponse.data());

              //attach image urls
              let imageData = await attachImageUrl(formValues);

              await setFormMapped(imageData);
            }
          );
        });
      }
    );
  };

  const mapFormDataToResponse = async (formData, formResponse) => {
    for (let key in formResponse) {
      const array = key.split(',');

      if (array.length == 2) {
        ((formData.data[array[0]]).fields[array[1]])['value'] = formResponse[key]
      }
      if (array.length == 4) {
        let column = (((formData.data[array[0]]).fields[array[1]]).columns[array[3]]);
        column['value'] = formResponse[key];
        let row = (((formData.data[array[0]]).fields[array[1]]).rows[array[2]]);

        if (!row.columns) {
          row['columns'] = []
        }
        row.columns.push(column);
      }
    }

    console.log(formData.data)
    return formData.data;
  }

  const handleSort = (item, asas?) => {
    console.log(item)
  }

  const attachImageUrl = async (data) => {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].fields.length; j++) {

        if (data[i].fields[j].widget == "image") {
          let [pfpUrl] = data[i].fields[j].value ? data[i].fields[j].value : null;
          if (pfpUrl !== undefined && pfpUrl !== null && pfpUrl !== "") {
            await getUrl(pfpUrl).then(async (url) => {
              data[i].fields[j].value = url;
            });
          }
        }

        if (data[i].fields[j].widget == "signature") {
          let pfpUrl = data[i].fields[j].value;
          if (pfpUrl !== undefined && pfpUrl !== null && pfpUrl !== "") {
            await getUrl(pfpUrl).then(async (url) => {
              data[i].fields[j].value = url;
            });
          }
        }
      }
    }
    console.log(data);
    return data;
  }



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
              }
            }
          `;
            const printWindow = window.open(
              "",
              "_blank"
            );
            printWindow.document.open();
            printWindow.document.write("<html><head><title></title>");
            // printWindow.document.write(`<style>${printStyle}</style>`);
            printWindow.document.write("</head><body>");
            printWindow.document.write(document.body.innerHTML);
            printWindow.document.write("</body></html>");
            printWindow.document.close();
            printWindow.print();
            // navigate('/dashboard/assignment/result');
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
                  <div onClick={() => handleSort(item)} key={index}
                    style={{
                      backgroundColor: "#002060",
                      color: "white", padding: "3px 10px",
                      borderBottom: "1px solid black",
                      fontWeight: "800",
                      fontSize: "20px"
                    }}>
                    {item.name}
                  </div>
                  <div style={{}}>

                    {item.fields.map((item2) => (
                      <div style={{ borderBottom: "1px solid black", width: "100%", display: "flex" }}>
                        <div style={{ width: "35%", padding: "3px 10px", display: "inline-block", fontWeight: "800" }}>
                          {item2.label}
                        </div>
                        <div onClick={() => handleSort(item2)} style={{ width: "65%", borderLeft: "1px solid black", display: "inline-block" }}>
                          {item2.widget !== "table" && item2.widget !== "dropdown" &&
                            item2.widget !== "image" &&
                            item2.widget !== "signature" &&
                            <div style={{ padding: "3px 10px" }}>
                              {item2.value}
                            </div>
                          }

                          {item2.widget == "dropdown" &&
                            <div style={{ padding: "3px 10px" }}>
                              {item2.value.value}
                            </div>
                          }

                          {item2.widget == "image" &&
                            <div style={{ padding: "3px 10px", display: "flex", justifyContent: "center" }}>
                              {/* {getImageUrl(item2.value)} */}

                              <img style={{ height: "200px" }} src={item2.value}></img>
                            </div>
                          }

                          {item2.widget == "signature" &&
                            <div style={{ padding: "3px 10px", display: "flex", justifyContent: "center" }}>
                              {/* {getImageUrl(item2.value)} */}

                              <img style={{ height: "200px" }} src={item2.value}></img>
                            </div>
                          }

                          {item2.widget == "table" &&
                            <div >
                              {item2.rows.map((item3) => (
                                <div style={{ borderBottom: "1px solid black", width: "100%", }}>
                                  <div style={{
                                    backgroundColor: "#8d8d8d",
                                    color: "white",
                                    width: "100%",
                                    display: "inline-block",
                                    fontWeight: "800",
                                    borderBottom: "1px solid black",
                                  }}>
                                    <div style={{
                                      padding: "3px 10px"
                                    }}>
                                      {item3.label}
                                    </div>
                                  </div>
                                  {item3.columns.map((item4) => (
                                    <div style={{ borderBottom: "1px solid black", display: "flex" }}>
                                      <div style={{ width: "35%", padding: "3px 10px", display: "inline-block", fontWeight: "800" }}>
                                        {item4.label}
                                      </div>
                                      <div onClick={() => handleSort(item4)}
                                        style={{
                                          width: "65%",
                                          padding: "3px 10px",
                                          borderLeft: "1px solid black",
                                          display: "inline-block"
                                        }}>
                                        {item4.value}
                                      </div>
                                    </div>
                                  ))}
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

      </div>
    </div >
  ) : (
    <div>Loading...</div>
  );
};

export default PrintScreen;
