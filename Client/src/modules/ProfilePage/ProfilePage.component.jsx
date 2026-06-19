'use client';

import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from "../../next/nextRouterAdapter.js";
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/users/users.actions';

import UserSection from "./UserSection/UserSection.component";
import ProfileSettings from './ProfileSettings/ProfileSettings.component';
import Spinner from '../../components/molecules/Spinner/Spinner.component';
import ExternalUserDetails from "./ExternalUserDetails/ExternalUserDetails.component";
import UserActivity from "./UserActivity/UserActivity.component";


const ProfilePage = ({getProfile, user: {user, loading}, auth}) => {
  const { id } = useParams();

  useEffect(() => {
    getProfile(id);
  }, [getProfile, id]);

  const isOwnProfile =
    auth.isAuthenticated && auth.user && String(auth.user.id) === String(user?.id);

  return loading || user === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      <div id='mainbar' className='user-main-bar pl24 pt24'>
        <div className='user-card'>
          <div className='grid--cell s-navigation mb16'>
            <Link
              to='#'
              className='s-navigation--item is-selected'
              data-shortcut='P'
            >
              Profile
            </Link>
            <Link to='#' className='s-navigation--item' data-shortcut='A'>
              Activity
            </Link>
          </div>
          <UserSection user={user}/>
          {isOwnProfile && (
            <div className='profile-settings-prompt s-card' role='note'>
              <span className='material-icons profile-settings-prompt__icon' aria-hidden='true'>
                info
              </span>
              <div>
                <p className='profile-settings-prompt__title'>
                  Manage your account
                </p>
                <p className='profile-settings-prompt__text'>
                  You opened your profile from the header user link. Scroll down to
                  update your username or change your password, then click Save changes.
                </p>
              </div>
            </div>
          )}
          {isOwnProfile && (
            <ProfileSettings
              userId={user.id}
              currentUsername={user.username}
            />
          )}
        </div>
        <div className='row-grid'>
          <ExternalUserDetails/>
          <UserActivity/>
        </div>
      </div>
    </Fragment>
  );
};

ProfilePage.propTypes = {
  getProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, {getProfile})(ProfilePage);
