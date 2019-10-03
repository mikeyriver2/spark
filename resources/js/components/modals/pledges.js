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
    Button,
    Table
} from 'react-bootstrap';
import axios from 'axios';
import * as helpers from '../../helpers/validations';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/index';

class Pledges extends Component{
    constructor(props){
        super(props);
        this.state = {
            pledges: {}
        }
        this.renderPledges = this.renderPledges.bind(this);
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps){
      if(this.props.show != prevProps.show){
            if(this.props.show){
                  axios.get('pledges').then(res=>{
                        this.setState({
                              pledges: res.data
                        });
                  });
            }
      }
    }

    renderPledges(){
      let elements = [];
      this.state.pledges.map(pledge=>{
            elements.push(
                  <tr>
                        <td>
                              {pledge.project.title}
                        </td>
                        <td>
                              {pledge.amount}
                        </td>
                  </tr>
            )
      });

      return elements;
    }

    render(){
        return (
            <div>
                <Modal id="pledges-modal" show={this.props.show} onHide={()=>this.props.togglePledgesModal()}>
                    <Modal.Header closeButton>
                        <h5>Your Pledges</h5>
                    </Modal.Header>
                    <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                              <tr>
                                    <th>Project Name</th>
                                    <th>Amount Pledged</th>
                              </tr>
                        </thead>
                        <tbody>
                              {this.state.pledges.length > 0 && this.renderPledges()}
                        </tbody>
                        </Table>     
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({},actions),dispatch)
}

export default connect(null,mapDispatchToProps)(Pledges);