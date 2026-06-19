'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../../redux/users/users.actions';
import { setAlert } from '../../../redux/alert/alert.actions';

const ProfileSettings = ({ userId, currentUsername, updateProfile, setAlert }) => {
  const [formData, setFormData] = useState({
    username: currentUsername || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      username: currentUsername || '',
    }));
  }, [currentUsername]);

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = formData.username.trim();
    const usernameChanged = trimmedUsername !== currentUsername;
    const passwordChanged = Boolean(formData.newPassword || formData.currentPassword);

    if (!usernameChanged && !passwordChanged) {
      setAlert('No changes to save.', 'warning');
      return;
    }

    if (usernameChanged && trimmedUsername.length < 5) {
      setAlert('Username must be at least 5 characters.', 'warning');
      return;
    }

    if (passwordChanged) {
      if (!formData.currentPassword) {
        setAlert('Current password is required to set a new password.', 'warning');
        return;
      }

      if (formData.newPassword.length < 5) {
        setAlert('New password must be at least 5 characters.', 'warning');
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setAlert('New password and confirmation do not match.', 'warning');
        return;
      }
    }

    setSubmitting(true);

    const payload = {};

    if (usernameChanged) {
      payload.username = trimmedUsername;
    }

    if (passwordChanged) {
      payload.currentPassword = formData.currentPassword;
      payload.newPassword = formData.newPassword;
    }

    const result = await updateProfile(userId, payload);

    if (result?.success) {
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }

    setSubmitting(false);
  };

  return (
    <section className='profile-settings s-card'>
      <h2 className='profile-settings__title'>Account Settings</h2>
      <p className='profile-settings__subtitle'>
        From your profile page, you can update your username or change your password below.
      </p>

      <form className='profile-settings__form' onSubmit={handleSubmit}>
        <div className='profile-settings__field'>
          <label className='s-label' htmlFor='username'>
            Username
          </label>
          <input
            id='username'
            className='s-input'
            type='text'
            name='username'
            value={formData.username}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <div className='profile-settings__section'>
          <h3 className='profile-settings__section-title'>Change Password</h3>
          <p className='profile-settings__section-text'>
            Leave blank if you only want to update your username.
          </p>

          <div className='profile-settings__field'>
            <label className='s-label' htmlFor='currentPassword'>
              Current password
            </label>
            <input
              id='currentPassword'
              className='s-input'
              type='password'
              name='currentPassword'
              value={formData.currentPassword}
              onChange={onChange}
              autoComplete='current-password'
            />
          </div>

          <div className='profile-settings__field'>
            <label className='s-label' htmlFor='newPassword'>
              New password
            </label>
            <input
              id='newPassword'
              className='s-input'
              type='password'
              name='newPassword'
              value={formData.newPassword}
              onChange={onChange}
              minLength={5}
              autoComplete='new-password'
            />
          </div>

          <div className='profile-settings__field'>
            <label className='s-label' htmlFor='confirmPassword'>
              Confirm new password
            </label>
            <input
              id='confirmPassword'
              className='s-input'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={onChange}
              minLength={5}
              autoComplete='new-password'
            />
          </div>
        </div>

        <button
          className='s-btn s-btn__primary profile-settings__submit'
          type='submit'
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </section>
  );
};

ProfileSettings.propTypes = {
  userId: PropTypes.string.isRequired,
  currentUsername: PropTypes.string.isRequired,
  updateProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile, setAlert })(ProfileSettings);
