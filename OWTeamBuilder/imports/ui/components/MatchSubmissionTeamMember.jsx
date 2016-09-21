import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Table, Grid, Row, Button,PageHeader, Col, Panel } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';


class MatchSubmissionTeamMember extends Component {

 	constructor(props) {
 		super(props);
 		this.state = {

 		};

 	}

 	render() {
    let controlId = this.props.controlId;
    let controlLabel = this.props.controlLabel;
    let onChangeForm = this.props.changeteamMember;
    let playerName = this.props.currentplayer;
    //console.log(playerName);
    if(playerName){
      return (
        <FormGroup controlId = {controlId} onChange={onChangeForm}>
          <ControlLabel>{controlLabel} </ControlLabel>
          {' '}
          <FormControl type="text" placeholder ="Battle.net ID with #" defaultValue= {playerName}/>
        </FormGroup>
      );

    }
    //console.log("controlId: " + controlId + " controlLabel: " + controlLabel);
 		return (
      <FormGroup controlId = {controlId} onChange={onChangeForm}>
        <ControlLabel>{controlLabel} </ControlLabel>
        {' '}
        <FormControl type="text" placeholder ="Battle.net ID with #"/>
      </FormGroup>
 		);
 	}

 }

 MatchSubmissionTeamMember.propTypes = {


 }

 export default createContainer(() => {
 	return {

 	};
 }, MatchSubmissionTeamMember);
