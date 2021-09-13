const easy = [
  "6-5----7--7---5-2--3---1---362-7--815-96---3271--9-4-5-2---651---78----345----29-",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
  "--9-------4----6-758-31----15--4-36---6---4-8----9---28--754---36------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
  "-1-5--------7-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];



let selectedNum;
let selectedTileId = 0;
let difficulty;
let resultsMode = false;
let boardResults;
let allowedDigits = /^[0-9]$/;



function startGame(){
  
    console.log("started");
    

    if(document.getElementById("d1").checked){
      board = easy[0];
      boardResults=easy[1];
      difficulty=1;
    } 
    if(document.getElementById("d2").checked){
      board = medium[0];
      boardResults=medium[1];
      difficulty=2;
    } 
    if(document.getElementById("d3").checked){
      board = hard[0];
      boardResults=hard[1];
      difficulty=3;
    } 
    console.log("difficulity"+ difficulty);
generateBoard(board);
}

function generateBoard(board){
    
  clearBoard();
  //Let used to increment tile ids
  
  for(let i =0;i<81;i++){
   let tile = document.createElement("input");
   tile.id = i;
    tile.type = "text";
    tile.value = boardResults.charAt(i);
     
      
      if(boardResults.charAt(i) != "-"){
         tile.readOnly=true;
         tile.classList.add("unselected");
         
      }else{
          tile.value ="";
          tile.addEventListener("click",function(){
              selectTile(tile);
          })
      }
      
      tile.classList.add("tile");//add tile class to all tiles
       if((tile.id>17&&tile.id<27)||(tile.id>44 &&tile.id<54))
       {
          tile.classList.add("bottomBorder");
       }
       if ((tile.id+1)%9 ==3 || (tile.id+1) %9 ==6)
       {
          tile.classList.add("rightBorder");
       }
       else{
         console.log("out of if");
       }
       //add tile to board
       document.getElementById("board").appendChild(tile);
      }
  }


function clearBoard(){
  hideWinMsg();//hide win mdg
  
    let tiles = document.querySelectorAll(".tile");
    for(let i=0; i<tiles.length;i++){
      tiles[i].parentNode.removeChild(tiles[i]); //deletes p elements (tiles)
    }
}
function resetBoard(){
  hideWinMsg();
  let tiles = document.querySelectorAll(".tile");
  for(let i=0; i<tiles.length;i++){

      if(board.charAt(i)=="-") tiles[i].value= "";
      tiles[i].classList.remove("false","right");
      tiles[i].classList.add("unselected");
      tiles[i].readOnly=false;//reset the non-editable tiles in case of the user solved the game before
  }
}
function selectTile(tile){
  
    if (tile.id !=selectedTileId){
      
      if(selectedTileId!=0)document.getElementById(selectedTileId).classList.replace("selected","unselected");
        
      tile.classList.add("selected");//adding settings from css
      selectedTileId=tile.id;
    } 
}

function checkResults(){
  resultsMode = !resultsMode;
  let tiles = document.querySelectorAll(".tile");
  if(resultsMode==true)
  {
    
    console.log("results=true"); 
     for (let i=0; i<tiles.length;i++){ //iterate all tiles for check
      if(allowedDigits.test(tiles[i].value)){///regex validation

         if( tiles[i].value != boardResults.charAt(i) && tiles[i].value != ""){
    
           tiles[i].classList.add("false");
         }
           else if(tiles[i].value  == boardResults.charAt(i) && tiles[i].value != ""){
            tiles[i].classList.add("right");
          }
     }else   {tiles[i].value= "";}      
  }
}else{
  console.log("results=false");
  for (let i=0; i<tiles.length;i++){
    tiles[i].classList.replace("false","unselected");
    tiles[i].classList.replace("right","unselected");
    
  }
}
let rightTiles = document.querySelectorAll(".right");
if(tiles.length == rightTiles.length){

  for(let i=0;i<rightTiles.length;i++){
rightTiles[i].readOnly=true;//make all tiles non-editable;
document.getElementById("msg_board").style.display="inline";
}
window.addEventListener("click", function() {
 
});
}

}

function hideWinMsg(){
  document.getElementById("msg_board").style.display="none";
}



    