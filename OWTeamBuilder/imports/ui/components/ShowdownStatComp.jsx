import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Table, Grid, Row, Button, PageHeader, Col, ProgressBar,Glyphicon, Label } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class ShowdownStatComp extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

  };

  renderAmountForStatOne(){
    let val = 0;
    val = this.props.statData.pOne/(this.props.statData.pOne + this.props.statData.pTwo);

    return val * 100;
  }

  renderAmountForStatTwo(){
    let val = 0;
      val = this.props.statData.pTwo/(this.props.statData.pOne + this.props.statData.pTwo);

    return val * 100;
  }

  renderResultpOne(){

    if(this.props.statData.pOne > this.props.statData.pTwo) {
      return(
        <Glyphicon glyph="ok"/>
      )
    }

  }
  renderResultpTwo(){

    if(this.props.statData.pOne < this.props.statData.pTwo) {
      return(
        <Glyphicon glyph="ok"/>
      )
    }
  }

  renderPlayerOneSpread(){
    let result = this.props.statData.pOne - this.props.statData.pTwo;
    result = Math.round( result * 10) / 10;
    //console.log(result);
    if(result > 0) {

      return (
        <h4><Label bsStyle="success">+{result}</Label></h4>
      )

    } else {

      return (
        <h4><Label bsStyle="danger">{result}</Label></h4>
      )

    }

  }

  renderPlayerTwoSpread(){
    let result = this.props.statData.pTwo - this.props.statData.pOne;
    result = Math.round( result * 10) / 10;
    //console.log(result);
    if(result > 0) {
      return (
        <h4><Label bsStyle="success">+{result}</Label></h4>
      )

    } else {
      return (
        <h4><Label bsStyle="danger">{result}</Label></h4>
      )

    }


  }

//need to add the calculation of the bar
  render(){
    console.log(this.props.statData);
    return(


      <tr>
        <td>{this.props.statData.title}</td>
        <td>{this.renderPlayerOneSpread()}</td>
        <td>
            <ProgressBar>
              <ProgressBar  bsStyle="warning" now={this.renderAmountForStatOne()} key={1}/>
              <ProgressBar  bsStyle="success" now={this.renderAmountForStatTwo()} key={2}/>
            </ProgressBar>
        </td>

        <td>{this.renderPlayerTwoSpread()}</td>
        <td>{this.renderResultpOne()}</td>
        <td>{this.renderResultpTwo()}</td>
      </tr>

      /*
      <div>
        <Row>
          <div className="col-md-9 col-md-offset-5"> {this.props.statData.title}</div>
        </Row>
        <Row>
          <Col md={4}>
            {this.props.playerOne}
          </Col>
          <Col md={4}>
          <ProgressBar>
            <ProgressBar  bsStyle="warning" now={this.renderAmountForStatOne()} key={1}/>
            <ProgressBar  bsStyle="success" now={this.renderAmountForStatTwo()} key={2}/>
          </ProgressBar>
          </Col>
          <Col md={4}>
            {this.props.playerTwo}
          </Col>

        </Row>
      </div>
      */
    );
  }
}

ShowdownStatComp.propTypes = {


}


export default createContainer(() => {
 	return {


 	};
}, ShowdownStatComp);
