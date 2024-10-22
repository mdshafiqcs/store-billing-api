import { User } from "../models/user.model.js";
import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import bcrypt from "bcrypt";

const cookieOptions = {httpOnly: true, secure: true}

const login = asyncHandler( async(req,res) => {
  const {email, password} = req.body;

  if( !email){
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({ email })

  if(!user){
    throw new ApiError(400, "Invalid Credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if(!isPasswordCorrect){
    throw new ApiError(400, "Invalid Credentials");
  }

  user.password = undefined;

  const accessToken = user.generateAccessToken();

  return res.status(200)
  .cookie("accessToken", accessToken, cookieOptions)
  .json(
    new ApiResponse(200, {
      user,
      accessToken,
    })
  )
})


const register = asyncHandler( async(req,res) => {
  const {email, password, fullname} = req.body;

  if(!email){
    throw new ApiError(400, "email is required");
  }

  const existingUser = await User.findOne({ email })

  if(existingUser){
    throw new ApiError(400, "User already exists with this email");
  }

  await User.create({email, password, fullname});

  return res.status(201).json(
    new ApiResponse(201, null, "Sign up successful, now try to login"),
  )

})




export {
  login,
  register,
}