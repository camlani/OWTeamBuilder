import React, { Component, PropTypes } from 'react';
import { Form, Table, Grid, Row, Button, PageHeader } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

import ShowdownQueueTableRow from './ShowdownQueueTableRow.jsx'


import { MatchStats } from '../../api/PlayerStats/methods.js'
import { ShowdownQueue } from '../../api/PlayerStats/methods.js'

class ShowdownQueueTable extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {

 		};
 	}

  getMatchInfo() {
    let matchdbData = this.props.showdownQueue;
    //console.log("This is the Test data");
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

  renderShowdownQueueTableRows() {
    //this is where I need to have some sort of basic numbers
    let matchData = this.getMatchInfo();
    let mapList = this.props.mapList;

    let count =1;
    return matchData.map((matchObj) => (
      <ShowdownQueueTableRow key = {matchObj._id} mapObj = {matchObj} mapList = {mapList} count={count++}/>

    ));
  }

 	render() {

 		return (
 			<div className ="ShowdownTable">
        <h3>Showdown Queue <small>Table for Players in the Queue</small></h3>
        <hr/>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Position</th>
              <th>Date Added</th>
              <th>Twitch Name</th>
              <th>BattleTag</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.renderShowdownQueueTableRows()}
          </tbody>
        </Table>

 			</div>
 		);
 	}
}

ShowdownQueueTable.propTypes = {
  showdownQueue: PropTypes.array.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('showdownQueue');

 	return {
    showdownQueue: ShowdownQueue.find({}, {sort : {createdAt : 1} } ).fetch()
 	};
}, ShowdownQueueTable);
