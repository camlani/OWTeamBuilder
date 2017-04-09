import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Table, Grid, Row, Button,PageHeader, Col, Panel } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';


class ShowdownQueueSubmission extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {
      twitchUsername: '',
      battleTag:''
 		};

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

    Meteor.call('showdownQueue.insert', this.state);


    //need to add handle options for every bit of data and save state,
    //from there then add the meteor insert function into this.
    //also need to grab the data from each of the Teamm Member inserts
    //need to insert the data here


  }

 	render() {
 		return (
 			<div className="ShowdownQueueSubmission">
        <h3>Enter Player for Queue <small>Add Information </small></h3>
        <hr/>
          <Form className="ShowdownQueueSubmissionForm" onSubmit={this.handleSubmit.bind(this)} >
          <Row>
              <Col xs={12} md={6}>
                <FormGroup controlId = "playerTwitchName" onChange={this.handleTwitchUsername.bind(this)}>
                  <ControlLabel>Twitch Username: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Player Username"/>
                </FormGroup>
                {' '}
              </Col>
              <Col xs={12} md={6}>
                <FormGroup controlId = "playerBattleNet" onChange={this.handleBatteTag.bind(this)}>
                  <ControlLabel>BattleTag (Battle.net ID) </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Battle#0000"/>
                </FormGroup>
              <Button type="submit" bsStyle="success">Add Player</Button>
              </Col>
            </Row>
          </Form>


 			</div>
 		);
 	}

}

ShowdownQueueSubmission.propTypes = {

}

export default createContainer(() => {
 	return {


 	};
}, ShowdownQueueSubmission);
