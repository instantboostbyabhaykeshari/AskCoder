import axios from 'axios';
import chalk from "chalk";


import {usersData as _usersData, profileData as _profileData} from './urls';

export const usersData = () => {
  return axios.get(_usersData);
  console.log(chalk.bgGreen("User Data", _usersData));
};

export const profileData = (id) => {
  return axios.get(_profileData.replace('{id}', id));
};

export const updateProfileData = (id, formData) => {
  return axios.put(_profileData.replace('{id}', id), formData);
};
