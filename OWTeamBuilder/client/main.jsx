import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from '../imports/ui/components/App.jsx';
import MatchTracker from '../imports/ui/components/MatchTracker.jsx';
import MatchHistory from '../imports/ui/components/MatchHistory.jsx';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MatchTracker}>

      </Route>
      <Route path="/MatchHistory" component={MatchHistory}/>
    </Router>
    , document.getElementById('render-target'));
});
