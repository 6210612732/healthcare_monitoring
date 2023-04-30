import React, { Component } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import socketIO from 'socket.io-client';
const socket = socketIO.connect("http://localhost:8084");

function CheckStatus({token,ind}){
  const [mode, setmode] = useState("");
  const [d_data, setd_data] = useState([]);
  const [data, setdata] = useState([]);
  const [cc, setcc] = useState(1);
  const [oxi, setoxi] = useState(0);
  const [pulse1, setpulse1] = useState(0);
  const [pulse2, setpulse2] = useState(0);
  const [upper, setupper] = useState(0);
  const [lower, setlower] = useState(0);
  const [count, setcount] = useState(0);
  const [list_pulse, set_pulse] = useState([]);
  const [list_time, set_time] = useState([]);
  const [list_date, set_date] = useState([]);
  const [re_message, setre_message] = useState("");
  const [message, setmessage] = useState("");
  const [v, setv] = useState(0);

  let temp_l=[]
  let temp = []
  function clean_data(item){
    for(let i=0;i<item.length;i++){
      setdata(0)
          if('Oximeter' in item[i]){
              //console.log(item[i].Oximeter[0].SAT)
             if(item[i].Oximeter.length != 0 ){
              temp=data; temp.push({date:item[i].date,time:item[i].time,oxi:item[i].Oximeter[0].SAT,pulse2:item[i].Oximeter[0].PUL})
              setdata(temp); 
            }
          }
          if('BloodPress' in item[i]){
            //console.log(item[i].Oximeter[0].SAT)
            if(item[i].BloodPress.length != 0 ){
              temp=data; temp.push({pulse1:item[i].BloodPress[0].PUL,upper:item[i].BloodPress[0].SYS,lower:item[i].BloodPress[0].DIA})
            setdata(temp);  const dd = count; setcount(dd+1)
            //if(count>=1){  break  }
            }
        }



      }
  
      const data_2 = data.reverse()
      setoxi(data_2[0].oxi)
      setpulse1(data_2[0].pulse1)
      setpulse2(data_2[0].pulse2)
      setupper(data_2[0].upper)
      setlower(data_2[0].lower)
      
      //settime(data_2[0].time)
      if(90>=parseInt(oxi) && parseInt(oxi) > 5){
        setv(1)
      }
      else if(5 < parseInt(pulse1) && parseInt(pulse1) > 150){
        setv(2)
      }
      else if(5 < parseInt(pulse2) && parseInt(pulse2) > 150){
        setv(3)
      }
      else if(5 < parseInt(upper) && parseInt(upper) > 160){
        setv(4)
      }
      else if(5 < parseInt(lower) && parseInt(lower) > 100){
        setv(5)
      }
      else{
        setv(0)
      }

  }

  useEffect(() => {
    socket.on('all_device_update', (data) => setmessage(data));
    check()
    if(cc>0){
      //console.log("workk")
      axios.get('http://localhost:8082/api/monitor/mini_monitor/'+token+"/"+"pressure").then(res => {
        //console.log(res.data)
        setd_data(res.data)
        clean_data(res.data)
      //console.log(d_data)
    })
    const dd = cc 
    setcc(dd-1)
    }
  },[cc,message]);
  //console.log(message)
  function check(){
    if(message!=re_message){
      setre_message(setmessage)
      setcc(2)
    }
  }
  

function status(){
  if(v!=0){
    
    if(v == 1){ alert("alert -> index : " + (ind+1) + " Oxi low");  return (  <div> Oxi low</div> ) }
    else if(v == 2){ alert("alert -> index : " + (ind+1) + " heart rate in excess"); return (  <div>heart rate in excess</div> ) }
    else if(v == 3){ alert("alert -> index : " + (ind+1) + " heart rate in excess"); return (  <div>heart rate in excess</div> ) }
    else if(v == 4){ alert("alert -> index : " + (ind+1) + " blood pressure too high"); return (  <div>blood pressure too high</div> ) }
    else if(v == 5){ alert("alert -> index : " + (ind+1) + " blood pressure too high"); return (  <div>blood pressure too high</div> ) }
  }
  else{   return (<div>Normal</div> )}
}


  return(
    <div >
    {status()}
  </div>

  )

}

export default CheckStatus




