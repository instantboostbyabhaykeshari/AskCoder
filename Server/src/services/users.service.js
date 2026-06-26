const bcrypt = require('bcryptjs');

const { responseHandler, getJwtToken } = require('../helpers');
const { UsersRepository } = require('./data');
const chalk = require('chalk');

exports.register = async (newUser, result) => {
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  const insertObj = await UsersRepository.create(newUser);

  const payload = {
    user: {
      id: insertObj.dataValues.id,
    },
  };

  getJwtToken(payload, 'User registered', result);

  return payload;
};

exports.login = async (newUser, result) => {
  const user = await UsersRepository.retrieveOne({ username: newUser.username });

  if (user === null) {
    result(
      responseHandler(
        false,
        404,
        'User does not exists',
        null,
      ),
      null,
    );
    return null;
  }

  const isMatch = await bcrypt.compare(newUser.password, user.password);

  if (!isMatch) {
    result(
      responseHandler(false, 400, 'Incorrect password', null),
      null,
    );

    return null;
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  getJwtToken(payload, 'User logged in', result);

  return payload;
};

exports.retrieveAll = (result) => UsersRepository.retrieveAll(result);

exports.retrieveOne = async (id, result) => {
  await UsersRepository.incrementViews(id);

  const queryResult = await UsersRepository.retrieveOneWithCounts(id);
  console.log(chalk.bgGreen("Query result", queryResult));

  return result(null, responseHandler(true, 200, 'Success', queryResult));
};

exports.loadUser = async (userId, result) => {
  const response = await UsersRepository.retrieveOne({ id: userId }, result);
  result(null, responseHandler(true, 200, 'Success', response));
};

exports.updateProfile = async (userId, requestUserId, profileData, result) => {
  if (userId !== requestUserId) {
    result(
      responseHandler(false, 401, 'You are not authorized to update this profile', null),
      null,
    );
    return null;
  }

  const user = await UsersRepository.retrieveOne({ id: userId });

  if (user === null) {
    result(responseHandler(false, 404, 'User not found', null), null);
    return null;
  }

  const updates = {};
  const { username, currentPassword, newPassword } = profileData;

  if (username && username.trim() !== user.username) {
    const trimmedUsername = username.trim();
    const existingUser = await UsersRepository.retrieveOne({ username: trimmedUsername });

    if (existingUser !== null) {
      result(responseHandler(false, 400, 'Username already taken', null), null);
      return null;
    }

    updates.username = trimmedUsername;
  }

  if (newPassword) {
    if (!currentPassword) {
      result(responseHandler(false, 400, 'Current password is required', null), null);
      return null;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      result(responseHandler(false, 400, 'Current password is incorrect', null), null);
      return null;
    }

    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(newPassword, salt);
  }

  if (Object.keys(updates).length === 0) {
    result(responseHandler(false, 400, 'No changes to update', null), null);
    return null;
  }

  await UsersRepository.update(userId, updates);

  const updatedProfile = await UsersRepository.retrieveOneWithCounts(userId);

  result(null, responseHandler(true, 200, 'Profile updated successfully', updatedProfile));

  return updatedProfile;
};
