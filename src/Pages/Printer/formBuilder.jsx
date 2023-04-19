import React from 'react'

function FormBuilder(props) {

    switch (props.field) {
        case "text":
            return (
                <div key={props.data.id}>
                  <label>{props.data.label}</label>
                  <input type="text" />
                </div>
              );
        case "text-input":
        return (
            <div key={props.data.id}>
            <label>{props.data.label}</label>
            <input type="text" />
            </div>
        );
        case "date-time":
          return (
            <div key={props.data.id}>
              <label>{props.data.label}</label>
              <input type="datetime-local" />
            </div>
          );
        case "aadhar":
        return (
            <div key={props.data.id}>
            <label>{props.data.label}</label>
            <input type="text" />
            </div>
        );
        case "phone":
            return (
              <div key={props.data.id}>
                <label>{props.data.label}</label>
                <input type="text" />
              </div>
            );
            case "table":
                return (
                  <div key={props.data.id}>
                    <label>{props.data.label}</label>
                    {/* Render table component */}
                  </div>
            );
            case "file":
                return (
                  <div key={props.data.id}>
                    <label>{props.data.label}</label>
                    <img src={props.data.value} alt={props.data.label} />
                  </div>
                );
                case "toggle-input":
                    return (
                      <div key={props.data.id}>
                        <label>{props.data.label}</label>
                        <input type="checkbox" />
                      </div>
                    );
                    case "signature":
                        return (
                          <div key={props.data.id}>
                            <label>{props.data.label}</label>
                            <input type="text" />
                          </div>
                        );
                        case "image":
                            return (
                              <div key={props.data.id}>
                                <label>{props.data.label}</label>
                                <img src={props.data.value} alt={props.data.label} />
                              </div>
                            );                   
           
    
        default:
            return null;
    }
  
}

export default FormBuilder