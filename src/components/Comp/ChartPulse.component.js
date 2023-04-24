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


function ChartPulse(props){
  const [mode, setmode] = useState("");
  const [d_data, setd_data] = useState([]);
  const [data, setdata] = useState([]);
  const [cc, setcc] = useState(1);
  const [a, seta] = useState(0);
  const [count, setcount] = useState(0);
  const [list_pulse, set_pulse] = useState([]);
  const [list_time, set_time] = useState([]);
  const [list_date, set_date] = useState([]);
  let b = {}
  
  let temp = []
  async function clean_data(item){
   for(let i=0;i<item.length;i++){
        if('BloodPress' in item[i]){
            //console.log(item[i].Oximeter[0].SAT)
            temp=data; temp.push({date:item[i].date,time:item[i].time,pulse:item[i].BloodPress[0].PUL})
            setdata(temp);  const dd = count; setcount(dd+1)
            if(count>=4){  break  }
        }
        else if('Oximeter' in item[i]){
          temp=data; temp.push({date:item[i].date,time:item[i].time,pulse:item[i].Oximeter[0].PUL})
            setdata(temp);  const dd = count; setcount(dd+1)
            if(count>=4){  break  }
        } 
    }
      if(count<4){
      for(let j = count;j<4;j++){
        temp=data; temp.push({date:"0",time:"0",pulse:"0"}); setdata(temp); 
        const dd = count; setcount(dd+1)
      }
    } 
    data.splice(4);    
    for(let k=3;k>=0;k--){
      list_pulse.push(data[k].pulse)
      list_time.push(data[k].time)
      list_date.push(data[k].date)
    }
    console.log(list_time)
  }

  useEffect(() => {
    if(cc>0){
      axios.get('http://localhost:8082/api/monitor/mini_monitor/'+props.token+"/"+"pressure").then(res => {
        //console.log(res.data)
        setd_data(res.data)
        clean_data(res.data)
      //console.log(d_data)
    })
    const dd = cc 
    setcc(dd-1)
    }
  },[cc]);

  
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
console.log(list_time)
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




