import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
import {} from 'meteor/meteorhacks:aggregate';
import {fs} from 'fs';

export const Stats = new Mongo.Collection('playerStats')
export const MatchStats = new Mongo.Collection('matchStat')
export const ShowdownQueue = new Mongo.Collection('showdownQueue')

const callService = (type, url, options) => new Promise((resolve, reject) => {
  HTTP.call(type, url, options, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});
//build all the data here then make another and apend the other with diff field
const playerDataOne = (playerData) => new Promise((resolve, reject) => {
  console.log("In playerDataOne trying to run");

  HTTP.call('GET', playerData.pOneURL, {headers: {"User-Agent": "SpotlightShowdown@gmail.com"}} , (error, result) => {
    if (error) {
      reject(error);
    } else {
      playerData.pOneData = result;
      resolve(playerData);
    }
  });
});

const playerDataTwo =  (playerData, options) => new Promise ((resolve,reject) => {
  HTTP.call("GET", playerData.pTwoURL,{headers: {"User-Agent": "SpotlightShowdown@gmail.com"}}, (error, result) => {
    if (error) {
      reject(error);
    } else {
      playerData.pTwoData = result;
      resolve(playerData);
    }
  });

})
// const playerData = (playerName, url) => new Promise((resolve, reject) => {
//
//
// });

if (Meteor.isServer){

    Meteor.publish('matchStat', function matchStatsPublication() {
      //need to do a check if createdBy is the person,
      //may need to check on the verify id as well.
      return MatchStats.find({});
    });

    Meteor.publish('showdownQueue', function showdownQueuePublication() {
      //need to do a check if createdBy is the person,
      //may need to check on the verify id as well.
      return ShowdownQueue.find({});
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

        /*let overallMatchData = MatchStats.aggregate({
              $group: {
                  _id: '$matchDetails.mapName',
                  wins: {
                    $cond: { if: { $eq: ['$matchDetails.result', "Win"]}, then: {$sum:1}}
                  },
                  Total: {$sum: 1}
              }
        });*/

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


      },
      requestPlayerOneStatistics(playerOne){
          platform = "";
          region ="";
          mode ="";
          playerOne = playerOne.replace("#","-");
          let buildUrlOne ="https://owapi.net/api/v3/u/"+playerOne+"/blob";
          let playerData ={
            pOneName: playerOne,
            pOneURL: buildUrlOne,
            pOneData: ""
          }
          return playerDataOne(playerData).then(
            function(result){

              return result;
            }
          )

      },
      requestPlayerTwoStatistics(playerTwo){
          platform = "";
          region ="";
          mode ="";
          playerTwo = playerTwo.replace("#","-");
          let buildUrlTwo ="https://owapi.net/api/v3/u/"+playerTwo+"/blob";
          let playerData ={
            pTwoName: playerTwo,
            pTwoURL:buildUrlTwo,
            pTwoData: ""
          }
          return playerDataTwo(playerData).then(
            function(result){

              return result;
            }
          )
      },
      requestPlayerStatistics(playerOne, playerTwo){
          platform = "";
          region ="";
          mode ="";

         playerOne = playerOne.replace("#","-");
         playerTwo = playerTwo.replace("#","-");
         console.log("playerTwo: " + playerTwo);
         console.log("playerOne: " + playerOne);

         //This API is currently not working
         //https://api.lootbox.eu/patch_notes
         //https://api.lootbox.eu/pc/us/Camlani-1682/quick-play/hero/Torbjoern%2CLucio%2CSoldier76/

         //This is the API we will be using
         //https://github.com/SunDwarf/OWAPI/blob/master/api.md

         //Request for single player stats
         //https://owapi.net/api/v2/u/SunDwarf-21353/heroes/reinhardt/competitive
         //let buildUrl ="https://owapi.net/api/v2/u/"+playerName+"/heroes/reinhardt/competitive?region=us";


         //Time per hero https://owapi.net/api/v3/u/Camlani-1682/heroes
         //Just Need this then iterate https://owapi.net/api/v3/u/Camlani-1682/blob

        //  let buildUrlOne ="https://owapi.net/api/v2/u/"+playerOne+"/stats/general?region=us";
        //  let buildUrlTwo ="https://owapi.net/api/v2/u/"+playerTwo+"/stats/general?region=us";
         let buildUrlOne ="https://owapi.net/api/v3/u/"+playerOne+"/blob";
         let buildUrlTwo ="https://owapi.net/api/v3/u/"+playerTwo+"/blob";

         //playerDataOne then playerDataTwo
         let playerData ={
           pOneName: playerOne,
           pOneURL: buildUrlOne,
           pOneData: "",
           pTwoName: playerTwo,
           pTwoURL:buildUrlTwo,
           pTwoData: ""
         }

        //  return playerDataOne(playerData).then(playerDataTwo).then((result) => result).catch((error) => {
        //    throw new Meteor.Error('500', `${error.message}`);
        //});




            return playerDataOne(playerData).then(
              function(result){

                return result;
              }
            ).then(playerDataTwo)
              .catch( function(result){
                return result;

            });

        // return playerDataOne(playerData).then(
        //   function(result){
        //     return result;
        //   }
        // ).catch((error) => {
        //        throw new Meteor.Error('500', `${error.message}`);
        // });
        //  return callService(
        //        'GET',
        //        buildUrl
        //      ).then((result) => result)
        //      .then ()
        //      .catch((error) => {
        //        throw new Meteor.Error('500', `${error.message}`);
        //      });
         //return true;
      },

      //print ShowdownQueue to the server
      'writeShowdownQueueToFile'(){
        let filepath ="C:/Users/Cameron/Google Drive/OWDuels/Stream Assets/ShowdownApp/QueueFile.txt";
        console.log("Writing to here " + filepath);
        var fs = require("fs");
        var path = filepath;
        // var data = "Hello from the Node writeFile method!";
        //need to loop through the
        var showdownVal = ShowdownQueue.find({}, {sort : {createdAt : 1} } ).fetch();

        var data = "";
        //data = queueObj.playerDetails.twitchUsername + ", ";
        var count = 1;
        showdownVal.map(function(obj){
          data += count + ". " + obj.playerDetails.twitchUsername + ", ";
          count++;
        });



        fs.writeFile(path, data, function(error) {
             if (error) {
               console.error("write error:  " + error.message);
             } else {
               console.log("Successful Write to " + path);
             }
        });

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
   'showdownQueue.insert'(playerDetails){
      console.log();
      ShowdownQueue.insert({
        playerDetails,
        createdAt: new Date(),
        createdBy: Meteor.userId()
      });
   },
   'showdownQueue.remove'(showdownQueueID){
          //remove the matchId
          ShowdownQueue.remove(showdownQueueID);
   },
   'showdownQueue.update'(showdownQueueID, playerDetails){
          //check(matchID, String);
          ShowdownQueue.update(showdownQueueID,
             {$set:
               {playerDetails: playerDetails}
             }
           );
   }








});
