import React, { Component } from 'react'
import './CssComponent/Card.css';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ChartPulse from './Comp/ChartPulse.component';
import ChartPressure from './Comp/ChartPressure.component';
import ChartOxi from './Comp/ChartOxi.component';
//import Mqx from '../backend/mqtt/mqtt_connect';


export default class Cards extends Component {
  render() {
    return (
        <div className={`app pb-2`}>
            <div>
                <section className={`form-block `}>
                    <header className="form-block__header">
                        <h1>Demo Monitoring</h1>
                        <div className="form-block__toggle-block">
                            <span>display real time chart</span>
                        </div>                        
                    </header>
                </section>
                <section className={`form-block-2 `}>
                <ChartPulse/>
                </section>
                <section className={`form-block-2 `}>
                <ChartPressure/>
                </section>
                <section className={`form-block-2 `}>
                <ChartOxi/>
                </section>
                
                

            </div>
        </div>
    )
  }
}

