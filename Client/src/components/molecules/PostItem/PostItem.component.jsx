'use client';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from '../../../next/nextRouterAdapter.js';

import censorBadWords from '../../../utils/censorBadWords';
import htmlSubstring from '../../../utils/htmlSubstring';
import injectEllipsis from '../../../utils/injectEllipsis';

import UserCard from '../UserCard/UserCard.component';
import TagBadge from '../TagBadge/TagBadge.component';

const PostItem = ({
  post: {
    id,
    title,
    body,
    username,
    gravatar,
    user_id,
    answer_count,
    views,
    created_at,
    tags,
  },
}) => {
  const hasAnswers = answer_count > 0;

  return (
    <article className='posts'>
      <div className='stats-container'>
        <div className={`stat-block ${hasAnswers ? 'stat-block--answered' : ''}`}>
          <span className='stat-value'>{answer_count}</span>
          <span className='stat-label'>
            {answer_count === 1 ? 'answer' : 'answers'}
          </span>
        </div>
        <div className='stat-block'>
          <span className='stat-value'>{views}</span>
          <span className='stat-label'>{views === 1 ? 'view' : 'views'}</span>
        </div>
      </div>

      <div className='summary'>
        <h3 className='summary-title'>
          <Link to={`/questions/${id}`}>{censorBadWords(title)}</Link>
        </h3>
        <div
          className='brief'
          dangerouslySetInnerHTML={{
            __html: injectEllipsis(censorBadWords(htmlSubstring(body, 200))),
          }}
        />
        <div className='summary-footer'>
          <div className='profile-tags'>
            {tags.map((tag, index) => (
              <TagBadge key={index} tag_name={tag.tagname} size='s-tag' />
            ))}
          </div>
          <UserCard
            created_at={created_at}
            user_id={user_id}
            gravatar={gravatar}
            username={username}
            float='right'
            backgroundColor='transparent'
          />
        </div>
      </div>
    </article>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null)(PostItem);
