import React, { Component, PropTypes } from 'react';
import { Form, Table, Grid, Row, Button , Glyphicon, Modal} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class MatchEditModal extends Component {
 	constructor(props) {

 		super(props);
 		this.state = {
      showModal: true
 		};
 	}

  closeModal(){
    this.setState({ showModal: false });
  }

  openModal(){
    this.setState({ showModal: true });
    console.log("Testing");
  }




 	render() {
    let mapObj = this.props.mapObj;
    let matchDetails = mapObj.matchDetails;

    console.log(matchDetails);
    //need to pass this back to the MatchTableRow on the submit and update
    //the match corresponding to it
    //need to copy this match submission and then from there generate it all
    //then set the values to that and submit.
    //and send it back to the db.
 		return (
        <div>

        </div>
 		);
 	}

 }


 MatchEditModal.propTypes = {


 }


 export default createContainer(() => {
 	return {


 	};
 }, MatchEditModal);
