const asyncHandler = require("express-async-handler");
const goals = require("../models/goal");

const getallgoals = asyncHandler(async (req, res) => {
  const mygoals = await goals.find({ user: req.user.id });
  res.status(200).json(mygoals);
});

const setnewgoal = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title && !description) {
    res.status(400);
    throw new Error("Please add a text field and title");
  }

  const goal = await goals.create({ user: req.user.id, title, description });
  res.status(201).json(goal);
});

const deletegoal = asyncHandler(async (req, res) => {
  const goal = await goals.findById(req.params.id).exec();
  console.log(goal);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});

const updategoal = asyncHandler(async (req, res) => {
  const goal = await goals.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Make sure the user is the owner of the goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401).json({ msg: "not authorised" });
  }
  const updatedGoal = await goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

module.exports = { getallgoals, setnewgoal, deletegoal, updategoal };
