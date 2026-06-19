'use client';

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeAlert} from '../../redux/alert/alert.actions';

const TOAST_ICONS = {
  success: 'check_circle',
  danger: 'error',
  warning: 'warning',
  info: 'info',
};

const Toast = ({alert, onDismiss}) => {
  const icon = TOAST_ICONS[alert.alertType] || TOAST_ICONS.info;

  return (
    <div
      className={`ac-toast ac-toast--${alert.alertType}`}
      role='alert'
    >
      <span className='material-icons ac-toast__icon' aria-hidden='true'>
        {icon}
      </span>
      <p className='ac-toast__message'>{alert.msg}</p>
      <button
        type='button'
        className='ac-toast__close'
        onClick={() => onDismiss(alert.id)}
        aria-label='Dismiss notification'
      >
        <span className='material-icons' aria-hidden='true'>
          close
        </span>
      </button>
    </div>
  );
};

Toast.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    alertType: PropTypes.string.isRequired,
  }).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

const Alert = ({alerts, removeAlert}) => {
  if (!alerts.length) {
    return null;
  }

  return (
    <div
      className='ac-toast-container'
      aria-live='polite'
      aria-atomic='false'
    >
      {alerts.map((alert) => (
        <Toast key={alert.id} alert={alert} onDismiss={removeAlert} />
      ))}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {removeAlert})(Alert);
