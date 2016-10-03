import React, { Component, PropTypes } from 'react';
import {Grid, Row, Button, PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { IndexLink, Link } from 'react-router';

import AccountsUIWrapper from './AccountsUIWrapper.jsx'

class MatchNavbar extends Component {
 	constructor(props) {
 		super(props);
 		this.state = {


 		};
 	}


 	render() {
 		return (
      <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">OWTracker</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/"></NavItem>
              <NavItem eventKey={2} href="/MatchHistory">Match History</NavItem>
              <NavItem eventKey={3} >Team Builder</NavItem>
              <NavItem eventKey={2} >{<AccountsUIWrapper />}</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

 		);
 	}

 }


 MatchNavbar.propTypes = {


 }


 export default createContainer(() => {
 	return {


 	};
 }, MatchNavbar);
