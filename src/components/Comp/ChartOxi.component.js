import React, { Component } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

export default class ChartOxi extends Component {
  componentDidMount() {
    Chart.register(ChartDataLabels);
  }

  render() {
    const dataBar = {
      labels: ["time"],
      datasets: [
        {
          label: "good",
          backgroundColor: "#EC932F",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [98]
        }
      ]
    };

    const options = {
      plugins: {
        datalabels: {
          display: true,
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
    return (
      <div >
        <Bar data={dataBar} options={options}  plugins={[ChartDataLabels]} width={90} height={200} />
      </div>
    );
  }
}