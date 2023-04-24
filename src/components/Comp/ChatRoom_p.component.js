import React from 'react'
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useCookies,Cookies  } from 'react-cookie';
const fff = process.env.host4
const url = require('url');


const ChatRoom_p = ({socket}) => {
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [chat_list, setchat_list] = useState([]);
  const [mess, setmess] = useState("");
  const [cc, setcc] = useState(2);
  const [re_message, setre_message] = useState("");
  const [message, setmessage] = useState("");
  const current_url = new URL(window.location.href)
  const [p_name, setp_name] = useState("");
  const [p_realname, setp_realname] = useState("");
  const [d_uname, setd_uname] = useState("");
  const search_params = current_url.searchParams;
  const cid = search_params.get('cid');
  
  useEffect(() => {
    socket.on('messageResponse', (data) => setmessage(data));
    check()
    if(cc>0){
      axios.get('http://localhost:8082/api/chat/chat_list/'+cid+"/"+uid).then(res => {
      setchat_list(res.data)
    })
    const dd = cc 
    setcc(dd-1)
    }
    console.log(message)
    console.log(fff)
    console.log(fff)
    console.log(fff)
    console.log(fff)
  },[cc,chat_list,message,socket]);
  
  function sendmess(){
    let getValue= document.getElementById("area");
        if (getValue.value !="") {
            getValue.value = "";
    }
    socket.emit('message',mess);
    const PObject = {p_id: uid, d_id: cid, side:"patient", message: mess, read:"no",status:"0"}
    axios.post('http://localhost:8082/api/chat/create_chatmessage/',PObject).then(res => {
      setcc(1)
      
    

  })
  }
  function check(){
    if(message!=re_message){
      setre_message(setmessage)
      setcc(2)
    }
  }
  
  function my_setmess(e){
    setmess(e.target.value)
  }

  function patient_message(index){
    return (
        <li className="d-flex justify-content-between mb-4">
        <div className='me-3'>
        <img src={require ("../../assets/pic/doc_logo.jpg")} alt="avatar"
          className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60"/>
        </div>
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between p-3">
            <p className="fw-bold mb-0">{chat_list[0].d_uname + " | "}</p>
            <p className="text-muted small mb-0"><i class="far fa-clock"></i>{chat_list[index].timestamp}</p>
          </div>
          <div class="card-body">
            <p class="mb-0">
              {chat_list[index].message}
            </p>
          </div>
        </div>
        </li>
            )
  }
  function doctor_message(index){
    return (
      <li className="d-flex justify-content-between mb-4">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between p-3">
            <p className="fw-bold mb-0">me :</p>
            <p className="text-muted small mb-0"><i class="far fa-clock"></i>{chat_list[index].timestamp}</p>
          </div>
          <div className="card-body">
            <p className="mb-0">
            {chat_list[index].message}
            </p>
          </div>
        </div>
        <img src={require ("../../assets/pic/boy_logo.jpg")} alt="avatar"
          className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60"/>
      </li>
        )
  }
    return (
      
            <div>
              <section >
                <div className="container py-5 px-auto">
                  <div className="row">
                    <div className="">
                      <ul className="list-unstyled">
                      {chat_list.map((item, index) => (
                        <div>
                          
                        {(() => {
                          if (item.side == "doctor"){
                              return ( <div>{patient_message(index)}</div> )
                            }
                          else{
                            return ( <div>{doctor_message(index)}</div> )
                          }
                        })()}
                      </div>
                       ))}
                        <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">            
                          <textarea className="form-control" onChange={(e) => my_setmess(e)} id="area" rows="2"></textarea>
                          <Button className='py-4 px-3  mx-2 'variant="dark" onClick={(()=>sendmess())}>send</Button>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
         )
}

export default ChatRoom_p