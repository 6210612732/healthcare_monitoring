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
import { Line } from 'react-chartjs-2';
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
const tempupper = [107,108,109,110]
const templower = [75,75,76,76]
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
   // legend: {
   //   position: 'top' as const, 
   // },
    title: {
      display: true,
      text: 'Blood Pressure (mmhg)',
    },
  },
};

// heart rate 70-200
// pressure 60-220 upper/lower
// oxy 60-100%

const labels = ["7d ago","20:34","1m ago", "now"];
const time_label = timeLabel();
//console.log(time_label);

const fake_press = labels.map(() => faker.datatype.number({ min: 60, max: 220 }));
console.log(fake_press);
const ss = labels.map(() => fake_press.map((num) => num-1 ));
console.log(ss);

export const data = {
  labels,
  datasets: [
    {
      label: 'upper',
      data: tempupper,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        label: 'lower',
        data: templower,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
  ],
};

export default class ChartPressure extends Component {
  render() {
    return (
        <Line options={options} data={data}    />
    )
  }
}
