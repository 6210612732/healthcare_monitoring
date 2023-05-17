import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
//import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

// Component Page
import Cards from './components/Card.component';
import Login from './components/pages/Login';
// doctor
import Signup_doctor from './components/pages/doctor/Signup_doctor';
import Dashboard_doctor from './components/pages/doctor/Dashboard_doctor';
import Chat_doctor from './components/pages/doctor/Chat_doctor';
import Chatlist_doctor from './components/pages/doctor/Chatlist_doctor';
import Appointment_doctor from './components/pages/doctor/Appointment_doctor';
import Search_doctor from './components/pages/doctor/Search_doctor';
import Info_doctor from './components/pages/doctor/Info_doctor';
// patient
import Signup from './components/pages/patient/Signup_patient';
import Dashboard_patient from './components/pages/patient/Dashboard_patient';
import Search_patient from './components/pages/patient/Search_patient';
import Chatlist_patient from './components/pages/patient/Chatlist_patient';
import Chat_patient from './components/pages/patient/Chat_patient';
import Info_patient from './components/pages/patient/Info_patient';
import Appointment_patient from './components/pages/patient/Appointment_patient';
// admin
import Dashboard_admin from './components/pages/admin/Dashboard_admin';
import Dashboard_admin2 from './components/pages/admin/Dashboard_admin2';
import Doc_dashboard from './components/pages/admin/Admin_doc_dash';
import Pat_dashboard from './components/pages/admin/Admin_pat_dash';
import Doc_calendar from './components/pages/admin/Ad_Calendar_doc.component';
import Pat_calendar from './components/pages/admin/Ad_Calendar_pat.component';

import Abc from './Abc';
import Abcd from './Abcd';
import Logout from './components/pages/Logout';
import { useCookies,Cookies  } from 'react-cookie';
import Template_layout from './components/pages/Template_layout';
import './scss/style.scss'
import socketIO from 'socket.io-client';

//require('dotenv').config();
const socket = socketIO.connect("http://localhost:8084");

function App() {
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const person = cookies.get('person')
  const urname = cookies.get('urname')
  const time_login = cookies.get('time_login')
  console.log("id = " + uid + " | person : " + person + " | username : " + urname + " | time_login : " + time_login)
  return (
    <Router>
      <div className="App">

        <Container>        
          <Row>
            <Col >
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<Abcd/>} />
                  <Route path="/demo" element={<Cards/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/abc" element={<Abc/>} />
                  <Route path="/patient/signup" element={<Signup/>} />
                  <Route path="/doctor/signup_doctor" element={<Signup_doctor/>} />
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/layout/*" element={<Template_layout/>} />
                  <Route path="/doctor/dashboard" element={<Dashboard_doctor socket={socket} />} />
                  <Route path="/doctor/chat" element={<Chat_doctor socket={socket}/>} />
                  <Route path="/doctor/chat_list" element={<Chatlist_doctor/>} />
                  <Route path="/doctor/appointment" element={<Appointment_doctor/>} />
                  <Route path="/doctor/search" element={<Search_doctor/>} />
                  <Route path="/doctor/info" element={<Info_doctor/>} />
                  
                  <Route path="/patient/dashboard" element={<Dashboard_patient socket={socket} />} />
                  <Route path="/patient/search" element={<Search_patient/>} />
                  <Route path="/patient/chat_list" element={<Chatlist_patient/>} />
                  <Route path="/patient/chat" element={<Chat_patient socket={socket}/>} />
                  <Route path="/patient/info" element={<Info_patient/>} />
                  <Route path="/patient/appointment" element={<Appointment_patient/>} />
                  
                  
                  <Route path="/admin/dashboard" element={<Dashboard_admin />} />
                  <Route path="/admin/dashboard2" element={<Dashboard_admin2 />} />
                  <Route path="/admin/doc_dashboard" element={<Doc_dashboard />} />
                  <Route path="/admin/pat_dashboard" element={<Pat_dashboard />} />
                  <Route path="/admin/doc_calendar" element={<Doc_calendar />} />
                  <Route path="/admin/pat_calendar" element={<Pat_calendar />} />
                  
                  
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>

      </div>
    </Router>
  );
}

export default App;
/*

*/