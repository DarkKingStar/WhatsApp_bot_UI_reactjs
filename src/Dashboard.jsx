import Command from "./Command";
import Qr from "./Qr";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
function Dashboard() {
  const [command,setCommand] = useState(false)
  const [qr,getqr] = useState(false)



  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function openqrtab(flag){
    flag ? getqr(true) : getqr(false) 
    
  }
  function opencommandtab(flag){
    flag ? setCommand(true) : setCommand(false)
  }


  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <>
      <div className="navbar">
      Welcome {name}
         <div className="navbar_right"><button className="dashboard__btn" onClick={logout}>
          Logout
         </button></div>
      </div>
      
       
    <div className="dashboard">
       <div className="dashboard__container">
         <button className="btn_dash" onClick={openqrtab}>Re/Generate QR</button>
         <button className="btn_dash" onClick={opencommandtab}>Add/Edit Commands</button>
       </div>
     </div>

     {qr && <Qr openqrtab={openqrtab}/>}
      {command && !qr &&  <Command opencommandtab={opencommandtab}/>}
     </>
  );
}
export default Dashboard;