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

export default class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
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
            company: "",
        }
        this.handleSumbit = this.handleSumbit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){

    }

    handleSumbit(){

        axios.post('pledge').then(res=>{

        });
    }

    hideConfirmation(){

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
                ...prevState.error,
                [type]: error.error
            },
            [type]: value
        }))

    }


    render(){
        return (
            <div>
                <Modal id="auth-modal" show={this.props.show} onHide={this.props.toggleAuthModal}>
                    <Modal.Header closeButton>
                        <h4>Register to pledge</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGridCompany">
                                <Form.Control onChange={(e)=>{this.handleChange(e,"company")}} as="select">
                                    <option>Company</option>
                                    <option>Persol</option>
                                    <option>Hackazouk</option>
                                    <option>Mikey</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formGridPEmail">
                                <Form.Control onChange={(e)=>{this.handleChange(e,"pEmail")}} type="email" placeholder="Primary email" />
                                {this.state.errors.pEmail != "" && <small style={{color:"red"}}>Please enter a valid email</small>}
                            </Form.Group>
                            <Form.Group controlId="formGridSEmail">
                                <Form.Control onChange={(e)=>{this.handleChange(e,"sEmail")}} type="email" placeholder="Secondary email (optional)" />
                                {this.state.errors.sEmail != "" && <small style={{color:"red"}}>Please enter a valid email</small>}
                            </Form.Group>
                            <Form.Group controlId="formGridPassword">
                                <Form.Control onChange={(e)=>{this.handleChange(e,"password")}} type="password" placeholder="Enter Password" />
                            </Form.Group>
                            <Form.Group controlId="formGridContact">
                                <Form.Control onChange={(e)=>{this.handleChange(e,"contact")}} placeholder="Contact Number" />
                                {this.state.errors.contact != "" && <small style={{color:"red"}}>Contact Number should only be numeric</small>}
                            </Form.Group>
                            <Button className="submit" variant="primary">Submit</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}
