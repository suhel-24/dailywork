const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const z = require("zod");

const myschma = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

//finduser func
const finduser = asyncHandler(async (req, res) => {
  //get user from the req body
  const userDetails = {
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.findOne({ email: userDetails.email });
  if (user && (await bcrypt.compare(userDetails.password, user.password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken({ id: user._id, email: user.email }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//adduser func
const adduser = asyncHandler(async (req, res) => {
  const userDetails = {
    email: req.body.email,
    password: req.body.password,
  };

  //zod validation
  try {
    myschma.parse(userDetails);
  } catch (error) {
    res.status(401);
    throw new Error("validation error wrong input");
  }

  //check if the user already exists in the database
  const userExists = await User.findOne({ email: userDetails.email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //encrpt the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userDetails.password, salt);

  //delete real password
  delete userDetails.password;

  //create user
  const createdUser = await User.create({
    ...userDetails,
    password: hashedPassword,
  });

  if (createdUser) {
    res.status(201).json({
      id: createdUser._id,
      email: createdUser.email,
      token: generateToken({ id: createdUser._id, email: createdUser.email }),
    });
  } else {
    res.status(400);
    throw new error("invalid user");
  }
});

//get user func
const getuser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const generateToken = (payload) => {
  console.log(payload);
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { finduser, adduser, getuser };
