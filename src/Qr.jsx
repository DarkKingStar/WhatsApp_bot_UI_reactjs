import "./Qr.css"
import { useEffect, useState } from "react"
import {ref, child, get  } from 'firebase/database'
import { rtdb } from "./firebase";
import QRCode from "react-qr-code";

function Qr({openqrtab}){
    const [qr, getqr] = useState(null);
    const dbRef = ref(rtdb);
    get(child(dbRef, "qr/user1")).then((snapshot) => {
        if (snapshot.exists()) {
          getqr(snapshot.val());
        } else {
          console.error("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    
      
    return(<>
     <div className="qr_overlayer">
        <div className="close_tab" onClick={()=>openqrtab(false)}>╳</div>
        {qr!=null &&
        <div className="Qr_code">
        <div className="Qr_div">
        <QRCode
            size={256}
            value={qr.data}
            viewBox={`0 0 256 256`}
            />
        </div>
        </div>
        }
     </div>
    </>)
}
export default Qr