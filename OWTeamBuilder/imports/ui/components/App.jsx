import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Table, Grid, Row, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import PlayerTable from './PlayerTable.jsx'



// App component - represents the whole app
 class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      playerNum : 0,
      currPlayer: ""
    };
  }
  getPlayers(){
    let playerArray = [
      {_id: 1, playerName: 'Camlani#1682'},
      {_id: 2, playerName: 'Enygmatic#11873'},
      {_id: 3, playerName: 'jaydotjaypeg#1304'},
      {_id: 4, playerName: 'Drew#1487'}
    ]
    return playerArray;
  }
  renderPlayerTable(){
    let playerList = this.getPlayers();
    //console.log(playerList);
    return (
        <PlayerTable playerList = {playerList} playerNum = {this.state.playerNum}/>
    );
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.currPlayer);
    //now need to pass this to my Meteor Method
    //As well as start generating a value for all
    Meteor.call('requestPlayerStatistics', this.state.currPlayer, (error, response) => {
      if(error){
        console.log(error);
      }
      if (response){
        console.log(response);
      }

    });
  }
  handleNameChange(e){
    //{this.state.currPlayer}
    this.setState({currPlayer: e.target.value})
  }
  renderAddPlayerForm(){

    return (
      <Form inline className="PlayerForm" onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup controlId = "playerNameForm">
          <ControlLabel>Battle.net Name:  </ControlLabel>
          {' '}
          <FormControl type="text" placeholder ="Player Name inluding # and number" onChange={this.handleNameChange.bind(this)}/>

        </FormGroup>
        {' '}
        <Button type="submit" bsStyle="primary">Add Player</Button>
      </Form>
    );
  }
  render() {
    return (
      <div className="container">
        <header>
          <h1>Overwatch Team Builder</h1>
        </header>
        {this.renderAddPlayerForm()}
        {/*Need to pass in various amounts of players*/}
        {this.renderPlayerTable()}
      </div>
    );
  }
}

App.propTypes = {

};

export default createContainer(() => {
  return {

  };
}, App);
