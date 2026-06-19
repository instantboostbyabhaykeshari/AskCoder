'use client';

import React, {useEffect, Fragment} from 'react';
import moment from 'moment';
import {useParams} from '../../next/nextRouterAdapter.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPost} from '../../redux/posts/posts.actions';

import LinkButton from '../../components/molecules/LinkButton/LinkButton.component';
import Spinner from '../../components/molecules/Spinner/Spinner.component';
import AnswerSection from './AnswerSection/AnswerSection.component';
import QuestionSection from './QuestionSection/QuestionSection.component';

import censorBadWords from '../../utils/censorBadWords';

const Post = ({getPost, post: {post, loading, error}}) => {
  const {id} = useParams();

  useEffect(() => {
    getPost(id);
    // eslint-disable-next-line
  }, [getPost, id]);

  if (loading || post === null) {
    return <Spinner type='page' width='75px' height='200px' />;
  }

  if (error?.msg) {
    return (
      <div id='mainbar' className='post'>
        <div className='ac-error-state'>
          <h3 className='ac-error-state__title'>Unable to load question</h3>
          <p className='ac-empty-state__text'>{error.msg}</p>
          <LinkButton text='Browse Questions' link='/questions' type='s-btn__primary' />
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div id='mainbar' className='post'>
        <div className='question-header'>
          <h1 className='question-title'>{censorBadWords(post.title)}</h1>
          <LinkButton
            text='Ask Question'
            link='/add/question'
            type='s-btn__primary'
          />
        </div>

        <div className='question-meta'>
          <div className='question-meta-item'>
            <span className='meta-label'>Asked</span>
            <time dateTime={post.created_at}>
              {moment(post.created_at).fromNow()}
            </time>
          </div>
          <div className='question-meta-item'>
            <span className='meta-label'>Viewed</span>
            <span>{post.views} times</span>
          </div>
        </div>

        <div className='question-main'>
          <QuestionSection />
          <AnswerSection />
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPost})(Post);
