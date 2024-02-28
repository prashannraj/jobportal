import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
        try {
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
                res.status(201).send({
                    success: true,
                    message:"User created sucessfully",
                    user,
                })

        } catch (error) {
            next (error);
             }
        
};
