import React, { Component, PropTypes } from 'react';
import { Form, Table, Grid, Row, Button, PageHeader } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

class MatchTable extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {

 		};
 	}

  getMatchInfo() {
    let mathData = [
      {
        _id: 1,
        mapName: 'Hanamura',
        type: 'Assault',
        result: w,
        date: '9/11/2016',
        skillDiff: '-300',
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
        result: l,
        date: '9/11/2016',
        skillDiff: '-300',
        memberOne: 'Camlani#1682',
        memberTwo: 'Enygmatic#11873',
        memberThree: 'jaydotjaypeg#1304',
        memberFour: 'Drew#1487',
        memberFive: 'tcwontonsoup#1868',
        memberSix: 'TaylorMade#12821',
      }
    ]
    return matchData;

  }

  renderMatchRows() {
    //this is where I need to have some sort of basic numbers



    return (
      <div/>
    )
  }

 	render() {
 		return (
 			<div className ="MatchTable">
        <h3>Recent Matches <small>Table for Most Recent Matches</small></h3>
        <hr/>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Map Name</th>
              <th>Result</th>
              <th>Date</th>
              <th>Skill Difference</th>
              <th>Team Member 1</th>
              <th>Team Member 2</th>
              <th>Team Member 3</th>
              <th>Team Member 4</th>
              <th>Team Member 5</th>
              <th>Team Member 6</th>
            </tr>

          </thead>
        </Table>

 			</div>
 		);
 	}
}

MatchTable.propTypes = {

}

export default createContainer(() => {
 	return {


 	};
}, MatchTable);
