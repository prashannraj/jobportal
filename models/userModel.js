import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

//schema

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is Required']
    },
    lastName:{
        type:String,
    },
    email: {
        type: String,
        required : [true, 'Name is Required'],
        unique: true,
        validate: validator.isEmail
    },
    password:{
        type: String,
        required: [true, 'password must be 8 charcter, one special and number charcter'],
        validate: validator.isStrongPassword,
        select: true
    },
    location: {
        type: String,
        default: "Nepal",
    },
},
{timestamps: true}
);
// middleware for password hash
userSchema.pre('save', async function() {
        const salt =await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
})

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
};

// Json webtoken
userSchema.methods.createJWT = function(){
    return Jwt.sign({userId:this._id}, process.env.JWT_SECRETE, {expiresIn :'1d'})
}
export default mongoose.model('User', userSchema)