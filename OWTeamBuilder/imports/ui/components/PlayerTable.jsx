import React, { Component, PropTypes } from 'react';
import { Table, Grid, Row, Button } from 'react-bootstrap';

export default class PlayerTable extends Component{
  constructor(props) {
    super(props);
    //console.log(this.props.playerList);
    console.log("Player Num " + this.props.playerNum);
  }
  renderPlayerRows(){
    {/*Need the Metrics for each row*/}
    //console.log(this.props.playerList);
    let currplayerStats = this.props.playerList;
    //this.props.playerList
    return currplayerStats.map((player) =>(
      <tr key={player._id}>
        <td>{player._id}</td>
        <td>{player.playerName}</td>
      </tr>
    ));
  }

  render () {
    return (
      <Table>
        <thead>
          <tr>
            <th>Hero Name</th>
            <th>Player One</th>
            <th>Player Two</th>
            <th>Player Three</th>
          </tr>
        </thead>
        <tbody>
          {this.renderPlayerRows()}

        </tbody>
      </Table>
    );
  }
}
