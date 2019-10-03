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

export default class AdminModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            showSuccess: false,
            newProject: {
                title: "",
                description: "",
                banner: "",
                goal: 0
            }
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleChangeNewProject = this.handleChangeNewProject.bind(this);
        this.renderCreateProject = this.renderCreateProject.bind(this);
        this.handleSubmitNewProject = this.handleSubmitNewProject.bind(this);
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps){
    
    }

    handleChangeNewProject(e,type){
        e.persist(); //e.target.value will mess up when called in prevstate fnc
        this.setState(prevState=>({
            newProject:{
                ...prevState.newProject,
                [type]: e.target.value
            },
          }));
    }

    onChangeHandler(e){
        e.persist()
        this.setState(prevState=>({
            newProject:{
                ...prevState.newProject,
                banner: e.target.files[0]
            }
          }));
    }

    handleSubmitNewProject(){
        const data = new FormData() 
        data.append('banner', this.state.newProject.banner);
        data.append('title', this.state.newProject.title);
        data.append('description', this.state.newProject.description);
        data.append('goal', this.state.newProject.goal);

        axios.post('iLikeToMoveItMoveIt/project',data).then(res=>{
            this.setState({
                showSuccess: true,
            },()=>{
                setTimeout(() => {
                    this.setState(prevState => ({
                        showSuccess: false,
                        newProject: {
                            ...prevState.newProject,
                            title: "",
                            description: "",
                            banner: "",
                            goal: 0
                        }
                    }))
                }, 500330);
            })
        });
    }

    renderCreateProject(){
        return (
            <div className="admin-create-project">
                <Form.Group controlId="newProjectTitle">
                    <Form.Control value={this.state.newProject.title} onChange={(e)=>{this.handleChangeNewProject(e,"title")}} placeholder="Project Title" />
                </Form.Group>
                
                <Form.Group controlId="newProjectDesc">
                    <Form.Control value={this.state.newProject.description} onChange={(e)=>{this.handleChangeNewProject(e,"description")}} placeholder="Project Title" />
                </Form.Group>

                <Form.Group controlId="newProjectGoal">
                    <Form.Control value={this.state.newProject.goal} onChange={(e)=>{this.handleChangeNewProject(e,"goal")}} placeholder="Goal Amount" />
                </Form.Group>

                <Form.Group controlId="newProjectBanner">
                    <Form.Label style={{marginRight:"10px"}}>Banner</Form.Label>
                    <input type="file" name="file" onChange={this.onChangeHandler}/>
                </Form.Group>

                <Button onClick={this.handleSubmitNewProject} style={{width:"100%"}}>Submit</Button>
            </div>
        )
    }

    render(){
        return (
            <div>
                <Modal id="pledges-modal" show={this.props.show} onHide={()=>this.props.toggleAdminModal()}>
                    <Modal.Header closeButton>
                        <h5>Create New Project</h5>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.showSuccess ?
                            <div>
                                Success! Your Project has been created and posted.
                            </div>
                            :
                            this.renderCreateProject()
                        }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}