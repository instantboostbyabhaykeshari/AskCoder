'use client';

import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAnswers} from '../../../redux/answers/answers.actions';
import handleSorting from '../../../utils/handleSorting';

import AnswerItem from './AnswerItem/AnswerItem.component';
import Spinner from '../../../components/molecules/Spinner/Spinner.component';
import AnswerForm from './AnswerForm/AnswerForm.component';
import ButtonGroup from '../../../components/molecules/ButtonGroup/ButtonGroup.component';

const AnswerSection = ({getAnswers, answer, post: {post}}) => {
  useEffect(() => {
    getAnswers(post.id);
    // eslint-disable-next-line
  }, [getAnswers, post.id]);

  const [sortType, setSortType] = useState('Newest');

  const sortedAnswers = answer.answers
    ? [...answer.answers].sort(handleSorting(sortType))
    : [];

  return (
    <Fragment>
      <div className='answer'>
        <div className='answer-header'>
          <div className='answer-sub-header'>
            <div className='answer-headline'>
              <h2>
                {sortedAnswers.length}{' '}
                {sortedAnswers.length === 1 ? 'Answer' : 'Answers'}
              </h2>
            </div>
            {sortedAnswers.length > 1 && (
              <ButtonGroup
                buttons={['Newest', 'Oldest']}
                selected={sortType}
                setSelected={setSortType}
              />
            )}
          </div>
        </div>

        {answer.loading === null ? (
          <Spinner width='25px' height='25px' />
        ) : sortedAnswers.length === 0 ? (
          <div className='ac-empty-state answer-empty'>
            <div className='ac-empty-state__icon'>✍️</div>
            <h3 className='ac-empty-state__title'>No answers yet</h3>
            <p className='ac-empty-state__text'>
              Know an answer? Share your knowledge below.
            </p>
          </div>
        ) : (
          sortedAnswers.map((ans) => (
            <div key={ans.id} className='answers'>
              <AnswerItem answer={ans} />
            </div>
          ))
        )}

        <div className='add-answer'>
          <h3 className='answer-form-title'>Your Answer</h3>
          <AnswerForm />
        </div>
      </div>
    </Fragment>
  );
};

AnswerSection.propTypes = {
  getAnswers: PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  answer: state.answer,
  post: state.post,
});

export default connect(mapStateToProps, {getAnswers})(AnswerSection);
