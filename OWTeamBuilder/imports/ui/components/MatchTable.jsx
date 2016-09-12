import React, { Component, PropTypes } from 'react';
import { Form, Table, Grid, Row, Button, PageHeader } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

class MatchTable extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {

 		};
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
