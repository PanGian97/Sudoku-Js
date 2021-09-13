const express= require("express");
const app = express();
const db = require("./db/players");
app.use('/public',express.static('public'))
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/js',express.static(__dirname + '/public/js'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views','./views')
app.set('view engine','ejs')
//some variables
let logged_player_username;


app.get("/intro",(req,res)=>{
    res.render('intro.ejs')
});
app.post("/",async (req,res)=>{
    try{
        console.log("player to be added: "+req.body.username);
        const db_player = await db.insertPlayer(req.body);
        logged_player_username = req.body.username;
        res.redirect("/");
    }catch{
        res.redirect("/intro")
        console.log("something went wrong");
    }
   
 
});
app.get("/",async (req,res)=>{
    const all_players = await db.getAllPlayers();
    const player = await db.getPlayerByUsername("papago");
    res.status(200).render('index.ejs');

    console.log("player : "+all_players[0].username+"score: "+all_players[0].score);
    console.log("Welcome "+player[0].username);
});

app.post("/intro",(req,res)=>{
   
});

app.listen(1337,()=> console.log("server listens to 1337port"));

