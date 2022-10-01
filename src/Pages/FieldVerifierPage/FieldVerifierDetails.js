import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../Firebase/Firebase";

const FieldVerifierDetails = (props) => {

    const [data, setData] = useState({});

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(database, "field_verifier", props.id),
          snapshot => {
            setData(snapshot.data());
          }
        );
        return () => {
            unsubscribe();
        }
    }, [props]);

    return (<div>
        {data.name}
    </div>);
}

export default FieldVerifierDetails;