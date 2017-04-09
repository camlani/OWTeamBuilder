import React, { Component, PropTypes } from 'react';
import { Form, Table, Grid, Row, Button , Glyphicon, Modal} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


import ShowdownQueueEditModal from './ShowdownQueueEditModal.jsx'

class ShowdownQueueTableRow extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {
      showModal: false,
      showViewModal: false
 		};
 	}
  closeModal(){
    this.setState({ showModal: false });
  }

  openModal(){
    this.setState({ showModal: true });
  }

  closeViewModal(){
    this.setState({ showViewModal: false });
  }

  openViewModal(){
    this.setState({ showViewModal: true});
  }

  deleteThisMatch() {
    let matchDetails = this.props.mapObj;

    Meteor.call('showdownQueue.remove', matchDetails._id);
    //console.log(matchDetails);
  }

 	render() {
    let mapObj = this.props.mapObj;

    let playerDetails = mapObj.playerDetails;
    let matchDate = mapObj.createdAt;
    let parseDate = (matchDate.getMonth()+1) + "/" + matchDate.getDate() + "/" + matchDate.getFullYear();






 		return (
      <tr>
        <td>{this.props.count}</td>
        <td>{parseDate}</td>
        <td>{playerDetails.twitchUsername}</td>
        <td>{playerDetails.battleTag}</td>
        <td><Button onClick={this.openModal.bind(this)}> <Glyphicon glyph="pencil"/> Edit</Button></td>
        <td><Button onClick={this.deleteThisMatch.bind(this)}><Glyphicon glyph="remove"/> Remove</Button></td>

        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Match</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ShowdownQueueEditModal mapObj = {mapObj} mapList = {this.props.mapList}/>
          <hr />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)} >Close</Button>
          </Modal.Footer>
        </Modal>

        {/* <Modal show={this.state.showViewModal} onHide={this.openViewModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>View Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre>{matchDetails.notes}</pre>
          <hr />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeViewModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal> */}
      </tr>


 		);
 	}
}

ShowdownQueueTableRow.propTypes = {

}

export default createContainer(() => {
 	return {


 	};
}, ShowdownQueueTableRow);
