'use client';

import React, {Fragment, useEffect, useState} from 'react';
import {useLocation} from '../../next/nextRouterAdapter.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from '../../redux/posts/posts.actions';
import handleSorting from '../../utils/handleSorting';

import LinkButton from '../../components/molecules/LinkButton/LinkButton.component';
import PostItem from '../../components/molecules/PostItem/PostItem.component';
import Spinner from '../../components/molecules/Spinner/Spinner.component';
import ButtonGroup from '../../components/molecules/ButtonGroup/ButtonGroup.component';
import SearchBox from '../../components/molecules/SearchBox/SearchBox.component';
import EmptyState from '../../components/molecules/EmptyState/EmptyState.component';
import Pagination from '../../components/organisms/Pagination/Pagination.component';

const itemsPerPage = 10;

const QuestionsPage = ({getPosts, post: {posts, loading, error}}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('Newest');

  const searchQuery = new URLSearchParams(useLocation().search).get('search') || '';

  const handlePaginationChange = (e, value) => setPage(value);

  const filteredPosts = posts
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (loading || posts === null) {
    return <Spinner type='page' width='75px' height='200px' />;
  }

  if (error?.msg) {
    return (
      <div id='mainbar' className='questions-page'>
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

  return (
    <Fragment>
      <div id='mainbar' className='questions-page fc-black-800'>
        <div className='questions-grid'>
          <div>
            <h1 className='questions-headline'>
              {searchQuery ? 'Search Results' : 'All Questions'}
            </h1>
            {searchQuery && (
              <p className='questions-subtitle'>
                Results for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>
          <div className='questions-btn'>
            <LinkButton
              text='Ask Question'
              link='/add/question'
              type='s-btn__primary'
            />
          </div>
        </div>

        {searchQuery && (
          <div className='search-questions'>
            <SearchBox placeholder='Search...' name='search' pt='mt8' />
          </div>
        )}

        <div className='questions-tabs'>
          <span className='questions-count'>
            {new Intl.NumberFormat('en-IN').format(filteredPosts.length)} questions
          </span>
          <ButtonGroup
            buttons={['Newest', 'Top', 'Views', 'Oldest']}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>

        <div className='questions'>
          {filteredPosts.length === 0 ? (
            <EmptyState
              icon='💬'
              title={searchQuery ? 'No matching questions' : 'No questions yet'}
              message={
                searchQuery
                  ? 'Try a different search term or browse all questions.'
                  : 'Be the first to ask a question and start the conversation.'
              }
              actionText='Ask Question'
              actionLink='/add/question'
            />
          ) : (
            filteredPosts
              .sort(handleSorting(sortType))
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

QuestionsPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPosts})(QuestionsPage);
