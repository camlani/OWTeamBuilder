import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

Meteor.methods({
     //test
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

      //https://api.lootbox.eu/patch_notes
      //https://api.lootbox.eu/pc/us/Camlani-1682/quick-play/hero/Torbjoern%2CLucio%2CSoldier76/

      let buildUrl ="https://api.lootbox.eu/pc/us/";


      HTTP.get('', {}, function(error, response){
        if (error){
          console.log(error);
        }
        if (response) {
          console.log(response);
        }
      });


      return true;
   }




});
