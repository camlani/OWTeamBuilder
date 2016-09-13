import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Table, Grid, Row, Button,PageHeader, Col, Panel } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

import MatchSubmissionTeamMember from './MatchSubmissionTeamMember.jsx'

class MatchSubmission extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {
      queueNum: 1,
      mapName: '',
      type: '',
      result: '',
      date: '',
      teamSkill: '',
      enemySkill: '',
      memberOne: '',
      memberTwo: '',
      memberThree: '',
      memberFour: '',
      memberFive: '',
      memberSix: ''
      //need to get the data out of the table row somehow
      //need to pass the data out of the child into the
      //parents
 		};
    //console.log("MapList " + this.props.mapList);
 	}

  handleTeamQueue(e){
    //e.preventDefault();
    console.log(e.target.value);

    this.setState({queueNum: parseInt(e.target.value)});

  }
  handleSubmit(e){
    console.log("Submiting");
    console.log(e);
    //need to insert the data here


  }
  renderNumberofKnownPlayers(){
    let queueNum = this.state.queueNum;
    let populateList = [], controlId, controlLabel, key, popObj;

    for (let i = 1; i <= queueNum; i ++ ){

      popObj = {
        key: i,
        controlId: "member" + i,
        controlLabel: "Team Member " + i + ": "
      }
      populateList.push(popObj);
    }
    /*
    <FormGroup controlId = "memberOne">
      <ControlLabel>Team Member One: </ControlLabel>
      {' '}
      <FormControl type="text" placeholder ="Battle.net ID with #"/>
    </FormGroup>*/

    //console.log(populateList);
    return populateList.map((populateObj) =>(
      <MatchSubmissionTeamMember key= {populateObj.key} controlId = {populateObj.controlId} controlLabel = {populateObj.controlLabel} />
    ));
  }

  renderMapNames(){
    let mapList = this.props.mapList;
    //console.log(mapList);
    return mapList.map((mapObj) =>(
      <option key={mapObj._id}>{mapObj.mapName}</option>
    ));
  }
 	render() {
 		return (
 			<div className="MatchSubmission">
        <h3>Enter Match Details <small>Add Information </small></h3>
        <hr/>
          <Form className="MatchSubmissionForm" onSubmit={this.handleSubmit.bind(this)} >
          <Row>
              <Col xs={12} md={6}>
                <FormGroup controlId="mapNameSelect">
                  <ControlLabel>Map Name: </ControlLabel>
                  {' '}
                  <FormControl componentClass="select" placeholder="select">
                    {this.renderMapNames()}
                  </FormControl>
                </FormGroup>
                {' '}
                <FormGroup controlId = "teamGroupRating">
                  <ControlLabel>Team Group Rating: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Group Rating"/>
                </FormGroup>
                {' '}
                <FormGroup controlId = "oppGroupRating">
                  <ControlLabel>Opponent Group Rating: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Opponent Group Rating"/>
                </FormGroup>
                <FormGroup controlId = "gameResult">
                  <ControlLabel>Game Result: </ControlLabel>
                  {' '}
                  <FormControl componentClass="select" placeholder="select" >
                      <option key="Win1">Win</option>
                      <option key="Loss2">Loss</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={12} md={6}>
              <FormGroup controlId="queueSize">
                <ControlLabel>Queue Size: </ControlLabel>
                {' '}
                <FormControl componentClass="select" placeholder="select" onChange={this.handleTeamQueue.bind(this)} >
                    <option key="1" defaultValue>1</option>
                    <option key="2">2</option>
                    <option key="3">3</option>
                    <option key="4">4</option>
                    <option key="5">5</option>
                    <option key="6">6</option>
                </FormControl>
              </FormGroup>
              {' '}

              {this.renderNumberofKnownPlayers()}

              <Button type="submit" bsStyle="success">Add Match</Button>
              </Col>
            </Row>
          </Form>


 			</div>
 		);
 	}

}

MatchSubmission.propTypes = {

}

export default createContainer(() => {
 	return {


 	};
}, MatchSubmission);
