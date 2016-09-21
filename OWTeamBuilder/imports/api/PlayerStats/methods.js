import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

export const Stats = new Mongo.Collection('playerStats')
export const MatchStats = new Mongo.Collection('matchStat')


if (Meteor.isServer){

    Meteor.publish('matchStat', function matchStatsPublication() {
      return MatchStats.find({});

    });

}

Meteor.methods({
   'matchStats.insert'(matchDetails){
          //need to do a check on if the user is logged in
          //or else do not insert
          console.log(matchDetails);
          MatchStats.insert({
            matchDetails,
            createdAt: new Date(),
            createdBy: Meteor.userId()
          });
   },
   'matchStats.remove'(matchId){

          check(matchId, String);
          //remove the matchId
          MatchStats.remove(matchId);
   },
   'matchStats.update'(matchID, matchDetails){
          check(matchID, String);

          MatchStats.update(matchID,
             {$set:
               {matchDetails: matchDetails}
             }
           );

   },
   requestPlayerStatistics(playerName, platform, region, mode){
      console.log("PlayerName: " + playerName);
      playerName = playerName.replace("#","-");
      console.log("PlayerName: " + playerName);

      //need to take all of these values then set them to 0, from
      //there need to build this string then return the objects to the client
      //or take another value and from there pass
      //need to pass in the metric to split on either the client or the db
      //maybe have all of these text boxes which will help us select what region
      //they are in
      //maybe store in the db too, all this data maybe too much

      //This API is currently not working
      //https://api.lootbox.eu/patch_notes
      //https://api.lootbox.eu/pc/us/Camlani-1682/quick-play/hero/Torbjoern%2CLucio%2CSoldier76/

      //This is the API we will be using
      //https://github.com/SunDwarf/OWAPI/blob/master/api.md

      //Request for single player stats
      //https://owapi.net/api/v2/u/SunDwarf-21353/heroes/reinhardt/competitive


      let buildUrl ="https://owapi.net/api/v2/u/"+playerName+"/stats/general?region=us";
      //let buildUrl ="https://owapi.net/api/v2/u/"+playerName+"/heroes/reinhardt/competitive?region=us";

      console.log(buildUrl);

      HTTP.get(buildUrl, {}, function(error, response){
        if (error){
          console.log(error);
        }
        if (response) {
          console.log(response);
          Stats.insert({
            result: response
          });

        }
      });

      return true;
   }









});
