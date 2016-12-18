import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../imports/ui/components/App.jsx';
import {MainApp} from '../imports/ui/components/MainApp.jsx';
import MatchTracker from '../imports/ui/components/MatchTracker.jsx';
import MatchHistory from '../imports/ui/components/MatchHistory.jsx';
import ShowdownMatchup from '../imports/ui/components/ShowdownMatchup.jsx';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainApp}>
        <IndexRoute component={MatchTracker}/> 
        <Route path="/MatchStats" component={MatchHistory}/>
        <Route path="/Showdown" component={ShowdownMatchup}/>
      </Route>
    </Router>
    , document.getElementById('render-target')
  );
});
