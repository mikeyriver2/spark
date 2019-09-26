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

export default class NewPledge extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){

    }


    render(){
        return (
            <div>
                <Modal id="new-pledge-modal" show={this.props.show} onHide={()=>this.props.hideModal()}>
                    <Modal.Header closeButton>
                        <h5>Cleaners Film: Help fund our nostalgic highschool Tuguegara</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label><b>Select Amount to Pledge</b></Form.Label>
                            <div className="pledge-amounts">
                                <Button variant="success">P10,000.000</Button>
                                <Button variant="success">P20,000.000</Button>
                                <Button variant="success">P30,000.000</Button>
                                <Button variant="success">P40,000.000</Button>
                                <Button variant="success">P50,000.000</Button>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>P</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    
                                    <FormControl 
                                        placeholder="Enter custom amount"
                                        aria-label="Amount" />
                                    <InputGroup.Append>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                            <Button className="pledge-button" variant="primary">PLEDGE</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}
