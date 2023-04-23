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

import Abc from './Abc';
import Logout from './components/pages/Logout';
import { useCookies,Cookies  } from 'react-cookie';
import Template_layout from './components/pages/Template_layout';
import './scss/style.scss'

function App() {
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const person = cookies.get('person')
  console.log("id = " + uid + " | person : " + person)
  return (
    <Router>
      <div className="App">

        <Container>        
          <Row>
            <Col >
              <div className="wrapper">
                <Routes>
                  <Route exact path="/" element={<Abc/>} />
                  <Route path="/demo" element={<Cards/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/abc" element={<Abc/>} />
                  <Route path="/patient/signup" element={<Signup/>} />
                  <Route path="/doctor/signup_doctor" element={<Signup_doctor/>} />
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/layout/*" element={<Template_layout/>} />
                  <Route path="/doctor/dashboard" element={<Dashboard_doctor/>} />
                  <Route path="/doctor/chat" element={<Chat_doctor/>} />
                  <Route path="/doctor/chat_list" element={<Chatlist_doctor/>} />
                  <Route path="/doctor/appointment" element={<Appointment_doctor/>} />
                  <Route path="/doctor/search" element={<Search_doctor/>} />
                  <Route path="/doctor/info" element={<Info_doctor/>} />
                  
                  <Route path="/patient/dashboard" element={<Dashboard_patient/>} />
                  <Route path="/patient/search" element={<Search_patient/>} />
                  <Route path="/patient/chat_list" element={<Chatlist_patient/>} />
                  <Route path="/patient/chat" element={<Chat_patient/>} />
                  <Route path="/patient/info" element={<Info_patient/>} />
                  
                  
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