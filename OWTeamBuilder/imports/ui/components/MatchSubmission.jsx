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
      date: new Date(),
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
  getTeamArray(){
    let teamMemberArray = [
      {_id: 'member1', fieldName: 'memberOne'},
      {_id: 'member2', fieldName: 'memberTwo'},
      {_id: 'member3', fieldName: 'memberThree'},
      {_id: 'member4', fieldName: 'memberFour'},
      {_id: 'member5', fieldName: 'memberFive'},
      {_id: 'member6', fieldName: 'memberSix'}
    ]

    return teamMemberArray;
  }

  handleTeamQueue(e){
    //e.preventDefault();
    console.log(e.target.value);

    this.setState({queueNum: parseInt(e.target.value)});

  }

  handleteamGroupRating(e){
    e.preventDefault(e);
    this.setState({teamSkill: parseInt(e.target.value)});
  }

  handleoppGroupRating(e){
    e.preventDefault(e);
    this.setState({enemySkill: parseInt(e.target.value)});
  }
  handlegameResult(e){
    e.preventDefault(e);
    this.setState({result: e.target.value});
  }
  handleMap(e){
    e.preventDefault(e);
    let mapArray = this.props.mapList;
    console.log(mapArray);

    this.setState({mapName: e.target.value,
                   type: mapArray.find(mapObj => mapObj.mapName === e.target.value).type
                  });
  }
  handleTeamMembers(e){
    e.preventDefault(e);
    //console.log(e.target.value);
    //let teamArray = this.getTeamArray();

    switch (e.target.id){
        case 'member1':
          this.setState({memberOne: e.target.value});
          break;
        case 'member2':
          this.setState({memberTwo: e.target.value});
          break;
        case 'member3':
          this.setState({memberThree: e.target.value});
          break;
        case 'member4':
          this.setState({memberFour: e.target.value});
          break;
        case 'member5':
          this.setState({memberFive: e.target.value});
          break;
        case 'member6':
          this.setState({memberSix: e.target.value});
          break;

    }
    //console.log(teamArray);

    //in this method tell which state to set from children

  }
  handleSubmit(e){
    e.preventDefault();
    console.log("State");
    console.log(this.state);
    console.log("Submiting");

    //need to add handle options for every bit of data and save state,
    //from there then add the meteor insert function into this.
    //also need to grab the data from each of the Teamm Member inserts
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
      <MatchSubmissionTeamMember key= {populateObj.key} controlId = {populateObj.controlId} controlLabel = {populateObj.controlLabel}
       changeteamMember ={this.handleTeamMembers.bind(this)}/>
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
                <FormGroup controlId="mapNameSelect" onChange={this.handleMap.bind(this)}>
                  <ControlLabel>Map Name: </ControlLabel>
                  {' '}
                  <FormControl componentClass="select" placeholder="select">
                    {this.renderMapNames()}
                  </FormControl>
                </FormGroup>
                {' '}
                <FormGroup controlId = "teamGroupRating" onChange={this.handleteamGroupRating.bind(this)}>
                  <ControlLabel>Team Group Rating: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Group Rating"/>
                </FormGroup>
                {' '}
                <FormGroup controlId = "oppGroupRating"  onChange={this.handleoppGroupRating.bind(this)}>
                  <ControlLabel>Opponent Group Rating: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Opponent Group Rating"/>
                </FormGroup>
                <FormGroup controlId = "gameResult"  onChange={this.handlegameResult.bind(this)} >
                  <ControlLabel>Game Result: </ControlLabel>
                  {' '}
                  <FormControl componentClass="select" placeholder="select"  >
                      <option key="Win1">Win</option>
                      <option key="Loss2">Loss</option>
                      <option key="Draw3">Draw</option>
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
