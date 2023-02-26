const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')


const mid = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
  
      if (authorization && authorization.startsWith("Bearer")) {
        let token = authorization.split(" ")[1];
        const { userID } = jwt.verify(token, "sonukumaryadavkey");
        req.user = await userModel.findById(userID).select("--password");
      //  console.log(req.user)
        next();
      } else {
        return res.status(401).send({ msg: "Unauthorised user" })
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: error.message })
    }
  };
  
  
  
  module.exports = mid;