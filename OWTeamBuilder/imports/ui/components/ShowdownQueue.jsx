import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Table, Grid, Row, Button, PageHeader } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ShowdownQueueTable from './ShowdownQueueTable.jsx'
import ShowdownQueueSubmission from './ShowdownQueueSubmission.jsx'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'
import MatchNavbar from './MatchNavbar.jsx'

class ShowdownQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getMaps(){
    let mapArray = [
      {_id: 1, mapName: 'Hanamura', type: 'Assault'},
      {_id: 2, mapName: 'Temple of Anubis', type: 'Assault'},
      {_id: 3, mapName: 'Volskaya Industries', type: 'Assault'},
      {_id: 4, mapName: 'Dorado', type: 'Escort'},
      {_id: 5, mapName: 'Route 66', type: 'Escort'},
      {_id: 6, mapName: 'Watchpoint: Gibraltar', type: 'Escort'},
      {_id: 7, mapName: 'Hollywood',  type: 'Hybrid'},
      {_id: 8, mapName: 'King\'s Row',  type: 'Hybrid'},
      {_id: 9, mapName: 'Numbani',  type: 'Hybrid'},
      {_id: 10, mapName: 'Ilios', type: 'Control'},
      {_id: 11, mapName: 'Lijang Tower', type: 'Control'},
      {_id: 12, mapName: 'Nepal', type: 'Control'},
      {_id: 13, mapName: 'Eichenwalde', type: 'Hybrid'}
    ]
    return mapArray;
  }

  renderShowdownQueueTable(){
    let mapList = this.getMaps();

    return(
      <ShowdownQueueTable mapList = {mapList}/>
    );
  }
  renderShowdownQueueSubmission(){
    return(
      <ShowdownQueueSubmission />
    )
  }
  outputToFile(){
    Meteor.call('writeShowdownQueueToFile');

  }

  render() {
    return (

        <div className="container">
        {/*  <AccountsUIWrapper />*/}

          <header>
            <PageHeader>SpotlightShowdown Queue <small>Keep Track of Who is Next</small></PageHeader>
          </header>

          {this.renderShowdownQueueSubmission()}
          <Button bsStyle="info" onClick={this.outputToFile.bind(this)}>Output To File</Button>
          {this.renderShowdownQueueTable()}

        </div>
    );
  }

}

ShowdownQueue.propTypes = {

}

export default createContainer(() => {
  return {

  };
}, ShowdownQueue);
