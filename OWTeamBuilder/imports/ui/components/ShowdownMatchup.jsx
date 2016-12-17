import React, { Component, PropTypes} from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Table, Grid, Row, Button, PageHeader, Col, Image} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import MatchTable from './MatchTable.jsx'
import MatchSubmission from './MatchSubmission.jsx'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'
import MatchNavbar from './MatchNavbar.jsx'
import MatchStatsContainer from './MatchStatsContainer.jsx'


import ShowdownStatComp from './ShowdownStatComp.jsx'

class ShowdownMatchup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: "" ,
      playerTwo: "",
      playerData: null
    };
  }

  handlePlayerOne(e){
    e.preventDefault(e);
    this.setState({playerOne: e.target.value })
    //console.log(this.stat);
  }

  handlePlayerTwo(e){
    e.preventDefault(e);
    this.setState({playerTwo: e.target.value })
  }
  handleSubmit(e){
    e.preventDefault();
    console.log("Submiting");
    console.log(this.state);

    var callback = this;

    Meteor.call('requestPlayerStatistics',this.state.playerOne, this.state.playerTwo, function(error, result){
      if(error){
        console.log(error);
        console.log("ERROR in call back");

      } else {
        //need to set the state right here
        console.log("The stat is");
        //need to build both player one and players two return data in the method
        console.log(result);

        callback.setState({playerData: result});

        //now need to store this in the stats then generate the little components
        //need to parse the data. put it into tuples for characters, time.
        // then that data add it up and place it in the app

      }

    });

  }
  renderQuickStats(){
    if(this.state.playerData !== null && this.state.playerData !== undefined){

      let statMatchUp = {
        playerOne:  this.state.playerData.pOneName,
        playerTwo: this.state.playerData.pTwoName,
        playerData: [
          {
            title: "Season 3 Rank",
            pOne: this.state.playerData.pOneData.data.us.stats.competitive.overall_stats.comprank,
            pTwo: this.state.playerData.pTwoData.data.us.stats.competitive.overall_stats.comprank
          },
          {
           title: "Win Rate %",
           pOne: this.state.playerData.pOneData.data.us.stats.competitive.overall_stats.win_rate,
           pTwo: this.state.playerData.pTwoData.data.us.stats.competitive.overall_stats.win_rate
         },
         {
           title: "Kill Death Ratio",
           pOne: this.state.playerData.pOneData.data.us.stats.competitive.game_stats.kpd,
           pTwo: this.state.playerData.pTwoData.data.us.stats.competitive.game_stats.kpd
         }
        ]
        };

      return statMatchUp.playerData.map((data) => (
        <ShowdownStatComp key={data.title} playerOne ={statMatchUp.playerOne} playerTwo={statMatchUp.playerTwo}  statData={data} />
      ));
    }

  }
  renderStatMatchUp(){

    if(this.state.playerData !== null && this.state.playerData !== undefined){

      let statMatchUp = {
        playerOne:  this.state.playerData.pOneName,
        playerTwo: this.state.playerData.pTwoName,
        playerData: [
          {
            title: "Ana Time Played (hrs)",
            pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.ana + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.ana ,
            pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.ana + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.ana
          },
          {
            title: "Bastion Time Played (hrs)",
            pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.bastion + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.bastion ,
            pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.bastion + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.bastion
          },
          {
            title: "D.Va Time Played (hrs)",
            pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.dva + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.dva ,
            pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.dva + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.dva
          },
          {
            title: "Genji Time Played (hrs)",
            pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.genji + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.genji ,
            pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.genji + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.genji
          },
          {
            title: "Hanzo Time Played (hrs)",
            pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.hanzo + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.hanzo ,
            pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.hanzo + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.hanzo
          },
          {
            title: "Junkrat Time Played (hrs)",
            pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.junkrat + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.junkrat,
            pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.junkrat + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.junkrat
          },
         {
           title: "Lucio Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.lucio + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.lucio ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.lucio + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.lucio
         },
         {
           title: "McCree Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.mccree + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.mccree ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.mccree + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.mccree
         },
        {
          title: "Mei Time Played (hrs)",
          pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.mei + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.mei ,
          pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.mei + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.mei
        },
         {
           title: "Mercy Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.mercy + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.mercy ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.mercy + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.mercy
         },
         {
           title: "Pharah Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.pharah + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.pharah ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.pharah + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.pharah
         },
         {
           title: "Reaper Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.reaper + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.reaper ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.reaper + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.reaper
         },
         {
           title: "Reinhardt Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.reinhardt + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.reinhardt ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.reinhardt + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.reinhardt
         },
         {
           title: "Roadhog Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.roadhog + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.roadhog ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.roadhog + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.roadhog
         },
         {
           title: "Soldier: 76 Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.soldier76 + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.soldier76 ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.soldier76 + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.soldier76
         },
         {
           title: "Sombra Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.sombra + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.sombra ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.sombra + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.sombra
         },
         {
           title: "Symmetra Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.symmetra + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.symmetra ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.symmetra + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.symmetra
         },
         {
           title: "Torbjorn Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.torbjorn + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.torbjorn ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.torbjorn + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.torbjorn
         },
         {
           title: "Tracer Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.tracer + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.tracer ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.tracer + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.tracer
         },
         {
           title: "Widowmaker Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.widowmaker + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.widowmaker ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.widowmaker + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.widowmaker
         },
         {
           title: "Winston Time Played (hrs)",
           pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.winston + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.winston ,
           pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.winston + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.winston
         },
          {
            title: "Zarya Time Played (hrs)",
            pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.zarya + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.zarya ,
            pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.zarya + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.zarya
          },
          {
            title: "Zenyatta Time Played (hrs)",
            pOne: this.state.playerData.pOneData.data.us.heroes.playtime.competitive.zenyatta + this.state.playerData.pOneData.data.us.heroes.playtime.quickplay.zenyatta ,
            pTwo: this.state.playerData.pTwoData.data.us.heroes.playtime.competitive.zenyatta + this.state.playerData.pTwoData.data.us.heroes.playtime.quickplay.zenyatta
          }
        ]

        };

      return statMatchUp.playerData.map((data) => (
        <ShowdownStatComp key={data.title} playerOne ={statMatchUp.playerOne} playerTwo={statMatchUp.playerTwo}  statData={data} />
      ));
    }
    //need to have this set up to take the data in and loop through it.

    //here I need to take the sum of the progress bar from there split into two different
    //colors and use those for stats

    //need to get the correct stats cut out what we dont need then maybe fire it up
    //into arrays lets do that

  }
  render() {
    return (

        <div className="container">
          <header>
            <PageHeader>Spotlight Showdown Matchup</PageHeader>
          </header>
            <Form className = "PlayerMatchUpForm" onSubmit={this.handleSubmit.bind(this)}>

            <Row>
              <Col md={6}>
                <FormGroup controlId = "playerOne" onChange={this.handlePlayerOne.bind(this)}>
                  <ControlLabel>Player One: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Player One" defaultValue = ""/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup controlId = "playerTwo" onChange={this.handlePlayerTwo.bind(this)} >
                  <ControlLabel>Player Two: </ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder ="Player Two" defaultValue = ""/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <div className="col-md-9 col-md-offset-5"> <Button type="submit" bsStyle="success">Show Stats</Button></div>
            </Row>
            <div>&nbsp;</div>
          </Form>
          <h4>Quick Stats</h4>
          <Row>
            <Col md={6}>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                  <th>Stat Title</th>
                  <th>P1 Spread</th>
                  <th>Stat Breakdown</th>
                  <th>P2 Spread</th>
                  <th>P1 Result</th>
                  <th>P2 Result</th>
                  </tr>
                </thead>
                <tbody>
                {this.renderQuickStats()}
                </tbody>
              </Table>
            </Col>
            <Col md={6}>
            </Col>
          </Row>


          <h4>Hero Breakdown</h4>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Statistic Title</th>
                <th>P1 Spread</th>
                <th>Statistic Breakdown</th>
                <th>P2 Spread</th>
                <th>P1 Result</th>
                <th>P2 Result</th>
              </tr>
            </thead>
            <tbody>
              {this.renderStatMatchUp()}
            </tbody>
          </Table>


        </div>




    );
  }

}

ShowdownMatchup.propTypes = {

}

export default createContainer(() => {
  return {

  };
}, ShowdownMatchup);
