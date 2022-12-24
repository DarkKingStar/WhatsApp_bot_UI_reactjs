import { doc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
const Updating = async(usercommand,userreply) =>{
    const docRef = doc(db, "commands", usercommand);
    const data = {
        title: usercommand,
        reply: userreply
      };
      await updateDoc(docRef, data)
      .then(docRef => {
          console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
          console.log(error);
      })
}
export default Updating