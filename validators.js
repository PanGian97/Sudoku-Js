const bcrypt = require('bcrypt');

function isPasswordValid(password){
    if(password.length>5){
        return true;
    }else{return false;}
}
function isUsernameValid(username){
    if(username.length>5){
      return true;
    }else{return false;}
}
function cryptPassword(password){
    return bcrypt.hashSync(password, 10);
}


function isAuthPasswordValid(user_pass,db_hashed_pass){
return bcrypt.compare(user_pass,db_hashed_pass).then((result)=>{
    if(result){
      console.log("authentication successful")
      return true;
    } else {
      console.log("authentication failed. Password doesn't match")
      return false;
    }
  })
  .catch((err)=>console.error(err));
  
}

module.exports={
    isPasswordValid,
    isAuthPasswordValid,
    cryptPassword,
    isUsernameValid
}
