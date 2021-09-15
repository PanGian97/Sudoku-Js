const express= require("express");
const app = express();
const db = require("./db/players");
const validator = require("./validators");
app.use('/public',express.static('public'))
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/js',express.static(__dirname + '/public/js'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views','./views')
app.set('view engine','ejs')
//some variables
let logged_player;
let warning_message="";

app.get("/intro",(req,res)=>{
    res.render('intro.ejs',{ message : warning_message})
    warning_message=""; //reset message on refresh
});
app.post("/",async (req,res)=>{
    
        console.log("player to be processed: "+req.body.username);
         const existingPlayer = await db.getPlayerByUsername(req.body.username);//returns a player object or null
        
        if(existingPlayer[0]!==undefined)//if username exists
        {
            console.log(existingPlayer[0].password);
           if( await validator.isAuthPasswordValid(req.body.password,existingPlayer[0].password))
           {
              // console.log("Welcome back!!!!!");
              // console.log("Entered password:"+req.body.password);
               logged_player= existingPlayer[0];
               res.redirect("/");
           }
           else {res.redirect("/intro")
           warning_message = "wrong password for the coresponding player";
           }
        }
        else{
        //console.log("creating new player...");
        if(validator.isUsernameValid(req.body.username))
        {
           const hashed_player_password =  validator.cryptPassword(req.body.password);
           logged_player ={username: req.body.username,password:hashed_player_password,score: 0}; 
           if(db.signUpPlayer(logged_player))
           {
           res.redirect("/")
           }
           else{warning_message = "Failed to insert player: "+logged_player.username;
           res.redirect("/intro");}
        } else{
            warning_message = "Form has to fulfill the requirments";
            res.redirect("/intro");
        }
       }    
        
    
   
 
});
app.post("/refresh",async(req,res)=>{
    logged_player.score = await db.updatePlayerScore(logged_player.id,logged_player.score+1);//raise player's score to db and return back the submitted score
    res.redirect("/");
});


app.get("/",async (req,res)=>{
    
    const all_players = await db.getAllPlayers();//could be singleton to not be loaded all the time on refresh
    const player = await db.getPlayerByUsername(logged_player.username);
    console.log(logged_player.username+" username")
    res.status(200).render('index.ejs',{ player : player[0]});

    console.log("player : "+all_players[0].username+"score: "+all_players[0].score);
  console.log("Welcome "+player[0].username);
});



app.listen(1337,()=> console.log("server listens to 1337port"));

