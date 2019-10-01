import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import NewPledge from '../modals/new-records';
export default class Project extends Component{
  constructor(){
    super()
    this.state = {
      showNewPledge: false,
    }
    this.showNewPledge = this.showNewPledge.bind(this);
    this.hideNewPledge = this.hideNewPledge.bind(this);
  }

  showNewPledge(){
    this.setState({
      showNewPledge: true
    })
  }

  hideNewPledge(){
    this.setState({
      showNewPledge: false
    })
  }

  render(){
    let amountPledged = 0.00;
    if(this.props.project && this.props.project.pledge){
      if(this.props.project.pledge.length > 0){
        this.props.project.pledge.map(pledge=>{
          amountPledged += parseFloat(pledge.amount);
        })
      }
    }
    let percentage = amountPledged/this.props.project.goal_amount;
    return (
      <div className="project-container">
        <div style={{backgroundImage:`url("${this.props.project.banner}")`}}className="project-banner"></div>
          <h5 className="project-title">
            {this.props.project.title}
          </h5>
          <p className="project-description">
            {this.props.project.description}
          </p>
          <div className="project-bar">
            <div style={{width:`${percentage}%`}} className="project-bar-progress"></div>
            <div className="project-bar-remaining"></div>
          </div>
          <div className="project-amount-container">
            <div className="money-raised">
              <h4>P{amountPledged}</h4>
              <p>of P{this.props.project.goal_amount} raised</p>
            </div>
            <Button onClick={this.showNewPledge} variant="primary">Make Pledge</Button>
            {/*<h4>Recent Pledges:</h4>
            <div className="recent-pledges">
              <div className="recent-pledge-item">
                <div style={{backgroundImage: `url(${"https://upload.wikimedia.org/wikipedia/commons/3/3c/Logo_of_Petron.svg"})`}} className="pledger-image"></div>
                <span>Petron</span>
              </div>
            </div> */}
        </div>
        {this.state.showNewPledge &&
          <NewPledge
            user = {this.props.user}
            project = {this.props.project} 
            show = {this.state.showNewPledge}
            hideModal = {this.hideNewPledge}
          />
        }
      </div>
                
    )
  }
}