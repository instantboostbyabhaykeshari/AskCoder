'use client';

import React, {Fragment, useState} from 'react';
import {Link, useHistory} from '../../../next/nextRouterAdapter.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../../redux/auth/auth.actions';

import {ReactComponent as Search} from '../../../assets/Search.svg';
import AskCoderLogo from '../../atoms/AskCoderLogo/AskCoderLogo.component';
import Spinner from '../../molecules/Spinner/Spinner.component';
import LinkButton from '../../molecules/LinkButton/LinkButton.component';
import MobileSideBar from '../../organisms/MobileSideBar/MobileSideBar.component';

const Header = ({auth: {isAuthenticated, loading, user}, logout}) => {
  const history = useHistory();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    history.push(query ? `/questions?search=${encodeURIComponent(query)}` : '/questions');
    setSearchOpen(false);
  };

  const authLinks = (
    <div className='header-actions'>
      {loading || user === null ? (
        <Spinner width='32px' height='32px' />
      ) : (
        <Link
          to={`/users/${user.id}`}
          title='View profile and update username or password'
          className='header-profile-link'
        >
          <img alt='user avatar' className='header-avatar' src={user.gravatar} />
          <span className='header-username'>{user.username}</span>
        </Link>
      )}
      <LinkButton
        text='Log out'
        link='/login'
        type='s-btn__filled'
        handleClick={logout}
      />
    </div>
  );

  const guestLinks = (
    <div className='header-actions'>
      <LinkButton text='Log in' link='/login' type='s-btn__filled' />
      <LinkButton text='Sign up' link='/register' type='s-btn__primary' />
    </div>
  );

  return loading ? null : (
    <Fragment>
      <header className='ac-header'>
        <div className='ac-header__inner'>
          <div className='ac-header__left'>
            <div className='hamburger'>
              <MobileSideBar hasOverlay />
            </div>
            <Link className='ac-header__brand' to='/'>
              <AskCoderLogo width={170} className='full-logo' priority />
              <AskCoderLogo width={110} className='glyph-logo' />
            </Link>
          </div>

          <form className='ac-header__search' onSubmit={handleSearch} autoComplete='off'>
            <Search className='ac-header__search-icon' />
            <input
              className='s-input s-input__search ac-header__search-input'
              type='text'
              name='search'
              maxLength='100'
              placeholder='Search questions...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className='ac-header__right'>
            <Search
              className='search-icon'
              onClick={() => setSearchOpen(!searchOpen)}
            />
            {!loading && (isAuthenticated ? authLinks : guestLinks)}
          </div>
        </div>
      </header>

      {searchOpen && (
        <form className='small-search-form' onSubmit={handleSearch} autoComplete='off'>
          <input
            className='small-search s-input'
            type='text'
            name='search'
            maxLength='100'
            placeholder='Search questions...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <Search className='small-search-icon' />
        </form>
      )}
    </Fragment>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Header);
