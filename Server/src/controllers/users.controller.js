const chalk = require("chalk");
const { validationResult } = require('express-validator');
const { responseHandler, asyncHandler } = require('../helpers');
const { usersService } = require('../services/index.js');

const User = (user) => ({
  username: user.username,
  password: user.password,
});

exports.getOneUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(chalk.green("Abhay Id :", id));

    await usersService.retrieveOne(
      id,
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(chalk.green("User Data error:"));
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  try {
    await usersService.retrieveAll(
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseHandler(false, 400, errors.array()[0].msg, null));
  }
  try {
    // Register user in the database
    await usersService.register(User(req.body), (err, data) => {
      if (err) {
        console.log(err);
        return res.status(err.code).json(err);
      }
      return res.status(data.code).json(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

exports.updateUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseHandler(false, 400, errors.array()[0].msg, null));
  }

  const { currentPassword, newPassword } = req.body;

  if (newPassword && !currentPassword) {
    return res
      .status(400)
      .json(responseHandler(false, 400, 'Current password is required', null));
  }

  try {
    await usersService.updateProfile(
      req.params.id,
      req.user.id,
      req.body,
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      },
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});
