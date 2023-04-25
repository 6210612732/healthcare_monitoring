import React, { Component } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";
import socketIO from 'socket.io-client';
const socket = socketIO.connect("http://localhost:8084");


function ChartOxi({token}){
  const [mode, setmode] = useState("");
  const [d_data, setd_data] = useState([]);
  const [data, setdata] = useState([]);
  const [cc, setcc] = useState(2);
  const [a, seta] = useState(0);
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [re_message, setre_message] = useState("");
  const [message, setmessage] = useState("");
  let temp = []
  let b = 0
  function clean_data(item){

    for(let i=0;i<item.length;i++){
      setdata(0)
          if('Oximeter' in item[i]){
              //console.log(item[i].Oximeter[0].SAT)
              temp=data; temp.push({date:item[i].date,time:item[i].time,oxi:item[i].Oximeter[0].SAT})
              setdata(temp); 
          }
      }
  
      const data_2 = data.reverse()
      seta(data_2[0].oxi)
      settime(data_2[0].time)
     console.log(a)
  }

  useEffect(() => {
    socket.on('all_device_update', (data) => setmessage(data));
    check()
    if(cc>0){
      axios.get('http://localhost:8082/api/monitor/mini_monitor/'+token+"/"+"oxi").then(res => {
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
  const dataBar = {
    labels: [time],
    datasets: [
      {
        label: "%",
        backgroundColor: "#EC932F",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [a]
      }
    ]
  };
  

const options = {
  plugins: {
    datalabels: {
      display: false,
      color: "black",
      formatter: Math.round,
      anchor: "end",
      offset: -20,
      align: "start"
    }
  },
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
 }
};

  return(
    <div >
    <Bar data={dataBar} options={options}  plugins={[ChartDataLabels]} width={90} height={200} />
  </div>

  )

}

export default ChartOxi




