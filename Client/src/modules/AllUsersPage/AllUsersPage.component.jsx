'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../redux/users/users.actions';
import handleSorting from '../../utils/handleSorting';

import UserPanel from './UserPanel/UserPanel.component';
import Spinner from '../../components/molecules/Spinner/Spinner.component';
import SearchBox from '../../components/molecules/SearchBox/SearchBox.component';
import ButtonGroup from '../../components/molecules/ButtonGroup/ButtonGroup.component';
import EmptyState from '../../components/molecules/EmptyState/EmptyState.component';
import Pagination from '../../components/organisms/Pagination/Pagination.component';

const itemsPerPage = 18;

const AllUsersPage = ({ getUsers, user: { users, loading, error } }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [page, setPage] = useState(1);
  const [fetchSearch, setSearch] = useState('');
  const [sortType, setSortType] = useState('Popular');

  const handlePaginationChange = (e, value) => setPage(value);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1);
  };

  const filteredUsers = users
    ? users.filter((user) =>
        user.username.toLowerCase().includes(fetchSearch.toLowerCase())
      )
    : [];

  if (loading || users === null) {
    return <Spinner type='page' width='75px' height='200px' />;
  }

  if (error?.msg) {
    return (
      <div id='mainbar' className='users-page'>
        <div className='ac-error-state'>
          <h3 className='ac-error-state__title'>Unable to load users</h3>
          <p className='ac-empty-state__text'>{error.msg}</p>
          <button className='s-btn s-btn__primary' onClick={() => getUsers()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div id='mainbar' className='users-page fc-black-800'>
        <h1 className='headline'>Users</h1>
        <div className='headline-count'>
          <span>
            {new Intl.NumberFormat('en-IN').format(filteredUsers.length)} users
          </span>
        </div>
        <div className='users-box'>
          <SearchBox
            placeholder='Filter by username'
            handleChange={handleChange}
            width='240px'
          />
          <ButtonGroup
            buttons={['Popular', 'Name', 'Active', 'New Users']}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>
        <div className='user-browser'>
          {filteredUsers.length === 0 ? (
            <EmptyState
              icon='👥'
              title={fetchSearch ? 'No matching users' : 'No users yet'}
              message={
                fetchSearch
                  ? 'Try a different filter or clear your search.'
                  : 'Users will appear here once people sign up.'
              }
              actionText='Sign up'
              actionLink='/register'
            />
          ) : (
            <div className='grid-layout'>
              {filteredUsers
                .sort(handleSorting(sortType, 'users'))
                .slice(
                  (page - 1) * itemsPerPage,
                  page * itemsPerPage
                )
                .map((user) => (
                  <UserPanel key={user.id} user={user} />
                ))}
            </div>
          )}
        </div>
        {filteredUsers.length > itemsPerPage && (
          <Pagination
            page={page}
            itemList={filteredUsers}
            itemsPerPage={itemsPerPage}
            handlePaginationChange={handlePaginationChange}
          />
        )}
      </div>
    </Fragment>
  );
};

AllUsersPage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(AllUsersPage);
