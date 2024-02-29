import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
        
            const {name, email, password} = req.body
            //validate
            if(!name){
                next('please provide name')
            }
            if(!email){
                next('please provide vailed email')
            }
            if(!password){
                next('please provide strong password')
            }
                const exisitingUser = await userModel.findOne({email})
                if(exisitingUser){
                    next('Email already retistered please login')
                    }
                
                const user =await userModel.create({name, email, password})

                // Token
                const token =user.createJWT()
                res.status(201).send({
                    success: true,
                    message:"User created sucessfully",
                    user: {
                        name: user.name,
                        lastName: user.lastName,
                        email:user.email,
                        location: user.location
                        
                    },
                    token,
                });
      };


export const loginController = async (req, res) => {
                    const {email, password} = req.body
                    // validation
                    if(!email || !password){
                        next('Please Provide All Fields')
                    }

                    // find user by email
                    const user = await userModel.findOne({email}).select("+password");
                    if(!user){
                        next('Invaild Username or password')
                    }

                    //compare password
                    const isMatch = await user.comparePassword(password)
                    if(!isMatch){
                        next('Invaild Username and Password')
                    }

                    // hide password
                    user.password = undefined;

                    const token = user.createJWT()
                    res.status(200).json({
                        success : true,
                        message: "Login successfully",
                        user, 
                        token,
                    })
                };

     
