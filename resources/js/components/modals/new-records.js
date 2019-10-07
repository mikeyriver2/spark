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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/index';

class NewPledge extends Component{
    constructor(props){
        super(props);
        this.state = {
            pledge: 0,
            showConfirmation: false,
            user: {} 
        }
        this.handleSumbit = this.handleSumbit.bind(this);
        this.hideConfirmation = this.hideConfirmation.bind(this);
    }

    componentDidMount(){
        let isUserLoggedIn = false; //super not ideal to do this : USE REDUX IN THE FUTURE!
        if(this.props.user && this.props.user.id){ //check first with props if user logged in then use state as contingency
          //cool logged in 
        }else{
            axios.get('/check-user').then(res=>{
                this.setState({
                    user: res.data
                });
            }).then(err=>{
    
            });
        }
    }

    handleSumbit(){
        let value = {
            amount: this.state.pledge,
            project: this.props.project
        }
        axios.post('pledge',value).then(res=>{
            this.setState({
                showConfirmation: false
            },()=>{
                this.props.fetchProjects();
                this.props.hideModal();    
            });
        });
    }

    hideConfirmation(){
        this.setState({
            showConfirmation: false
        });
    }


    render(){
        const numberWithCommas = (x)=> {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        let isUserLoggedIn = false;
        if((this.props.user && this.props.user.id) || (this.state.user && this.state.user.id)){
          isUserLoggedIn = true;
        }
        var isnum = /^[0-9.,]+$/.test(this.state.pledge);
        
        return (
            <div>
                <Modal style={{opacity: this.state.showConfirmation ? ".3" : "1"}}id="new-pledge-modal" show={this.props.show} onHide={()=>this.props.hideModal()}>
                    <Modal.Header closeButton>
                        <h5><b>{this.props.project.title}</b></h5>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className="pledge-amounts">
                                <Button style={{fontWeight:"bold"}} onClick={()=>{this.setState({pledge: 10000})}} variant="success">P10,000.000</Button>
                                <Button style={{fontWeight:"bold"}} onClick={()=>{this.setState({pledge: 20000})}} variant="success">P20,000.000</Button>
                                <Button style={{fontWeight:"bold"}} onClick={()=>{this.setState({pledge: 30000})}} variant="success">P30,000.000</Button>
                                <Button style={{fontWeight:"bold"}} onClick={()=>{this.setState({pledge: 40000})}} variant="success">P40,000.000</Button>
                                <Button style={{fontWeight:"bold"}} onClick={()=>{this.setState({pledge: 50000})}} variant="success">P50,000.000</Button>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>P</InputGroup.Text>
                                    </InputGroup.Prepend>                        
                                    <FormControl 
                                        onChange={(e)=>{this.setState({pledge: e.target.value})}}
                                        placeholder="Enter amount"
                                        aria-label="Amount" />
                                    <InputGroup.Append>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Label className="label-pledge" style={{textAlign: "center", marginBottom: "20px", color: "rgb(99, 102, 107)"}}><b>Amount to Pledge:</b></Form.Label>
                                <Form.Label className="label-pledge-amount" style={{textAlign: "center", float:"right", marginBottom: "20px", fontSize: "1.5em", color: "rgb(99, 102, 107)"}}><b>P{numberWithCommas(this.state.pledge)}.00</b></Form.Label>
                            </div>
                            {/* <div className="pledge-labels">
                                <Form.Label style={{marginBottom: "20px", fontSize: "1.5em", color: "#35373a"}}><b>Select amount to pledge:</b></Form.Label>
                                <Form.Label style={{float:"right", marginBottom: "20px", fontSize: "1.5em", color: "#35373a"}}><b>P{this.state.pledge}.00</b></Form.Label>
                            </div> */}
                            <div style={{textAlign:"center"}}>
                                <Button disabled={(!isnum || !isUserLoggedIn  || this.state.pledge == 0)} className="pledge-button" onClick={()=>{this.setState({showConfirmation: true})}} variant="primary">PLEDGE</Button>
                                {!isUserLoggedIn && 
                                    <div>
                                        <br/>
                                        <span onClick={()=>{this.props.toggleAuthModal(); this.props.hideModal()}} style={{cursor:"pointer", color:"red"}}>Must be logged In to Pledge</span>
                                    </div>
                                }
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal style={{marginTop: "35vh"}} id="new-pledge-modal-confirmation" show={this.state.showConfirmation} onHide={this.hideConfirmation}>
                    <Modal.Body>
                        You are about to pledge P{numberWithCommas(this.state.pledge)}.
                        <div>
                            <a onClick={this.hideConfirmation} style={{cursor: "pointer", float:"right", marginRight:"10px", fontWeight: "bold"}}>Cancel</a>
                            <a onClick={this.handleSumbit} style={{cursor: "pointer", float:"right", marginRight:"10px", fontWeight: "bold", color: "green"}}>Proceed</a>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({},actions),dispatch)
}

export default connect(null,mapDispatchToProps)(NewPledge);