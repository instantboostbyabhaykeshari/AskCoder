'use client';

import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect} from '../../next/nextRouterAdapter.js';
import PropTypes from 'prop-types';

import Caption from './Caption/Caption.component';
import AuthForm from '../../components/organisms/AuthForm/AuthForm.component';
import Footer from "../../components/organisms/Footer/Footer.component";


const Register = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <div className='auth-page'>
        <div className='register-content'>
          <div className='register-grid'>
            <Caption />
            <AuthForm action={'Sign up'} />
          </div>
        </div>
      </div>
      <Footer/>
    </Fragment>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Register);
