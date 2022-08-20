import { useFormsContext } from "../../Providers/FormsProvider";


const Forms = () => {

    const {forms} = useFormsContext();

    return (<div>
      {forms.map((form, index) => (<div key={index}>
        {form.id}
      </div>))}
    </div>);
}


export default Forms;