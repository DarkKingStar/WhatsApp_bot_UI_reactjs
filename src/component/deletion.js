import {db} from '../firebase'
import { doc, deleteDoc} from "firebase/firestore";
const Deletion = async(props) =>{
    await deleteDoc(doc(db, "commands", props));
}
export default Deletion