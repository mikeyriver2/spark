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
import AdminModal from '../modals/admin';

export default class Project extends Component{
  constructor(){
    super()
    this.state = {
      showNewPledge: false,
      showAdminModal: false,
    }
    this.showNewPledge = this.showNewPledge.bind(this);
    this.hideNewPledge = this.hideNewPledge.bind(this);
    this.toggleAdminModal = this.toggleAdminModal.bind(this);
  }

  toggleAdminModal(){
    let bool = this.state.showAdminModal;
    this.setState({
        showAdminModal: !bool
    });
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

    const numberWithCommas = (x)=> {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let isAdmin = false;
    let isMobile = this.state.width <= 768;
    if(this.props.user && this.props.user.type){
        if(this.props.user.type == "admin"){
            isAdmin = true
        }
    }
    let amountPledged = 0;
    if(this.props.project && this.props.project.pledge){
      if(this.props.project.pledge.length > 0){
        this.props.project.pledge.map(pledge=>{
          amountPledged += parseFloat(pledge.amount);
        })
      }
    }
    console.log("pledged " + amountPledged);
    console.log("goal " + this.props.project.goal_amount);

    //console.log(amountPledged);
    let percentage = (amountPledged/parseFloat(this.props.project.goal_amount.replace(/,/g, '')))*100;
    //console.log(`percent ${percentage}`)
    return (
      <div className="project-container">
        <div onClick={isAdmin && this.toggleAdminModal} style={{cursor: isAdmin ? "pointer" : "", backgroundImage:`url("${this.props.project.banner}")`}}className="project-banner"></div>
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
              <h4>₱{numberWithCommas(amountPledged)}</h4>
              <p>of ₱{this.props.project.goal_amount} raised</p>
            </div>
            <Button disabled={percentage > 100} onClick={this.showNewPledge} variant="primary">{percentage > 100 ? "Goal Has Been Reached!" : "Make Pledge"}</Button>
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
            fetchProjects = {this.props.fetchProjects}
            user = {this.props.user}
            project = {this.props.project} 
            show = {this.state.showNewPledge}
            hideModal = {this.hideNewPledge}
          />
        }
        <AdminModal 
            show = {this.state.showAdminModal}
            toggleAdminModal = {this.toggleAdminModal}
            parentComponent = {"Project"}
            project = {this.props.project}
        />
      </div>
                
    )
  }
}