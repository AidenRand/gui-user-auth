import User from "../Models/UserModel.js";
import createSecretToken from "../Utils/SecretToken.js";
import bcrypt from "bcrypt";

export async function SignUp(req, res, next) {
    try {
        const {email, username, password, createAt} = req.body;
        console.log("email", email);
        console.log("req.body", req.body);
        const existingUser = await User.findOne({email}); 
        
        if (existingUser) {
            // return res.json({message: 'User already exists'});
            throw new Error('User already exists');
        }

        const user = await User.create({email, username, password, createAt});
        const token = createSecretToken(user._id);
        res.cookie('token', token, {
            withCredentials: true,
            httpOnly: false
        });

        res.send({message: 'User create successfully', success: true, user});
        next();
    } catch (err) {
        console.log('err', err);
        res.status(500).send({message: err.message});
    }
}

export async function LogIn(req, res, next)
{
    try {
        const { email, password } = req.body;
        if(!email || !password ){
          return res.json({message:'All fields are required'})
        }
        const user = await User.findOne({ email });
        if(!user){
          return res.json({message:'User does not exist' }) 
        }
        const auth = bcrypt.compare(password,user.password)
        if (!auth) {
          return res.json({message:'Incorrect password or email' }) 
        }
         const token = createSecretToken(user._id);
         res.cookie("token", token, {
           withCredentials: true,
           httpOnly: false,
         });
         res.status(201).json({ message: "User logged in successfully", success: true });
         next()
      } catch (error) {
        console.error(error);
      }
}
