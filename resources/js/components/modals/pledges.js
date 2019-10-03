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

class Pledges extends Component{
    constructor(props){
        super(props);
        this.state = {
            pledges: {}
        }
        this.renderPledges = this.renderPledges.bind(this);
    }

    componentDidMount(){
        axios.get('pledges').then(res=>{
            this.setState({
                  pledges: res.data
            });
        });
    }

    renderPledges(){
      let elements = [];
      this.state.pledges.map(pledge=>{
            
      });
    }

    render(){
        return (
            <div>
                <Modal style={{opacity: this.state.showConfirmation ? ".3" : "1"}}id="new-pledge-modal" show={this.props.show} onHide={()=>this.props.hideModal()}>
                    <Modal.Header closeButton>
                        <h5>{this.props.project.title}</h5>
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