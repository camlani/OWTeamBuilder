# OWTeamBuilder

Overall Plan for This App

The current plan for this app is to allow players to track their record in
based upon maps in addition to what is already available on the stats
provided by playoverwatch.com. The user builds his team to mimic the players
from there can enter the teams comp level the opponents and what map they
are playing on. Before the map starts they hit start and then their data
is pulled from the site and saved. The number of games is logged, and after the game is logged
the user selects save game and then the stats are pulled from online and populated
then saved in an analytics folder. The user can view all of his stats with maps
and a record of games.

Sadly the stats do not update after the game so this won't work as well.

Need to check if they update by games or by different sessions.

First I need to make the team builder which takes in those diff inputs then tells
other players to verify their team comp. But for now don't break it down into
accounts and just do one large one.

Team suggestions ultimately based upon win percentages

Recommended heroes as well

Version 1
-Ability to log matches in order to find win rate
-View the matches, send matches to players
-Need to try to get battle.net oath account working
-Add a Router, the nav bar(done)
-edit and delete rows (Done)
-add notes (done)
-add the editing of dates
-have copies of the matches on each person

-TODO
-need to check out meteor chef implementation of how he handles the routing(done)
need to put the navbar in the outer most container so it persists.(done)
https://themeteorchef.com/snippets/react-router-basics/#tmc-setting-up-a-layout-component

Brain Dump
-Match Tracking, then possibly being able to make a league
-Make a list of counters of each hero and the best counter on the team based upon
  what ever metric that may be
-Could refresh stats every 10 mins to capture a session perhaps
-run every day or hour to check and keep track of daily stats
-can build out team of members with names saved with battle.net
  for ease of Tracking
-Ability to draw up strats as well.
-when you enter a match it populates for other people on your team as well.
-Make nicknames for your teammates
-maybe adding some color codes for the different team
-Filtering based upon win loss, Map, with percentages



Directory Structure

imports/
  startup/
    client/
      index.js                 # import client startup through a single index entry point
      routes.js                # set up all routes in the app
      useraccounts-configuration.js # configure login templates
    server/
      fixtures.js              # fill the DB with example data on startup
      index.js                 # import server startup through a single index entry point

  api/
    playerstats/               # a unit of domain logic
      server/
        publications.js        # all list-related publications
        publications.tests.js  # tests for the list publications
      lists.js                 # definition of the Lists collection
      lists.tests.js           # tests for the behavior of that collection
      methods.js               # methods related to lists
      methods.tests.js         # tests for those methods

  ui/
    components/                # all reusable components in the application
                               # can be split by domain if there are many
    layouts/                   # wrapper components for behaviour and visuals
    pages/                     # entry points for rendering used by the router

client/
  main.js                      # client entry point, imports all client code

server/
  main.js                      # server entry point, imports all server code


Have a App which is the main component. From there make a PlayerTable component
the table will have a row component from a player component, where each player will be added that way.
