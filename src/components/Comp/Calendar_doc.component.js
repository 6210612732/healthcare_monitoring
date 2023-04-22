import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { useCookies,Cookies  } from 'react-cookie';
import axios from 'axios'


function Calendar_doc() {
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [date, setDate] = useState(new Date());

  const [d_ls, setd_ls] = useState([]);
  const [user_data, setuser_data] = useState([]);
  let dev_temp = []
  useEffect(() => {
    axios.get('http://localhost:8082/api/appointment/doc_schedule/'+uid).then(res => {
      setd_ls(res.data)
      console.log(res.data)
    }) 
    
  },[]);

  function showLog(zz){
    const d_day = zz.getFullYear()+"-"+zz.getMonth()+"-"+zz.getDate()
    const show_text = "don't have any appointment in this day"
    const count = 0
    const temp_text = ""
    for(let i=0;i<d_ls.length;i++){
      /*if(d_day.day == d_ls.appoint[0].date){
        count+=1;
        
      }*/
      console.log(d_ls[i])
    }
    
    Swal.fire({
      title: d_day,
      text: show_text,
      showConfirmButton: false,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
      cancelButtonText: `close`,
    })
  }
  return (
    <div className=''>
      <h1 className='text-center'>Schedule</h1>
      <div  className="d-flex align-items-center justify-content-center text-center not-found-container my-5 w-100"  >
        <Calendar onChange={(e) => showLog(e)} value={date} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default Calendar_doc;

