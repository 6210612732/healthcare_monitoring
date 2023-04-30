import React, { Component } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from 'react-chartjs-2';
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import socketIO from 'socket.io-client';
const socket = socketIO.connect("http://localhost:8084");

function ChartPulse({token}){
  const [mode, setmode] = useState("");
  const [d_data, setd_data] = useState([]);
  const [data, setdata] = useState([]);
  const [cc, setcc] = useState(1);
  const [a, seta] = useState(0);
  const [count, setcount] = useState(0);
  const [list_pulse, set_pulse] = useState([]);
  const [list_time, set_time] = useState([]);
  const [list_date, set_date] = useState([]);
  const [re_message, setre_message] = useState("");
  const [message, setmessage] = useState("");
  let b = {}
  let temp_l=[]
  let temp = []
  async function clean_data(item){
    setcount(0)
   for(let i=0;i<item.length;i++){
    setdata(0)
    setcount(0)
        if('BloodPress' in item[i]){
            //console.log(item[i].Oximeter[0].SAT)
            if(item[i].BloodPress.length != 0 ){
            temp=data; temp.push({date:item[i].date,time:item[i].time,pulse:item[i].BloodPress[0].PUL})
            setdata(temp);  const dd = count; setcount(dd+1)
            }
            //if(count>=1){  break  }
        }
        else if('Oximeter' in item[i]){
          if(item[i].Oximeter.length != 0 ){
          temp=data; temp.push({date:item[i].date,time:item[i].time,pulse:item[i].Oximeter[0].PUL})
            setdata(temp);  const dd = count; setcount(dd+1)
          }
            //if(count>=1){  break  }
        } 
    }
   /*   if(count<4){
      for(let j = count;j<4;j++){
        temp=data; temp.push({date:"0",time:"0",pulse:"0"}); setdata(temp); 
        const dd = count; setcount(dd+1)
      }
    } */
    const data_2 = data.reverse()
    //data.reverse()
    const data3 = [{pulse:data_2[3].pulse, date:data_2[3].date, time:data_2[3].time },
                  {pulse:data_2[2].pulse, date:data_2[2].date, time:data_2[2].time },
                  {pulse:data_2[1].pulse, date:data_2[1].date, time:data_2[1].time },
                  {pulse:data_2[0].pulse, date:data_2[0].date, time:data_2[0].time },
                  ]
    //setdata(data3)   
    //console.log(data3)
     
      set_pulse([data3[0].pulse,data3[1].pulse,data3[2].pulse,data3[3].pulse]);
      set_time([data3[0].time,data3[1].time,data3[2].time,data3[3].time]);
      set_date([data3[0].date,data3[1].date,data3[2].date,data3[3].date]);
    
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
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top', 
    },
    title: {
      display: true,
      text: 'Heart Rate (bpm)',
    },
  },
};

const labels = list_time
//console.log(list_time)
const temp2 = [107,108,107,107]
const data2 = {
  labels,
  datasets: [
    {
      label: 'rate (bpm)',
      data: list_pulse,
      borderColor: '#77dd77',
      backgroundColor: '#77dd77',
    },
  ],
};



  return(
    <div >
    <Line options={options} data={data2}  width={250} height={110} />
  </div>

  )

}

export default ChartPulse




