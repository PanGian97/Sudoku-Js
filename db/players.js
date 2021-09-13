const knex = require("./knex");

function getAllPlayers(){
  return knex("players").select("*");  
};

function getPlayerByUsername(username){
 return knex("players").where("username",username)
};

function updatePlayerScore(player_id){
knex("players").where("id",player_id).update({score: player_score});
};


function signUpPlayer(player){
    knex("players")
    .where("username", player.username)
        .insert([{
          username: player.username,
          password: player.password,
          score: 0 
        }]).then( function (result) {
        
       })
        };


module.exports ={
    getAllPlayers,
    getPlayerByUsername,
    signUpPlayer,
    updatePlayerScore
}
