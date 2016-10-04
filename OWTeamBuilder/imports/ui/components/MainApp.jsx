import React from 'react';

import MatchNavbar from './MatchNavbar.jsx'

export const MainApp = ( { children } ) => (
  <div>
    <MatchNavbar />
    { children }
  </div>
)
