const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Ahmed Sandhu",
    email: "ahmed@test.com",
    password: "12345",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    throw new HttpError("Invalid input passed, please check!", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);
  if (hasUser) {
    throw new HttpError("User already exist", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const idendifiedUser = DUMMY_USERS.find((user) => user.email === email);

  if (!idendifiedUser || idendifiedUser.password !== password) {
    throw new HttpError("Could not found user", 401);
  }

  res.json({ message: "Logged In!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
