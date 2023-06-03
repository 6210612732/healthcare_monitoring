import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,  
  MDBCard,
  MDBCardBody,
  MDBTextArea
}
from 'mdb-react-ui-kit';
import styles from '../../CssComponent/Signup_p.module.css';
import logo from '../../../assets/pic/logo.jpg'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';

export default class Signup extends Component {
  
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            plainpass: '',
            blood: '',
            tel: '',
            address: '',
            name_sur: '',
            drug: '',
            age: '',
            kg: '',
            CSSLayerStatementRule: '',
            allergic: '',
            gender: '',
            chronic_disease: '',
            being_treated: '',
            des: ''
        }
    }

    onChangeUsername = (e) => {
        this.setState({ username: e.target.value })
        //console.log(this.state);
    }

    onChangeEmail= (e) => {
        this.setState({ email: e.target.value })
    }

    onChangePassword = (e) => {
        this.setState({ plainpass: e.target.value })
    }

    onChangetel = (e) => {
        this.setState({ tel: e.target.value })
    }
    onChangeaddress = (e) => {
        this.setState({ address: e.target.value })
    }
    onChangename_sur = (e) => {
        this.setState({ name_sur: e.target.value })
    }
    onChangedrug = (e) => {
        this.setState({ drug: e.target.value })
    }
    onChangeblood = (e) => {
        this.setState({ blood: e.target.value })
    }
    onChangeage = (e) => {
        this.setState({ age: e.target.value })
    }
    onChangekg_cm = (e) => {
        this.setState({ kg: e.target.value })
    }
    onChangekg_cm2 = (e) => {
      this.setState({ cm: e.target.value })
  }
    onChangeallergic = (e) => {
        this.setState({ allergic: e.target.value })
    }
    onChangegender = (e) => {
        this.setState({ gender: e.target.value })
    }
    onChangechronic_disease = (e) => {
        this.setState({ chronic_disease: e.target.value })
    }
    onChangedes = (e) => {
        this.setState({ des: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("signup success");
        const PObject = {
            username: this.state.username,
            email: this.state.email,
            plainpass: this.state.plainpass,   
            tel: this.state.tel,
            address: this.state.address,  
            detail: [{
                description: this.state.des,
                name_sur: this.state.name_sur,
                drug: this.state.drug,
                age: this.state.age,
                gender: this.state.gender,
                kg_cm: this.state.kg+"/"+this.state.cm,
                blood_group: this.state.blood,
                allergy: this.state.allergic, 
                chronic_disease: this.state.chronic_disease,
                being_treated: this.state.being_treated,
            }],
            status: "0",
        };
        
        axios.post('http://localhost:8082/api/patient/create-patient',PObject).then(res => 
        console.log(res.data));

        Swal.fire({
            icon: 'success',
            title: 'signup success',
            showConfirmButton: false,
            timer: 3000
          }).then(
             () => { window.location.replace('/'); }
          )
        //console.log('student success create ');
    }

  render() {
    return (
        <MDBContainer className={`my-5 ${styles.gradient_form}`}>
            <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '5000px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
          <MDBRow>
            <MDBCol col='6' className="mb-5">
              <div className="d-flex flex-column ms-5">

                <div className="text-center">
                  <img src={require ("../../../assets/pic/logo_r.png")} height={130}
                    alt="logo" />
                  <h4 className="mt-5 mb-5 pb-1">Patient  Sign up</h4>
                </div>
                <Form onSubmit={this.onSubmit}>
                <MDBInput wrapperClass='mb-4' placeholder='Username' onChange={this.onChangeUsername} id='form3' type='text'/>
                <MDBInput wrapperClass='mb-4' placeholder='Email address' onChange={this.onChangeEmail} id='form1' type='email'/>
                <MDBInput wrapperClass='mb-4' placeholder='Password' onChange={this.onChangePassword} id='form2' type='password'/>
                <div className="text-center pt-1 mb-5 pb-1">
                  <MDBBtn type='submit' className={`mb-0 w-50 ${styles.gradient_custom_2}`}>Sign up</MDBBtn>
                  
                </div>
                </Form>    
              </div>
            </MDBCol>
    
            <MDBCol col='6' className="mb-5">
              <div className={`d-flex flex-column  justify-content-center  h-100 mb-4 ${styles.gradient_custom_2}`}>
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4">patient information</h4>
                  <Form.Label>ข้อมูลอื่นๆ :</Form.Label>
                  <MDBInput wrapperClass='mb-4' placeholder='ชื่อ-นามสกุล' onChange={this.onChangename_sur}  type='text'/>
                  <MDBInput wrapperClass='mb-4' placeholder='เบอร์โทร' onChange={this.onChangetel} id='form4' type='text'/>
                  <MDBInput wrapperClass='mb-4' placeholder='ที่อยู่' onChange={this.onChangeaddress} id='form5' type='email'/>

                  <select className='mb-4' class="form-select" onChange={this.onChangegender} aria-label="Default select example" title="Choose Option">
                   <option class="disabled" >เพศ</option>
                    <option onChange={this.onChangegender} value="ชาย">ชาย</option>
                    <option onChange={this.onChangegender} value="หญิง">หญิง</option>
                  </select>
                  
                  <div className='mb-4 mt-4'>
                  <select  class="form-select" onChange={this.onChangeblood} aria-label="Default select example" title="Choose Option">
                    <option class="disabled" >กรุ๊ปเลือด</option>
                    <option onChange={this.onChangeblood} value="O">O</option>
                    <option onChange={this.onChangeblood} value="A">A</option>
                    <option onChange={this.onChangeblood} value="B">B</option>
                    <option onChange={this.onChangeblood} value="AB">AB</option>
                  </select>
                  </div>
                  <div className='mb-4 mt-4'>
                  <select  class="form-select" onChange={this.onChangeage} aria-label="Default select example" title="Choose Option">
                    <option class="disabled" >อายุ</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                    <option value="60">60</option>
                    <option value="61">61</option>
                    <option value="62">62</option>
                    <option value="63">63</option>
                    <option value="64">64</option>
                    <option value="65">65</option>
                    <option value="66">66</option>
                    <option value="67">67</option>
                    <option value="68">68</option>
                    <option value="69">69</option>
                    <option value="70">70</option>
                  </select>
                  </div>


                  <div class="d-flex justify-content-center">
                  <MDBInput wrapperClass='mb-4' placeholder='น้ำหนัก(kg)' onChange={this.onChangekg_cm} type='text'/>
                  <p> &nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp; </p>
                  <MDBInput wrapperClass='mb-4' placeholder='ส่วนสูง(cm)' onChange={this.onChangekg_cm2} type='text'/>
                  </div>
                  <MDBInput wrapperClass='mb-4' placeholder='แพ้ยา' onChange={this.onChangedrug}  type='text'/>
                  <MDBTextArea wrapperClass='mb-4' placeholder='อาการแพ้' onChange={this.onChangeallergic} type='text'/>
                  <MDBTextArea wrapperClass='mb-4' placeholder='โรคประจำตัว' onChange={this.onChangechronic_disease} type='text'/>
                  <MDBTextArea wrapperClass='mb-4' placeholder='หมายเหตุ เพิ่มเติม' onChange={this.onChangedes} type='text'/>
                </div>
              </div>
    
            </MDBCol>
          </MDBRow>
          </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      );
  }
}
