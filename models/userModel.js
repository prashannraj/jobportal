import mongoose from "mongoose";
import validator from "validator";

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
        validate: validator.isStrongPassword
    },
    location: {
        type: String,
        default: "Nepal",
    },
},
{timestamps: true}
);

export default mongoose.model('User', userSchema)