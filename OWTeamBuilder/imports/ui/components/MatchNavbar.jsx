import React, { Component, PropTypes } from 'react';
import {Grid, Row, Button, PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

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
              <NavItem eventKey={1} href="#">Match Tracker</NavItem>
              <NavItem eventKey={2} href="#">Match History</NavItem>
              <NavItem eventKey={3} href="#">Team Builder</NavItem>
              <NavItem eventKey={2} href="#">{<AccountsUIWrapper />}</NavItem>
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
