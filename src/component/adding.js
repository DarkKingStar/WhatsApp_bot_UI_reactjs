import { doc, setDoc } from "firebase/firestore";
import {db} from '../firebase' 
const Adding = async(command,reply) =>{
    await setDoc(doc(db, "commands", command), {
        title: command,
        reply: reply
      });
}
export default Adding