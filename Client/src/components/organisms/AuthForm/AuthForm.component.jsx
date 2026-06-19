'use client';

import React, {Fragment, useState} from 'react';
import {Link} from '../../../next/nextRouterAdapter.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../../redux/auth/auth.actions';
import {register} from '../../../redux/auth/auth.actions';

import AskCoderLogo from '../../atoms/AskCoderLogo/AskCoderLogo.component';

const AuthForm = ({register, login, action}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const {username, password} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === 'Sign up') {
      register({username, password});
    } else {
      login({username, password});
    }
  };

  const signUpLink = (
    <Fragment>
      Already have an account?{' '}
      <Link to='/login' name='login'>
        Log in
      </Link>
    </Fragment>
  );

  const logInLink = (
    <Fragment>
      Don&apos;t have an account?{' '}
      <Link to='/register' name='register'>
        Sign up
      </Link>
    </Fragment>
  );

  return (
    <div className='auth-form-wrapper'>
      <div className='auth-form-header'>
        <AskCoderLogo width={180} className='auth-form-logo' />
        <h1 className='auth-form-title'>
          {action === 'Sign up' ? 'Join AskCoder' : 'Welcome back'}
        </h1>
        <p className='auth-form-subtitle'>
          {action === 'Sign up'
            ? 'Create an account to ask questions and share knowledge.'
            : 'Log in to continue to AskCoder.'}
        </p>
      </div>

      <div className='form-container'>
        <form className='login-form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-field'>
            <label className='form-label s-label' htmlFor='username'>
              Username
            </label>
            <input
              className='form-input s-input'
              type='text'
              name='username'
              value={username}
              onChange={(e) => onChange(e)}
              id='username'
              placeholder='Enter your username'
              required
            />
          </div>
          <div className='form-field'>
            <label className='form-label s-label' htmlFor='password'>
              Password
            </label>
            <input
              className='form-input s-input'
              type='password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              id='password'
              placeholder='Enter your password'
              required
            />
          </div>
          <div className='form-submit'>
            <button
              className='s-btn s-btn__primary auth-submit-btn'
              id='submit-button'
              name='submit-button'
              type='submit'
            >
              {action}
            </button>
          </div>
        </form>
      </div>

      <div className='redirects fc-black-500'>
        {action === 'Sign up' ? signUpLink : logInLink}
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login, register})(AuthForm);
