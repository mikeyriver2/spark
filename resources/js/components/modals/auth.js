import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import {
    Row,
    Col,
    Modal,
    Form,
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap';
import axios from 'axios';
import * as helpers from '../../helpers/validations';
import {loader} from '../utilities/loading';

export default class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
            companies: [],
            errors: {
                pEmail: "",
                sEmail: "",
                password: "",
                contact: "",
                company: "",
            },
            company: "",
            pEmail: "",
            sEmail: "",
            password: "",
            contact: "",
            name: "",
            catchError: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.renderCompanies = this.renderCompanies.bind(this);
    }

    componentDidMount(){
        axios.get('companies').then(res=>{
            this.setState({
                companies: res.data
            });
        }).catch(err=>{

        });
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.type != prevProps.type){
            //console.log('calling');
            let originalState = {            
                errors: {
                    pEmail: "",
                    sEmail: "",
                    password: "",
                    contact: "",
                    company: "",
                },
                company: "",
                pEmail: "",
                sEmail: "",
                password: "",
                contact: "",
                name: "",
                catchError: "",
            }
            this.setState({ //not advisable to do
                ...originalState
            });
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateCell(cell){ //only checks if string ONLY contains numbers
        var isnum = /^\d+$/.test(cell);
        return isnum;
    }

    handleChange(e,type){
        let value = e.target.value;
        let error = {
            type: type,
            error : ""
        };
        if(type == "company"){
            
        }else if(type == "pEmail" || type == "sEmail"){
            if(!this.validateEmail(value)){
                error.error = "Enter a valid Email"
            }
        }else if(type == "password"){

        }else if(type == "contact"){
            if(!this.validateCell(value)){
                error.error = "Enter a valid Contact Number"
            }
        }
        
        this.setState(prevState=>({
            errors:{
                ...prevState.errors,
                [type]: error.error
            },
            [type]: value
        }))

    }

    register(){
        let values = {
            email: this.state.pEmail,
            password: this.state.password,
            name: this.state.name,
            secondaryEmail: this.state.sEmail,
            contact: this.state.contact,
            company: this.state.company
        }
        axios.post('/register-user',values).then(res=>{
            this.login();
        }).catch(err=>{
            this.setState({
                catchError: err.response.data 
            });
        })
    }

    login(){
        let values = {
            email: this.state.pEmail,
            password: this.state.password,
            name: this.state.name
        }
        axios.post('/login-user',values).then(res=>{
            this.props.checkIfLoggedIn();
            this.props.toggleAuthModal();
        }).catch(err=>{
            this.setState({
                catchError: err.response.data 
            });
        });
    }

    renderCompanies(){
        let companyElements = [];
        if(this.state.companies && this.state.companies.length > 0){
            this.state.companies.map(company=>{
                companyElements = [...companyElements, <option>{company.name}</option> ]; 
            })
        }
        return companyElements;
    }


    render(){
        let authType = this.props.type;
        let allowSubmit = false;
        let {
            company,
            pEmail,
            sEmail, //can be optional
            password,
            contact,
            name
        } = this.state;
        
        if(authType == "register"){
            if(company != "" && pEmail != "" && password != "" && contact != "" && name != ""){
                let {
                    pEmail,
                    sEmail,
                    password,
                    contact,
                    company,
                } = this.state.errors;
                if(pEmail == "" && sEmail == "" && password == "" && contact == "" && company == ""){
                    allowSubmit = true;
                }
            }
        }else{
            if(pEmail != "" && password != ""){
                let {
                    pEmail,
                    password,
                } = this.state.errors;
                if(pEmail == "" && password == ""){
                    allowSubmit = true;
                }
            }
        }
        
        return (
            <div>
                <Modal id="auth-modal" show={this.props.show} onHide={this.props.toggleAuthModal}>
                    <Modal.Header closeButton>
                        <h4>{authType == "register" ? "Register to pledge" : "Login to pledge"}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {authType == "register" ? 
                                <div>
                                    <Form.Group controlId="formGridCompany">
                                        <Form.Control onChange={(e)=>{this.handleChange(e,"company")}} as="select">
                                            <option hidden>Select a Company</option>
                                            {this.renderCompanies()}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formGridPEmail">
                                        <Form.Control value={this.state.pEmail} onChange={(e)=>{this.handleChange(e,"pEmail")}} type="email" placeholder="Primary email" />
                                        {this.state.errors.pEmail != "" && <small style={{color:"red"}}>Please enter a valid email</small>}
                                    </Form.Group>
                                    <Form.Group controlId="formGridSEmail">
                                        <Form.Control value={this.state.sEmail} onChange={(e)=>{this.handleChange(e,"sEmail")}} type="email" placeholder="Secondary email (optional)" />
                                        {this.state.errors.sEmail != "" && <small style={{color:"red"}}>Please enter a valid email</small>}
                                    </Form.Group>
                                    <Form.Group controlId="formGridPassword">
                                        <Form.Control value={this.state.password} onChange={(e)=>{this.handleChange(e,"password")}} type="password" placeholder="Enter Password" />
                                    </Form.Group>
                                    <Form.Group controlId="formGridContact">
                                        <Form.Control value={this.state.name} onChange={(e)=>{this.handleChange(e,"name")}} placeholder="Full Name" />
                                    </Form.Group>
                                    <Form.Group controlId="formGridContact">
                                        <Form.Control value={this.state.contact} onChange={(e)=>{this.handleChange(e,"contact")}} placeholder="Contact Number" />
                                        {this.state.errors.contact != "" && <small style={{color:"red"}}>Contact Number should only be numeric</small>}
                                    </Form.Group>
                                    <Button disabled={!allowSubmit} onClick={this.register} className="submit" variant="primary">Submit</Button>
                                    {this.state.catchError != "" &&
                                        <div>
                                            <br/>
                                            <span style={{color:"red"}}>{this.state.catchError}</span>
                                        </div>
                                    }
                                </div>
                                :
                                <div>
                                    <Form.Group controlId="formGridPEmail">
                                        <Form.Control value={this.state.pEmail} onChange={(e)=>{this.handleChange(e,"pEmail")}} type="email" placeholder="Primary email" />
                                        {this.state.errors.pEmail != "" && <small style={{color:"red"}}>Please enter a valid email</small>}
                                    </Form.Group>
                                    <Form.Group controlId="formGridPassword">
                                        <Form.Control value={this.state.password} onChange={(e)=>{this.handleChange(e,"password")}} type="password" placeholder="Enter Password" />
                                    </Form.Group>
                                    <Button disabled={!allowSubmit} onClick={this.login} className="submit" variant="primary">Login</Button>
                                    {this.state.catchError != "" &&
                                        <div>
                                            <br/>
                                            <span style={{color:"red"}}>{this.state.catchError}</span>
                                        </div>
                                    }
                                </div>
                            }
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{width:"100%"}}>
                            {authType == "login" ?
                                <p>Don't have any account yet? Click <a onClick={()=>{this.props.changeAuthModalType('register')}} href="#">here</a> to register.</p>
                            :
                                <p>Already have an account? Click <a onClick={()=>{this.props.changeAuthModalType('login')}} href="#">here</a> to login.</p>
                            }
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}
