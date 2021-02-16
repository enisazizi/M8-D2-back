const express = require("express")
const UserModel = require("./schema")
const {admin,basic} = require("../authTools")



const userRouter = express.Router()

userRouter.get("/", basic, admin, async (req, res, next) => {
    try {
      const users = await UserModel.find()
      res.send(users)
    } catch (error) {
      next(error)
    }
  })




userRouter.post("/register",async(req,res,next)=>{
    try {
        const newUser = new UserModel(req.body)
        const {_id} = await newUser.save()
        res.status(201).send(_id)
    } catch (error) {
        next(error)
        console.log('asdasdasda')
    }
})

userRouter.get("/me",basic,async(req,res,next)=>{
    try {
        res.send(req.user)
    } catch (error) {
        next(error)
    }
})

userRouter.put("/me",basic,async(req,res,next)=>{
    try {
        const modifyUser = Object.keys(req.body)
        console.log("what is that",modifyUser)

        modifyUser.forEach(fild =>(req.user[fild]=req.body[fild]))
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        next(error)
    }
})

userRouter.delete("/me",basic,async(req,res,next)=>{
    try {
        await req.user.deleteOne()
        res.status(204).send("Deleted")
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter