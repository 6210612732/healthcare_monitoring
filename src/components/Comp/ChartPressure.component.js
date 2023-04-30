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

function CharPressure({token}){
  const [mode, setmode] = useState("");
  const [d_data, setd_data] = useState([]);
  const [data, setdata] = useState([]);
  const [cc, setcc] = useState(1);
  const [a, seta] = useState(0);
  const [count, setcount] = useState(0);
  const [list_upper, set_upper] = useState([]);
  const [list_lower, set_lower] = useState([]);
  const [list_time, set_time] = useState([]);
  const [list_date, set_date] = useState([]);
  const [re_message, setre_message] = useState("");
  const [message, setmessage] = useState("");
  let b = {}
  let temp = []
  async function clean_data(item){
    setdata([])
    setcount(0)
   for(let i=0;i<item.length;i++){
    setdata(0)
    setcount(0)
        if('BloodPress' in item[i]){
            //console.log(item[i].Oximeter[0].SAT)
            if(item[i].BloodPress.length != 0 ){
            temp=data; temp.push({date:item[i].date,time:item[i].time,upper:item[i].BloodPress[0].SYS,lower:item[i].BloodPress[0].DIA})
            setdata(temp);  const dd = count; setcount(dd+1)
            //if(count>=4){  break  }
            }
        }
    }

    const data_2 = data.reverse()
    //data.reverse()
    const data3 = [{upper:data_2[3].upper,lower:data_2[3].lower, date:data_2[3].date, time:data_2[3].time },
                  {upper:data_2[2].upper,lower:data_2[2].lower, date:data_2[2].date, time:data_2[2].time },
                  {upper:data_2[1].upper,lower:data_2[1].lower, date:data_2[1].date, time:data_2[1].time },
                  {upper:data_2[0].upper,lower:data_2[0].lower, date:data_2[0].date, time:data_2[0].time },
                  ]
    //setdata(data3)   
    //console.log(data_2)
     
      set_upper([data3[0].upper,data3[1].upper,data3[2].upper,data3[3].upper]);
      set_lower([data3[0].lower,data3[1].lower,data3[2].lower,data3[3].lower]);
      set_time([data3[0].time,data3[1].time,data3[2].time,data3[3].time]);
      set_date([data3[0].date,data3[1].date,data3[2].date,data3[3].date]);
    
  }

  

  useEffect(() => {
    socket.on('all_device_update', (data) => setmessage(data));
    check()
    if(cc>0){
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

  function check(){
    if(message!=re_message){
      setre_message(setmessage)
      setcc(1)
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

const labels = list_time
const options = {
  responsive: true,
  plugins: {
   // legend: {
   //   position: 'top' as const, 
   // },
    title: {
      display: true,
      text: 'Blood Pressure (mmhg)',
    },
  },
};



const data2 = {
  labels,
  datasets: [
    {
      label: 'upper',
      data: list_upper,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        label: 'lower',
        data: list_lower,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
  ],
};

  return(
    <div >
    <Line options={options} data={data2}    />
  </div>

  )

}

export default CharPressure




