const bcrypt = require('bcrypt');

function isPasswordValid(password){
    if(password.length>5){
        return true;
    }else{return false;}
}
function isUsernameValid(username){
    if(username.length>5){
        
      return true;
    }else{  return false;}
}
async function cryptPassword(password){
   const hashed_pass =  await bcrypt.hashSync(password, 10);
    return hashed_pass;
}


async function isAuthPasswordValid(user_pass,db_hashed_pass){
    try {
        const result = await bcrypt.compare(user_pass, db_hashed_pass);
        if (result) {
            console.log("authentication successful");
            return true;
        } else {
            console.log("authentication failed. Password doesn't match");
            return false;
        }
    } catch (err) {
        return console.error(err);
    }
  
}

module.exports={
    isPasswordValid,
    isAuthPasswordValid,
    cryptPassword,
    isUsernameValid
}
