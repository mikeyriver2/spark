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

export default class SearchBar extends Component{
  constructor(){
    super()
    this.state = {

    }
  }

  render(){
    var svg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" link="http://www.w3.org/1999/xlink">
      <rect width="24" height="24" fill="url(#pattern0)"/>
      <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use href="#image0" transform="scale(0.015625)"/>
      </pattern>
      <image id="image0" width="64" height="64" href="data:image/png;base64,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"/>
      </defs>
    </svg>
    
    return (
      <div className="custom-searchbar">
        {svg}
        <input placeholder="Search..." type="text" />
      </div>
    )
  }
}