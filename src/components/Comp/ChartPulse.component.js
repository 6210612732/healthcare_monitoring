import React, { Component } from 'react'
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
import { Line} from 'react-chartjs-2';
//import faker from 'faker';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function range(start, count) {
  if(arguments.length == 1) {
      count = start;
      start = 0;
  }

  var foo = [];
  for (var i = 0; i < count; i++) {
      foo.push(start + i);
  }
  return foo;
}

function timeLabel(){
  var timeArray = [],
    d = new Date(),
    h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds()
  //for (var i = h; i < 20; ++i) {
      //for (var j = i==h ? Math.ceil(m/15) : 0; j < 4; ++j) {
          timeArray.push(h + ':' + m + ':' + s );
      //}
  //}
  return timeArray;
}


export const options = {
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

// heart rate 70-200
// pressure 60-220 upper/lower
// oxy 60-100%

const labels = ["7d ago","20:34","1m ago", "now"];
const time_label = timeLabel();
console.log(time_label);

const temp = [107,108,107,107]
export const data = {
  labels,
  datasets: [
    {
      label: 'rate (bpm)',
      data: temp,
      borderColor: '#77dd77',
      backgroundColor: '#77dd77',
    },
  ],
};

export default class ChartPulse extends Component {


  componentDidMount() {
    console.log(this.props.name + " haha")
    //this.setState({ name : 'world' });
  }

  render() {
    return (
        <Line options={options} data={data}  width={250} height={110} />
    )
  }
}
