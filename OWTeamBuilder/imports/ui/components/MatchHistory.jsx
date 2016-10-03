import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Table, Grid, Row, Button, PageHeader } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import MatchTable from './MatchTable.jsx'
import MatchSubmission from './MatchSubmission.jsx'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'
import MatchNavbar from './MatchNavbar.jsx'

class MatchHistory extends Component {
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
      {_id: 12, mapName: 'Nepal', type: 'Control'}
    ]
    return mapArray;
  }

  renderMatchNavbar(){
    return (
      <MatchNavbar/>
    );
  }
  renderMatchTable(){
    let mapList = this.getMaps();

    return(
      <MatchTable mapList = {mapList}/>
    );
  }
  renderMatchSubmission(){
    let mapList = this.getMaps();
    return(
      <MatchSubmission mapList = {mapList}/>
    )
  }

  render() {
    return (

        <div className="container">
        {/*  <AccountsUIWrapper />*/}
          {this.renderMatchNavbar()}
          <header>
            <PageHeader>Overwatch Match Tracker <small>Keep Track of Matches</small></PageHeader>
          </header>

          {this.renderMatchTable()}

        </div>
    );
  }

}

MatchHistory.propTypes = {

}

export default createContainer(() => {
  return {

  };
}, MatchHistory);
