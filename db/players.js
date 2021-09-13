const knex = require("./knex");

function getAllPlayers(){
  return knex("players").select("*");  
};

function getPlayerByUsername(username){
return knex("players").where("username",username);
};

function updatePlayerScore(player_id){
knex("players").where("id",player_id).update({score: player_score});
};

function insertPlayer(player){
    knex("players")
    .select("username")
    .where("username", player.username)
    .andWhere("password", player.password)
    .then(dataUserName => {
        if (dataUserName.length === 0) //check if user don't exist exists 
        {    knex('players')
        .insert([{
          username: player.username,
          password: player.password,
        }])
        .then(() => {
            console.log('welcome player', player.username);
            
        });}
        else if(!dataUserName == player.username){// if the user didn't typed a username that belongs to an other user
          console.log("An other player has this username, try a different one");
        }
                
    else {console.log("player :"+player.username+" exists");}
    return knex("players").where("username",player.username);
    
});
};
module.exports ={
    getAllPlayers,
    getPlayerByUsername,
    insertPlayer
}
