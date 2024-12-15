import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from 'otp-generator';

/** middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}

export async function register(req, res) {
    try {
      const { username, password, profile, email } = req.body;
  
      // Validate inputs
      if (!username || !password || !email) {
        return res.status(400).send({ error: "All fields (username, password, email) are required." });
      }
  
      // Check for existing username
      const existingUsername = await UserModel.findOne({ username });
      if (existingUsername) {
        return res.status(400).send({ error: "Please use a unique username" });
      }
  
      // Check for existing email
      const existingEmail = await UserModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).send({ error: "Please use a unique email" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const user = new UserModel({
        username,
        password: hashedPassword,
        profile: profile || '',
        email,
      });
  
      // Save the user and send response
      await user.save();
      return res.status(201).send({ msg: "User Registered Successfully" });
    } catch (error) {
      return res.status(500).send({ error: error.message || "Internal Server Error" });
    }
}

export async function login(req,res){
   
    const { username, password } = req.body;

    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username : user.username
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}

export async function getUser(req, res) {
    const { username } = req.params;

    try {
        // Check if the username parameter is provided
        if (!username) {
            return res.status(400).send({ error: "Username parameter is required." });
        }

        // Search for the user in the database
        const user = await UserModel.findOne({ username }).exec();

        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }

        // Remove the password field from the response
        const { password, ...rest } = user.toObject(); // `toObject()` works similarly to `toJSON()`

        return res.status(200).send(rest);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).send({ error: "An error occurred while fetching the user." });
    }
}

export async function updateUser(req, res) {
    try {
        const { userId } = req.user;

        // Ensure userId exists
        if (!userId) {
            return res.status(401).send({ error: "User Not Found" });
        }

        const body = req.body;

        // Use await with updateOne to avoid the callback issue
        const result = await UserModel.updateOne({ _id: userId }, body);

        // Check if any document was modified
        if (result.modifiedCount === 0) {
            return res.status(400).send({ error: "No changes made to the user" });
        }

        return res.status(201).send({ msg: "Record Updated!" });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}

export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}

export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
         return res.status(201).send({ flag : req.app.locals.resetSession})
    }
    return res.status(440).send({error : "Session expired!"})
 }

 export async function resetPassword(req, res) {
    try {
        // Check if reset session is still active
        if (!req.app.locals.resetSession) {
            return res.status(440).send({ error: "Session expired!" });
        }

        const { username, password } = req.body;

        // Find the user
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        await UserModel.updateOne(
            { username: user.username },
            { $set: { password: hashedPassword } }
        );

        // Reset session and send success response
        req.app.locals.resetSession = false; // reset session
        return res.status(201).send({ msg: "Record Updated...!" });

    } catch (error) {
        console.error("Error in resetPassword:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}
