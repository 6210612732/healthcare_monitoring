import React from 'react'
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useCookies,Cookies  } from 'react-cookie';
import axios from 'axios'

function ChatMessage_p(){
  const [token, settoken] = useState("");
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [cc, setcc] = useState(1);
  const [device_ls, setdevice_ls] = useState([]);
  const [user_data, setuser_data] = useState([]);


  useEffect(() => {
    if(cc>0){ 
      /*
      const PObject = {
        d_id: "64402479b0cb49a81e4ccad0",
        p_id: "644021a7b0cb49a81e4ccac4",
      };
      axios.post('http://localhost:8082/api/chat/create_chatroom',PObject)
      */

    axios.get('http://localhost:8082/api/chat/see_chatroom_p/'+uid).then(res => {
      setuser_data(res.data)
    })
    const dd = cc; setcc(dd-1) 
    }
    },[cc]);
    
    

    function loop_bar(index){
      //<span class="badge bg-danger float-end">1</span>
      let temp_name = user_data[index].username
      let temp_recent = user_data[index].last_message
      let temp_time = user_data[index].time_last
      let temp_side = user_data[index].side
      let temp_cid = user_data[index].d_id
      console.log(temp_recent)
      return (
        <div>
        <li class="p-2 border-bottom">
          <a href={"/patient/chat?cid="+temp_cid} class="d-flex justify-content-between">
            <div class="d-flex flex-row">
              <div class="pt-1">
                <p class="fw-bold mb-0">{temp_name}</p>
                {(() => {
                    if (temp_recent == ""){return ( <p class="small text-muted mt-2">no recent chat</p> )}
                    else { 
                      if(temp_side == "doctor"){return ( <h4 class="small mt-2"> {temp_name} : {temp_recent}</h4> )}
                      else if(temp_side == "patient"){return ( <h4 class="small mt-2"> me : {temp_recent}</h4> )}
                  }
                 })()}
              </div>
            </div>
            <div class="pt-1">
              <p class="small text-muted mb-1">{temp_time}</p>
            </div>
          </a>
        </li>
        </div>
      )
    }

    return (
            <div>
              <section >

                  <div class="row">

                    <div class="">

                      <h5 class="font-weight-bold mb-3 text-center text-lg-start">Member</h5>

                      <div class="card">
                        <div class="card-body">

                          <ul class="list-unstyled mb-0">

                          {user_data.map((item, index) => (
                            <div>
                            {loop_bar(index)}
                            </div>
                          ))}
                          </ul>
                        </div>
                      </div>

                    </div>

                  </div>
              </section>
            </div>
         )
}

export default ChatMessage_p

//<span className="badge bg-danger float-end">1</span>