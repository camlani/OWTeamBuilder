import React, { Component, PropTypes } from 'react';
import { Form, Table, Grid, Row, Button , Glyphicon, Modal} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import MatchStatsTuple from './MatchStatsTuple.jsx'


import { MatchStats } from '../../api/PlayerStats/methods.js'

class MatchStatsContainer extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {
      overallStats: null


 		};
 	}
  getMatchInfo(){
    let matchData;

    Meteor.call('overallStats', (error, result) => {
      if(error){
        console.log("Error calling overallStats");

      } else {
        matchData = result;
      }
    });

    /*
    this.setState({overallStats: matchData});
    console.log(this.state.overallStats);*/

  }
  //Utilized this in order to call the data before the component was created
  componentWillMount(){
    Meteor.call('overallStats', (error, result) => {
      if(error){
        console.log("Error calling overallStats");

      } else {
        this.setState({overallStats: result});
        //matchData = result;
      }
    });
  }



  renderMatchStatsTuple(){
    let matchStats = this.state.overallStats;
    if(matchStats){
      return matchStats.map((matchObj) => (
        <MatchStatsTuple key = {matchObj._id} matchStats = {matchObj}/>
      ));
    } else {
      console.log("Still loading");
    }

  }
 	render() {
 		return (
 			<div className="MatchStatsContainer">
        <h3>Overall Stats <small>Table for Most Overall Stats</small></h3>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Stat Name</th>
              <th>Stat</th>
            </tr>
          </thead>
          <tbody>
            {this.renderMatchStatsTuple()}
          </tbody>

        </Table>
 			</div>
 		);
 	}

 }


 MatchStatsContainer.propTypes = {


 }


 export default createContainer((params) => {
  /*let matchOverallStats = [];
  Meteor.call('overallStats', function(error, result) {
    if(error){
      console.log("Error calling overallStats");
    } else {
      matchOverallStats = result;
      console.log(matchOverallStats);
    }
  })*/

 	return {

    //matchOverallStats
  };
 }, MatchStatsContainer);
