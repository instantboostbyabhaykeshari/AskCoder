'use client';

import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getPosts} from '../../redux/posts/posts.actions';
import LinkButton from '../../components/molecules/LinkButton/LinkButton.component';
import PostItem from '../../components/molecules/PostItem/PostItem.component';
import Spinner from '../../components/molecules/Spinner/Spinner.component';
import EmptyState from '../../components/molecules/EmptyState/EmptyState.component';
import handleSorting from '../../utils/handleSorting';
import Pagination from '../../components/organisms/Pagination/Pagination.component';
import ButtonGroup from '../../components/molecules/ButtonGroup/ButtonGroup.component';
import handleFilter from '../../utils/handleFilter';

const itemsPerPage = 10;

const HomePage = ({getPosts, post: {posts, loading, error}}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('Month');

  const handlePaginationChange = (e, value) => setPage(value);

  if (loading || posts === null) {
    return <Spinner type='page' width='75px' height='200px' />;
  }

  if (error?.msg) {
    return (
      <div id='mainbar' className='homepage'>
        <div className='ac-error-state'>
          <h3 className='ac-error-state__title'>Unable to load questions</h3>
          <p className='ac-empty-state__text'>{error.msg}</p>
          <button className='s-btn s-btn__primary' onClick={() => getPosts()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  const filteredPosts = posts
    .sort(handleSorting(sortType))
    .filter(handleFilter(sortType));

  return (
    <Fragment>
      <div id='mainbar' className='homepage fc-black-800'>
        <div className='questions-grid'>
          <div>
            <h1 className='questions-headline'>Top Questions</h1>
            <p className='questions-subtitle'>
              Explore the most active questions from the community
            </p>
          </div>
          <div className='questions-btn'>
            <LinkButton
              text='Ask Question'
              link='/add/question'
              type='s-btn__primary'
            />
          </div>
        </div>

        <div className='questions-tabs'>
          <span className='questions-count'>
            {new Intl.NumberFormat('en-IN').format(posts.length)} questions
          </span>
          <div className='btns-filter'>
            <ButtonGroup
              buttons={['Today', 'Week', 'Month', 'Year']}
              selected={sortType}
              setSelected={setSortType}
            />
          </div>
        </div>

        <div className='questions'>
          {filteredPosts.length === 0 ? (
            <EmptyState
              icon='🚀'
              title='No questions yet'
              message='Welcome to AskCoder! Ask the first question to get started.'
              actionText='Ask Question'
              actionLink='/add/question'
            />
          ) : (
            filteredPosts
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((post) => <PostItem key={post.id} post={post} />)
          )}
        </div>

        {filteredPosts.length > itemsPerPage && (
          <Pagination
            page={page}
            itemList={filteredPosts}
            itemsPerPage={itemsPerPage}
            handlePaginationChange={handlePaginationChange}
          />
        )}
      </div>
    </Fragment>
  );
};

HomePage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPosts})(HomePage);
