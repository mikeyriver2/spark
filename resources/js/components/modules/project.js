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
    return (
      <div className="project-container">
        <div style={{backgroundImage:`url(${"https://cdn.pixabay.com/photo/2013/11/15/13/57/california-210913_960_720.jpg"})`}}className="project-banner"></div>
          <h5 className="project-title">
            Cleaners Film: Help fund our nostalgic highschool Tuguegara
          </h5>
          <p className="project-description">
            Help fund this absurd highschool anthology film shot entirely in Tuguegarao City!
          </p>
          <div className="project-bar">
            <div className="project-bar-progress"></div>
            <div className="project-bar-remaining"></div>
          </div>
          <div className="project-amount-container">
            <div className="money-raised">
              <h4>P10,000</h4>
              <p>of P20,000 raised</p>
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
        <NewPledge 
          show = {this.state.showNewPledge}
          hideModal = {this.hideNewPledge}
        />
      </div>
                
    )
  }
}