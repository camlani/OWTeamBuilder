import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Table, Grid, Row, Button, PageHeader, Col } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import MatchTable from './MatchTable.jsx'
import MatchSubmission from './MatchSubmission.jsx'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'
import MatchNavbar from './MatchNavbar.jsx'
import MatchStatsContainer from './MatchStatsContainer.jsx'

class ShowdownMatchup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: "" ,
      playerTwo: "",
      playerData: ""
    };
  }

  handlePlayerOne(e){
    e.preventDefault(e);
    this.setState({playerOne: e.target.value })
    //console.log(this.stat);
  }

  handlePlayerTwo(e){
    e.preventDefault(e);
    this.setState({playerTwo: e.target.value })
  }
  handleSubmit(e){
    e.preventDefault();
    console.log("Submiting");
    console.log(this.state);

    Meteor.call('requestPlayerStatistics',this.state.playerOne, this.state.playerTwo, function(error, result){
      if(error){
        console.log(error);
        console.log("ERROR in call back");

      } else {
        //need to set the state right here
        console.log("The stat is");
        //need to build both player one and players two return data in the method
        console.log(result);

        this.setState({playerData: result});
        //now need to store this in the stats then generate the little components

        //need to parse the data. put it into tuples for characters, time.
        // then that data add it up and place it in the app

      }

    });

  }
  renderStatMatchUp(){
    //here I need to take the sum of the progress bar from there split into two different
    //colors and use those for stats

    //need to get the correct stats cut out what we dont need then maybe fire it up
    //into arrays lets do that


  }
  render() {
    return (

        <div className="container">
          <header>
            <PageHeader>Spotlight Showdown Matchup</PageHeader>
          </header>
            <Form className = "PlayerMatchUpForm" onSubmit={this.handleSubmit.bind(this)}>

            <Row>
              <Col md={6}>
                <FormGroup controlId = "playerOne" onChange={this.handlePlayerOne.bind(this)}>
                  <ControlLabel>Player One: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Player One" defaultValue = ""/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup controlId = "playerTwo" onChange={this.handlePlayerTwo.bind(this)} >
                  <ControlLabel>Player Two: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Player Two" defaultValue = ""/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <div className="col-md-9 col-md-offset-5"> <Button type="submit" bsStyle="success">Show Stats</Button></div>


            </Row>
          </Form>
        </div>




    );
  }

}

ShowdownMatchup.propTypes = {

}

export default createContainer(() => {
  return {

  };
}, ShowdownMatchup);
