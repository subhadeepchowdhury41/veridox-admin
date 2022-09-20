import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormBuilderContext } from "../../Providers/FormBuilderProvider";
import TemplateItem from "./TemplateItem";



const ChooseTemplatePage = () => {
    const [templates, setTemplates] = useState([]);

    const {dispatch} = useFormBuilderContext();
    const navigate = useNavigate();

    const getData = async () => {
        let data = [];
        await axios.get('https://veridocs.pythonanywhere.com/api/templates', {
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            console.log(res.data);
            res.data.forEach((temp) => {
                data.push(temp);
            })
            setTemplates(data);
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Grid container sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}>
                {templates.map((template) => {
                    return (<Grid item key={template.id} xs={12} sm={4} md={3} lg={2} sx={{
                        margin: '0.3em',
                        display: 'inline',
                        maxWidth: '200px'
                    }}>
                        <div onClick={() => {
                            dispatch({type: 'newForm', payload: template})
                            navigate('/dashboard/formBuilderPage');
                        }}>
                            <TemplateItem temp={template} />
                        </div>
                        
                    </Grid>)
                })}
            </Grid>
        </div>
    );
}

export default ChooseTemplatePage;