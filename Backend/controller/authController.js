const express = require('express');
const authRouter = express.Router();
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets');
const { redirect } = require('express/lib/response');
//const {sendMail}=require('../utility/nodemailer');
const { send } = require('process');
//signUp user
module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        //sendMail("signup",user);
        if (user) {
            res.json({
                message: "user signed up",
                data: user
            })
        }
        else {
            res.json({
                message: "error while singing up"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

//login user 
module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    let uid = user['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: "user has been logged in",
                        userDetails: data
                    });
                }
                else {
                    return res.json({
                        message: "wrong credentials"
                    });
                }
            }
            else {
                return res.json({
                    message: "user not found"
                })
            }
        }
        else {
            return res.json({
                message: "empty field found"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}



module.exports.protectRoute=async function protectRoute(req, res, next) {
  
    try {
        let token;
        if (req.cookies.login) {
            console.log(req.cookies);
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                next();
            }
            else {
                return res.json({
                    message: "user not verified"
                })
            }
        }
        else {
            //browser se h 
            const client=req.get('User-Agent');
            if(client.includes("Mozilla")==true||client.includes("chrome")==true){
                return redirect('/login');
            }
            //postman se h 
            else{
            return res.json({
                message: "please login again"
            })
        }
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}


//forget password
module.exports.forgetpassword=async function forgetpassword(req,res){
    let {email}=req.body;
    try{
        const user=await userModel.findOne({email:email});
        if(user){
        const resetToken=user.createResetToken();
        let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`
        //send email via nodemailer
        let obj={
            resetPasswordLink:resetPasswordLink,
            email:email
        }
        sendMail("resetpassword",obj); 
        return res.json({
            message:"reset link has been sent to your email"
        })    
        }
        else{
            return res.json({
                message:"please signup first"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

//reset password

module.exports.resetpassword=async function resetpassword(req,res){
    try{
        const token=req.params.token;
        let{password}=req.body;
        const user=await userModel.findOne({resetToken:token});
        if(user){
            user.resetPasswordHandler(password);
            await user.save();
            res.json({
            message:"password updated successfully"
            });
        }
        else{
            res.json({
                message:"user not find"
            })
        }
        //resetpasswrod handler will update password in db
        
    }
    catch(err){
        message:err.message
    }
}

//logout

module.exports.logout=function logout(req,res){
    res.cookie('login','',{maxAge:1});
    //redirect to login bhi krskte ho 
    res.json({
        message:"user logged out successfully"
    })
}