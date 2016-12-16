import React, { Component, PropTypes } from 'react';
import {ControlLabel, Form, FormControl, FormGroup, Table, Grid, Row, Button, PageHeader, Col, ProgressBar } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class ShowdownStatComp extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

  };

//need to add the calculation of the bar
  render(){
    console.log(this.props.statData);
    return(

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
            <ProgressBar  bsStyle="warning" now={this.props.statData.pOne} key={1}/>
            <ProgressBar  bsStyle="success" now={20} key={2}/>
          </ProgressBar>
          </Col>
          <Col md={4}>
            {this.props.playerTwo}
          </Col>

        </Row>
      </div>

    );
  }
}

ShowdownStatComp.propTypes = {


}


export default createContainer(() => {
 	return {


 	};
}, ShowdownStatComp);
