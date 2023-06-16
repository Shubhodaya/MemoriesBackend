import jwt from 'jsonwebtoken';

//wants to like a post
// click the like button => auth middleware (next) => like controller...

  
const auth = async(req,res,next) =>{

try{
   const token = req.headers.authorization.split(" ")[1];
   const isCustomAuth = token.length<500;

   let decodedData;
 
   //our own token
   if(token && isCustomAuth){
    decodedData = jwt.verify(token, 'test'); //test is secret key which we have used in token

    req.userId = decodedData?.id;
   }else{ //google auth token
    decodedData = jwt.decode(token);

    req.userId = decodedData ?.sub;
   }

next();
}catch(e){
console.log(e);
}

}

export default auth;
