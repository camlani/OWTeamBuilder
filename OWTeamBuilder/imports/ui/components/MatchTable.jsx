import React, { Component, PropTypes } from 'react';
import { Form, Table, Grid, Row, Button, PageHeader } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

import MatchTableRow from './MatchTableRow.jsx'


import { MatchStats } from '../../api/PlayerStats/methods.js'

class MatchTable extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {

 		};
 	}

  getMatchInfo() {
    let matchdbData = this.props.matchStat;
    console.log("This is the Test data");
    console.log(matchdbData);
    let matchData = [
      {
        _id: 1,
        mapName: 'Hanamura',
        type: 'Assault',
        result: 'W',
        date: '9/11/2016',
        teamSkill: '2600',
        enemySkill: '2512',
        memberOne: 'Camlani#1682',
        memberTwo: 'Enygmatic#11873',
        memberThree: 'jaydotjaypeg#1304',
        memberFour: 'Drew#1487',
        memberFive: 'tcwontonsoup#1868',
        memberSix: 'TaylorMade#12821',
        },
      {
        _id: 2,
        mapName: 'Temple of Anubis',
        type: 'Assault',
        result: 'L',
        date: '9/11/2016',
        teamSkill: '2621',
        enemySkill: '2782',
        memberOne: 'Camlani#1682',
        memberTwo: 'Enygmatic#11873',
        memberThree: 'jaydotjaypeg#1304',
        memberFour: 'Drew#1487',
        memberFive: 'tcwontonsoup#1868',
        memberSix: 'TaylorMade#12821',
      }
    ]
    return matchdbData;

  }

  renderMatchRows() {
    //this is where I need to have some sort of basic numbers
    let matchData = this.getMatchInfo();
    let mapList = this.props.mapList;


    return matchData.map((matchObj) => (
      <MatchTableRow key = {matchObj._id} mapObj = {matchObj} mapList = {mapList}/>
    ));
  }

 	render() {

 		return (
 			<div className ="MatchTable">
        <h3>Recent Matches <small>Table for Most Recent Matches</small></h3>
        <hr/>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Result</th>
              <th>Date</th>
              <th>Map Name</th>
              <th>Team Rating</th>
              <th>Enemy Rating</th>
              <th>Team Roster</th>
              <th>Verified</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.renderMatchRows()}
          </tbody>
        </Table>

 			</div>
 		);
 	}
}

MatchTable.propTypes = {
  matchStat: PropTypes.array.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('matchStat');

 	return {
    matchStat: MatchStats.find({}, {sort : {createdAt : -1} } ).fetch()
 	};
}, MatchTable);
