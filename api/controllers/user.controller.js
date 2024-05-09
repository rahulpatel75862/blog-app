import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.json({ message: "API is working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update that user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be atleast 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.userName) {
    if (req.body.userName.length < 7 || req.body.userName.length > 20) {
      return next(
        errorHandler(
          400,
          "userName must be between 7 and 20 characters of length"
        )
      );
    }
    if (req.body.userName.includes(" ")) {
      return next(errorHandler(400, "UserName cannot contain spaces"));
    }
    if (req.body.userName !== req.body.userName.toLowerCase()) {
      return next(errorHandler(400, "userName Must be lowerCase"));
    }
    if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "userName can only contain letters and numbers")
      );
    }
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async(req, res, next) => {
  if(req.user.id !== req.params.userId){
    return next(errorHandler(400, 'You are not allowed to delete that user!!'))
  }
  try{
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User Deleted Successfully')
  } catch(error){
    next(error)
  }
}

export const signOut = async(req, res, next) => {
  try{
    res.clearCookie('access_token').status(200).json('User has been Signed Out!!')

  } catch(error){
    next(error)
  }
}
