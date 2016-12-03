import React, { Component, PropTypes } from 'react';
import { Form, Table, Grid, Row, Button , Glyphicon, Modal} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class MatchStatsTuple extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {


 		};
 	}


 	render() {
    let matchDetails = this.props.matchStats;
    console.log(matchDetails);

    return(
      <tr>
        <td>{matchDetails.field}</td>
        <td>{matchDetails.value}</td>
      </tr>
    );

 	}

 }


 MatchStatsTuple.propTypes = {


 }


 export default createContainer(() => {
 	return {


 	};
 }, MatchStatsTuple);
