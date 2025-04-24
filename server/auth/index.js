require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { createNewInstructor, getInstructor, getInstructorById } = require("./db");

// Register a new instructor account
router.post("/register", async (req, res, next) => {
  try {
    const instructor = await createNewInstructor(req.body.username, req.body.password);

    // Create a token with the instructor id
    const token = jwt.sign(instructor.id, process.env.JWT);

    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

// Login to an existing instructor account
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const response = await getInstructor(username, password);
    
    if (response.password != password) {
      return res.status(401).send("Invalid login credentials.");
    }

    // Create a token with the instructor id
    const token = jwt.sign({ id: response.id }, process.env.JWT);

    res.send(token);
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in instructor
router.get("/me", async (req, res, next) => {
  try {
    const response = await getInstructorById(req.user);

    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
