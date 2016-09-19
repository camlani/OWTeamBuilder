import React, { Component, PropTypes } from 'react';
import { Form, Table, Grid, Row, Button , Glyphicon, Modal} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


import MatchEditModal from './MatchEditModal.jsx'

class MatchTableRow extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {
      showModal: false
 		};
 	}
  closeModal(){
    this.setState({ showModal: false });
  }

  openModal(){
    this.setState({ showModal: true });
    /*
    let mapObj = this.props.mapObj;
    let matchDetails = mapObj.matchDetails;*/

    //console.log("Clicked Edit");

  }

  deleteThisMatch() {
    let matchDetails = this.props.mapObj;

    Meteor.call('matchStats.remove', matchDetails._id);
    //console.log(matchDetails);
  }

 	render() {
    let mapObj = this.props.mapObj;

    let matchDetails = mapObj.matchDetails;
    let matchDate = mapObj.matchDetails.date;
    let parseDate = (matchDate.getMonth()+1) + "/" + matchDate.getDate() + "/" + matchDate.getFullYear();

    let roster = [];

    roster.push(matchDetails.memberOne);
    roster.push(matchDetails.memberTwo);
    roster.push(matchDetails.memberThree);
    roster.push(matchDetails.memberFour);
    roster.push(matchDetails.memberFive);
    roster.push(matchDetails.memberSix);

    roster.sort();
    let parseRoster = "";

    for(var i = 0; i < roster.length; i++){

      if(roster[i] != ""){
        //console.log(roster[i]);
        parseRoster += roster[i] + "\n";
      }

    }

 		return (
      <tr>
        <td>{matchDetails.result}</td>
        <td>{parseDate}</td>
        <td>{matchDetails.mapName}</td>
        <td>{matchDetails.teamSkill}</td>
        <td>{matchDetails.enemySkill}</td>
        <td><pre>{parseRoster}</pre></td>
        <td><Button><Glyphicon glyph="ok"/> Verify</Button></td>
        <td><Button onClick={this.openModal.bind(this)}> <Glyphicon glyph="pencil"/> Edit</Button></td>
        <td><Button onClick={this.deleteThisMatch.bind(this)}><Glyphicon glyph="remove"/> Remove</Button></td>
        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Match</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MatchEditModal mapObj = {mapObj}/>
          <hr />

          </Modal.Body>
          <Modal.Footer>
            <Button >Close</Button>
          </Modal.Footer>
        </Modal>
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
