const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register a user
// @route POST api/user/register
// @access public route
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(404).json({ message: "All Fields Are Mandatory." });
    }

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(404).json({ message: "Email Already Present." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      return res.status(200).json({ message: "User Created Successfully." });
    }
  } catch (error) {
    res.status(500).json(`Error Creating User:${error}`);
  }
};

// @desc Login a user
// @route POST api/user/login
// @access public route
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ message: "All Fields Are Mandatory." });
    }

    const isUserValid = await User.findOne({ email });

    if (isUserValid && (await bcrypt.compare(password, isUserValid.password))) {
      // Generate Token
      const token = jwt.sign({ isUserValid }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({ AuthToken: token });
    } else {
      res.status(400).json({ message: "User Not Present." });
    }
  } catch (error) {
    res.status(500).json(`Error Creating User:${error}`);
  }
};

module.exports = { createUser, loginUser };
