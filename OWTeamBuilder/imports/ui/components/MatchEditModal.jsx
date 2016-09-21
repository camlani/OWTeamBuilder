import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, Table, Grid, Row, Button , Glyphicon, Modal,Col, FormControl, FormGroup } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import MatchSubmissionTeamMember from './MatchSubmissionTeamMember.jsx'

class MatchEditModal extends Component {
 	constructor(props) {

 		super(props);
    let mapObj = this.props.mapObj;
    let inmatchDetails = mapObj.matchDetails;
 		this.state = {
      showModal: true,
      //need to put these in a different method or another object
      queueNum: inmatchDetails.queueNum,
      mapName: inmatchDetails.mapName,
      type:  inmatchDetails.type,
      result: inmatchDetails.result,
      date: inmatchDetails.date,
      teamSkill: inmatchDetails.teamSkill,
      enemySkill: inmatchDetails.enemySkill,
      memberOne: inmatchDetails.memberOne,
      memberTwo: inmatchDetails.memberTwo,
      memberThree: inmatchDetails.memberThree,
      memberFour: inmatchDetails.memberFour,
      memberFive: inmatchDetails.memberFive,
      memberSix: inmatchDetails.memberSix


 		};
 	}

  closeModal(){
    this.setState({ showModal: false });
  }

  openModal(){
    this.setState({ showModal: true });
    //console.log("Testing");
  }
  handleTeamQueue(e){
    //e.preventDefault();
    //console.log(e.target.value);

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
    //console.log(mapArray);

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
          this.setState({memberOne: e.target.value.trim()});
          break;
        case 'member2':
          this.setState({memberTwo: e.target.value.trim()});
          break;
        case 'member3':
          this.setState({memberThree: e.target.value.trim()});
          break;
        case 'member4':
          this.setState({memberFour: e.target.value.trim()});
          break;
        case 'member5':
          this.setState({memberFive: e.target.value.trim()});
          break;
        case 'member6':
          this.setState({memberSix: e.target.value.trim()});
          break;

    }
    //console.log(teamArray);

    //in this method tell which state to set from children

  }
  handleSubmit(e){
    e.preventDefault();
    console.log("Submiting");
    console.log(this.state);

    let insertID = this.props.mapObj;
    console.log(insertID);
    let insertData = this.state;
    delete insertData.showModal;
    console.log(insertData);
    Meteor.call('matchStats.update', insertID, insertData);


    //need to add handle options for every bit of data and save state,
    //from there then add the meteor insert function into this.
    //also need to grab the data from each of the Teamm Member inserts
    //need to insert the data here

    //need to fix the edit modal then update on task

  }
  renderNumberofKnownPlayers(){



    let queueNum = this.state.queueNum;


    let populateList = [], controlId, controlLabel, key, popObj;
    let currentplayer =  "";
    for (let i = 1; i <= queueNum; i ++ ){

      switch (i){
          case 1:
            currentplayer = this.state.memberOne;
            break;
          case 2:
            currentplayer = this.state.memberTwo;
            break;
          case 3:
            currentplayer = this.state.memberThree;
            break;
          case 4:
            currentplayer = this.state.memberFour;
            break;
          case 5:
            currentplayer = this.state.memberFive;
            break;
          case 6:
            currentplayer = this.state.memberSix;
            break;

      }

      popObj = {
        key: i,
        controlId: "member" + i,
        controlLabel: "Team Member " + i + ": ",
        currentplayer: currentplayer

      }
      populateList.push(popObj);
    }
    //console.log(populateList);
    return populateList.map((populateObj) =>(
      <MatchSubmissionTeamMember key= {populateObj.key} controlId = {populateObj.controlId} controlLabel = {populateObj.controlLabel}
      currentplayer = {populateObj.currentplayer} changeteamMember ={this.handleTeamMembers.bind(this)}/>
    ));
  }
  renderQueueSelect(){
    let mapObj = this.props.mapObj;
    let queueNum = mapObj.matchDetails.queueNum;

    let populateList = [], controlId, controlLabel;
    let currentplayer =  "";

    for (let i = 1; i <= 6; i ++ ){

      if( i  == queueNum){
        popObj = {
          key: i,
        }
      } else {
        popObj = {
          key: i,
        }
      }
      populateList.push(popObj);
    }
    //console.log(populateList);
    //need to find out how to default value
    //need to figure this out defaultValue for the others as well.
    return populateList.map((populateObj) =>(

        <option key={populateObj.key} >{populateObj.key}</option>


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
    let mapObj = this.props.mapObj;
    let matchDetails = mapObj.matchDetails;

    console.log(matchDetails);
    //need to pass this back to the MatchTableRow on the submit and update
    //the match corresponding to it
    //need to copy this match submission and then from there generate it all
    //then set the values to that and submit.
    //and send it back to the db.
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
                  <FormControl type="text" placeholder ="Group Rating" defaultValue = {matchDetails.teamSkill}/>
                </FormGroup>
                {' '}
                <FormGroup controlId = "oppGroupRating"  onChange={this.handleoppGroupRating.bind(this)}>
                  <ControlLabel>Opponent Group Rating: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Opponent Group Rating" defaultValue = {matchDetails.enemySkill}/>
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
                  {this.renderQueueSelect()}
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


 MatchEditModal.propTypes = {


 }


 export default createContainer(() => {
 	return {


 	};
 }, MatchEditModal);
