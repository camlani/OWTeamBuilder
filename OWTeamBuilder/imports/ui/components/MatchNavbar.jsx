import React, { Component, PropTypes } from 'react';
import {Grid, Row, Button, PageHeader, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { IndexLink, Link } from 'react-router';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

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
              <a href="#">SpotlightShowdown</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
            {/* Commented out for the stream */}
              {/* <IndexLinkContainer to={{ pathname: '/'}}  >
                <NavItem eventKey={1} >Home</NavItem>
              </IndexLinkContainer>
              <LinkContainer to= {{ pathname: '/MatchStats' }} >
                <NavItem eventKey={2} >Match Stats</NavItem>
              </LinkContainer> */}
              {/* <NavItem eventKey={3} >Team Builder</NavItem> */}
              <LinkContainer to= {{ pathname: '/Showdown' }} >
                <NavItem eventKey={4} >Showdown</NavItem>
              </LinkContainer>
              {/* <NavItem eventKey={2} >{<AccountsUIWrapper />}</NavItem> */}
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
