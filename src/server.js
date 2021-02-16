const express = require("express")
const cors = require("cors")


const listEndPoints = require("express-list-endpoints")

const mongoose = require("mongoose")

const userRouter = require("./services/users")


const {
    notFoundHandler,
    forbiddenHandler,
    badRequestHandler,
    genericErrorHandler,
  } = require("./errorHandlers")
  
  const server = express()
  
  server.use(cors())
  const port = process.env.PORT
  

  server.use(express.json())

      server.use("/users",userRouter)

      server.use(badRequestHandler)
      server.use(forbiddenHandler)
      server.use(notFoundHandler)
      server.use(genericErrorHandler)


      console.log(listEndPoints(server))

      mongoose.set("debug",true)

      mongoose
      .connect(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(
        server.listen(port, () => {
          console.log("Running on port", port)
        })
      )
      .catch(err => console.log(err))
