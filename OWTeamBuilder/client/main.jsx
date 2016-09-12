import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/components/App.jsx';
import MatchTracker from '../imports/ui/components/MatchTracker.jsx';

Meteor.startup(() => {
  render(<MatchTracker />, document.getElementById('render-target'));
});
