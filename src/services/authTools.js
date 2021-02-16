const UserModel = require("./users/schema")
const atob = require("atob")


const basicAuthMiddleware = async (req, res, next) => {
    if (!req.headers.authorization) {
      const error = new Error("Please provide a basic authentication")
      error.httpStatusCode = 401
      next(error)
    } else {
      const [username, password] = atob(
        req.headers.authorization.split(" ")[1]
      ).split(":")
  
      const user = await UserModel.findByCredentials(username, password)
      if (!user) {
        const error = new Error("Wrong credentials provided")
        error.httpStatusCode = 401
        next(error)
      } else {
        req.user = user
      }
  
      next()
    }
  }

const adminOnlyMiddleware= async(req,res,next)=>{
    if(req.user && req.user.role ==="admin"){
        next()
    }else{
        const error = new Error("Admins only")
        error.httpStatusCode= 403
        next(error)
    }
}

module.exports={
    basic:basicAuthMiddleware,
    admin:adminOnlyMiddleware,
}