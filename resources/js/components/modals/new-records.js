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
            pledge: 0
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
                            <div className="pledge-labels">
                                <Form.Label style={{marginBottom: "20px", fontSize: "1.5em", color: "#35373a"}}><b>Select amount to pledge:</b></Form.Label>
                                <Form.Label style={{float:"right", marginBottom: "20px", fontSize: "1.5em", color: "#35373a"}}><b>P{this.state.pledge}.00</b></Form.Label>
                            </div>
                            <div className="pledge-amounts">
                                <Button onClick={()=>{this.setState({pledge: 10000})}} variant="success">P10,000.000</Button>
                                <Button onClick={()=>{this.setState({pledge: 20000})}} variant="success">P20,000.000</Button>
                                <Button onClick={()=>{this.setState({pledge: 30000})}} variant="success">P30,000.000</Button>
                                <Button onClick={()=>{this.setState({pledge: 40000})}} variant="success">P40,000.000</Button>
                                <Button onClick={()=>{this.setState({pledge: 50000})}} variant="success">P50,000.000</Button>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>P</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    
                                    <FormControl 
                                        onChange={(e)=>{this.setState({pledge: e.target.value})}}
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
