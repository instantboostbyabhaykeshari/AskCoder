'use client';

import React, {Fragment, useState, useRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addAnswer} from '../../../../redux/answers/answers.actions';
import {setAlert} from '../../../../redux/alert/alert.actions';

import LinkButton from '../../../../components/molecules/LinkButton/LinkButton.component';
import MarkdownEditor from '../../../../components/organisms/MarkdownEditor/MarkdownEditor.component';

const getPlainTextLength = (html) =>
  (html || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim().length;

const AnswerForm = ({addAnswer, setAlert, auth, post: {post}}) => {
  const [formData, setFormData] = useState({
    text: '',
  });

  const markdownEditorRef = useRef(null);

  const {text} = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (getPlainTextLength(text) < 1) {
      setAlert('Please write an answer before submitting.', 'warning');
      return;
    }

    const result = await addAnswer(post.id, {text});

    if (!result?.success) {
      return;
    }

    setFormData({
      text: '',
    });
    markdownEditorRef.current.cleanEditorState();
  };

  const updateConvertedContent = (htmlConvertedContent) => {
    setFormData((prev) => ({...prev, text: htmlConvertedContent}));
  };

  return (
    <Fragment>
      {!auth.loading && auth.isAuthenticated ? (
        <Fragment>
          <form className='answer-form' onSubmit={(e) => handleSubmit(e)}>
            <div className='answer-grid'>
              <label className=' fc-black-800'>Your Answer</label>
              <div className='s-textarea rich-text-editor-container'>
                <MarkdownEditor
                  ref={markdownEditorRef}
                  onChange={updateConvertedContent}
                />
              </div>
              <button className='s-btn s-btn__primary'>Post Your Answer</button>
            </div>
          </form>
        </Fragment>
      ) : (
        <Fragment>
          <LinkButton
            text={'You need to login to add an answer'}
            link={'/login'}
            type={'s-btn__outlined'}
            marginTop={'12px'}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

AnswerForm.propTypes = {
  auth: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {addAnswer, setAlert})(AnswerForm);
