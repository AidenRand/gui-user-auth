import User from "../Models/UserModel.js";
import createSecretToken from "../Utils/SecretToken.js";
import bcrypt from "bcrypt";

export async function SignUp(req, res, next) {
    try {
        const {email, username, password, createAt} = req.body;
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
        console.log("req.body", req.body);

        if(!email || !password ){
          return res.json({message:'All fields are required'})
        }
        const user = await User.findOne({ email });
        if(!user){
          throw new Error('User does not exist');
        }
        const auth = bcrypt.compare(password,user.password)
        if (!auth) {
          throw new Error('Password is incorrect');
        }
         const token = createSecretToken(user._id);
         res.cookie("token", token, {
           withCredentials: true,
           httpOnly: false,
         });
         res.send({message: "User login successfully", success: true, user});
         next()
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message })
      }
}
