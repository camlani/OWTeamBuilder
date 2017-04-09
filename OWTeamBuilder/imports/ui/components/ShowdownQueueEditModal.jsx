import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, Table, Grid, Row, Button , Glyphicon, Modal,Col, FormControl, FormGroup } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class ShowdownQueueEditModal extends Component {
 	constructor(props) {

 		super(props);
    console.log("Props");
    console.log(this.props.mapObj);
    let mapObj = this.props.mapObj;
    let showdownQueueDetails = mapObj.playerDetails;
 		this.state = {
      showModal: true,
      //need to put these in a different method or another object
      twitchUsername: showdownQueueDetails.twitchUsername,
      battleTag:showdownQueueDetails.battleTag


 		};
 	}

  closeModal(){
    this.setState({ showModal: false });
  }

  openModal(){
    this.setState({ showModal: true });
    //console.log("Testing");
  }
  handleTwitchUsername(e){
    e.preventDefault(e);
    this.setState({twitchUsername: e.target.value});
  }
  handleBatteTag(e){
    e.preventDefault(e);
    this.setState({battleTag: e.target.value});
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
    Meteor.call('showdownQueue.update', insertID, insertData);
    //need to some how close the modal after submit

    //this.closeModal();

    //need to add handle options for every bit of data and save state,
    //from there then add the meteor insert function into this.
    //also need to grab the data from each of the Teamm Member inserts
    //need to insert the data here

    //need to fix the edit modal then update on task

  }

 	render() {
    let mapObj = this.props.mapObj;
    let showdownQueueDetails = mapObj.playerDetails;

    //console.log(matchDetails);
    //need to pass this back to the MatchTableRow on the submit and update
    //the match corresponding to it
    //need to copy this match submission and then from there generate it all
    //then set the values to that and submit.
    //and send it back to the db.
 		return (
      <div className="ShowdownQueueSubmission">
        <h3>Enter Match Details <small>Add Information </small></h3>
        <hr/>
          <Form className="ShowdownQueueSubmissionForm" onSubmit={this.handleSubmit.bind(this)} >
          <Row>
              <Col xs={12} md={6}>
                <FormGroup controlId = "playerTwitchName" onChange={this.handleTwitchUsername.bind(this)}>
                  <ControlLabel>Twitch Username: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Player Username" defaultValue = {showdownQueueDetails.twitchUsername}/>
                </FormGroup>
                {' '}
              </Col>
              <Col xs={12} md={6}>
              <FormGroup controlId = "playerBattleNet" onChange={this.handleBatteTag.bind(this)}>
                <ControlLabel>BattleTag (Battle.net ID) </ControlLabel>
                {' '}
                <FormControl type="text" placeholder ="Battle#0000" defaultValue = {showdownQueueDetails.battleTag}/>
              </FormGroup>
              <Button type="submit" bsStyle="success">Save Player</Button>
              </Col>
            </Row>
          </Form>


      </div>
 		);
 	}

 }


 ShowdownQueueEditModal.propTypes = {


 }


 export default createContainer(() => {
 	return {


 	};
 }, ShowdownQueueEditModal);
