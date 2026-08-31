import { Router } from "express";
import { registerValidation } from "../validator/register.validate.js";
import { ratelimit } from "../middleware/ratelimmitter.js";
import { register ,login,logout,logoutAll,update,getme} from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { userauth } from "../middleware/user.middleware.js";

export const router =Router();
/*
* @route POST  api/v1/auth/register
* @description register new user ,expect username,email,and password in request
* @access public
*/ 
router.post("/register",registerValidation,auth,register);
/*
* @route POST  api/v1/auth/login
* @description login the existing user ,expect username,email,and password in request
* @access public
*/
router.post("/login",ratelimit,login);
/*
* @route get  api/v1/auth/getuser
* @description get detail of existing user
* @access private
*/
router.get("/getuser",userauth,getme);
/*
* @route get  api/v1/auth/logout
* @description clear token from the user and revoke:true in session model
* @access public
*/
router.get("/logout",userauth,logout);
/*
* @route get  api/v1/auth/logoutall
* @description clear token from the user and all revoke:true from the session model
* @access public
*/
router.get("/logoutAll",userauth,logoutAll);
/*
* @route put  api/v1/auth/update
* @description get update user data from usermodel 
* @access private
*/
router.put("/updateuser",userauth,update);
