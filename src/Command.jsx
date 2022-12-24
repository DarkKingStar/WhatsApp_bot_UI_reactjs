import "./Command.css"
import Deletion from "./component/deletion";
import Updating from "./component/updating";
import Adding from "./component/adding";
import { useEffect, useState } from "react";
import { db} from "./firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
function Command({opencommandtab}){
    const[updateTitle,setUpdateTitle] = useState("")
    const[updateReply,setUpdateReply] = useState("")
    const[update,setUpdate] = useState(false)
    const [data,setData] = useState([])
    useEffect(()=>{
      const docRef = collection(db,"commands")
      const q = query(docRef)
      const coms = onSnapshot(q,(querySnapshot)=>{
        setData(querySnapshot.docs.map(doc=>({...doc.data()})))
      });
      return coms;
    },[])
    const editcommand = (item) =>{
      setUpdateTitle(item.title)
      setUpdateReply(item.reply)
      setUpdate(true)
    }
    const canceledit = () =>{
      setUpdate(false)
      setUpdateTitle("")
      setUpdateReply("")
    }
    return(<>
     <div className="overlayer">
        <div className="close_tab" onClick={()=>opencommandtab(false)}>╳</div>
        <fieldset className="commands_list">
            <legend ><h3 className="div_title">Commands</h3></legend>
            {data.map((item)=>
              <button key={item.title} onClick={()=>editcommand(item)}><i>✎</i>{item.title}</button>
            )}
        </fieldset>
        <fieldset className="add_commands">
            <legend ><h3 className="div_title">{(update == true)?"Update your":"Add a new"} Command</h3></legend>
            <div>
            <label htmlFor="command">Command</label><br/>
            <input type="text" className="command_title" value={updateTitle!=""?updateTitle:""} onChange={(e)=>(update==false)?setUpdateTitle(e.target.value):setUpdateTitle(updateTitle)}/><br/>
            <label htmlFor="reply">Reply</label><br/>
            <textarea className="command_reply" value={updateReply!=""?updateReply:""} onChange={(e)=>setUpdateReply(e.target.value)}/><br/>
            <div className="btn_group">
            {(update==true) && <button className="btn_submit success" onClick={()=>Updating(updateTitle,updateReply).then(canceledit)}>Update</button>}
            {(update==false) && <button className="btn_submit primary" onClick={()=>Adding(updateTitle,updateReply).then(canceledit)}>Add</button>}
            {(update==true) && <button className="btn_submit danger" onClick={()=>Deletion(updateTitle).then(canceledit)}>Delete</button>}
            {(update==true) && <button className="btn_submit primary" onClick={canceledit}>Cancel</button>}
            </div>
            </div>
        </fieldset>
     </div>
    </>)
}
export default Command