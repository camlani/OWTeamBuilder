import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
import {} from 'meteor/meteorhacks:aggregate';

export const Stats = new Mongo.Collection('playerStats')
export const MatchStats = new Mongo.Collection('matchStat')


if (Meteor.isServer){

    Meteor.publish('matchStat', function matchStatsPublication() {
      //need to do a check if createdBy is the person,
      //may need to check on the verify id as well.
      return MatchStats.find({});
    });

    //need to add createdBy
    Meteor.methods({
      'overallStats'(){
        let matchData = [
          {
            _id: 1,
            field: "Wins",
            value: 20
          },
          {
            _id: 2,
            field: "Loses",
            value: 10
          },
          {
            _id: 3,
            field: "Draw",
            value: 3
          }
        ]
        let overallMatchData = [];
        let addTuple;
        let liveData = [];

        //Total Win percentages
        //TODO add the match on created by/ verify by field

        //Win/Loss/Draw
        overallMatchData = MatchStats.aggregate({
              $group: {
                  _id: '$matchDetails.result',
                  value: {$sum: 1}
              }
          });
        //loop through the array then add in the right format
        for(let i = 0; i < overallMatchData.length; i ++){
            addTuple = {
              _id: i,
              field: overallMatchData[i]._id,
              value: overallMatchData[i].value
            };
            liveData.push(addTuple);
        }

        //console.log(matchData);

        Meteor.call('mapWinPercentages', (error, result) => {
          if(error) {
            console.log(error);
          } else {
            for(let i = 0; i < result.length; i++){
              liveData.push(result[i]);
            }
          }

        });
        console.log(liveData);
        return liveData;
      },
      'mapWinPercentages'() {
        let mapWinPercentages = [];

        //http://stackoverflow.com/questions/24153476/group-by-condition-in-mongodb
        //this is the link which we need to have for the aggregation
        let overallMatchData = MatchStats.aggregate({
              $group: {
                  _id: '$matchDetails.mapName',
                  wins: {
                    $cond: { if: { $eq: ['$matchDetails.result', "Win"]}, then: {$sum:1}}
                  },
                  Total: {$sum: 1}
              }
        });

        /*
        let overallMatchData = MatchStats.aggregate({
                $project: {
                  "matchDetails.mapName": 1,
                   wins: {
                     $cond: [ { $eq: ['$matchDetails.result', "Win"]}, {$sum: 1}]
                   }
                }


        });*/


        console.log(overallMatchData);
        //need to get the count of the total and then divide
        return overallMatchData;


      }


    })


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

          //check(matchId, String);
          //remove the matchId
          MatchStats.remove(matchId);
   },
   'matchStats.update'(matchID, matchDetails){
          //check(matchID, String);

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
