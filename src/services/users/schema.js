const {Schema,model} = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new Schema(
    {

        username:{
            type:String,
            required:true,
            unique:true,
            
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
          },

          firstName:{
              type:String,
              required:true,
          },
          lastName:{
              type:String,
              required:true,
          },
          role:{
              type:String,
              enem:["user","admin"],
              required:true,
          },

    },
    {timestamps:true}
)

UserSchema.statics.findByCredentials = async function(username,password){
    const user = await this.findOne({username})

    if(user){
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch) {
            return user
        }
        else{
            return "else 1"
        }
    }else {
        return "else 2"
    }
}


UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
  
    delete userObject.password
    delete userObject.__v
  
    return userObject
  }
UserSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 10)
    }
    next()
  })


module.exports = model("User",UserSchema)