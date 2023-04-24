import React, { Component } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";

function ChartOxi(props){
  const [mode, setmode] = useState("");
  const [d_data, setd_data] = useState([]);
  const [data, setdata] = useState([]);
  const [cc, setcc] = useState(2);
  const [a, seta] = useState(0);
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  let temp = []
  function clean_data(item){
    for(let i=0;i<item.length;i++){
        if('Oximeter' in item[i]){
            //console.log(item[i].Oximeter[0].SAT)
            seta(item[i].Oximeter[0].SAT)
            break
        }
    } 
  }

  useEffect(() => {
    if(cc>0){
      axios.get('http://localhost:8082/api/monitor/mini_monitor/'+props.token+"/"+"oxi").then(res => {
        //console.log(res.data)
        setd_data(res.data)
        clean_data(res.data)
      //console.log(d_data)
    })
    const dd = cc 
    setcc(dd-1)
    }
  },[cc]);

  const dataBar = {
    labels: ["gg"],
    datasets: [
      {
        label: "good",
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




