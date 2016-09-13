import React, { Component, PropTypes } from 'react';
import { Form, Table, Grid, Row, Button } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

class MatchTableRow extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {


 		};
 	}

 	render() {
    let mapObj = this.props.mapObj;
    //console.log(mapObj);

 		return (
      <tr>
        <td>{mapObj.mapName}</td>
        <td>{mapObj.result}</td>
        <td>{mapObj.date}</td>
        <td>{mapObj.teamSkill}</td>
        <td>{mapObj.enemySkill}</td>
        <td>{mapObj.memberOne}</td>
        <td>{mapObj.memberTwo}</td>
        <td>{mapObj.memberThree}</td>
        <td>{mapObj.memberFour}</td>
        <td>{mapObj.memberFive}</td>
        <td>{mapObj.memberSix}</td>
      </tr>
 		);
 	}
}

MatchTableRow.propTypes = {

}

export default createContainer(() => {
 	return {


 	};
}, MatchTableRow);
