'use client';

import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "../../../redux/posts/posts.actions";
import { setAlert } from "../../../redux/alert/alert.actions";
import MarkdownEditor from "../../../components/organisms/MarkdownEditor/MarkdownEditor.component";
import { badWordsFilter } from "../../../utils/censorBadWords";


const AskForm = ({ addPost, setAlert }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tagname: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setFormErrors({});
  }, [formData]);

  const markdownEditorRef = useRef(null);

  const { title, body, tagname } = formData;

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const getPlainTextLength = (html) =>
    (html || "")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim().length;

  const validateFormData = () => {
    const errors = {};

    if (formData.title.trim().length < 15) {
      errors.title = "Enter a title with minimum 15 characters";
    }

    if (getPlainTextLength(formData.body) < 30) {
      errors.body = "Enter a body with minimum 30 characters";
    }

    if (!formData.tagname.trim()) {
      errors.tagname = "At least one tag is required";
    }

    const tags = formData.tagname
      .split(",")
      .filter(Boolean)
      .map((tag) => tag.trim());

    tags.forEach((tag) => {
      if (tag.length > 25) {
        errors.tagname = "A tag name can't be longer than 25 characters.";
      } else if (/[^a-zA-Z]/.test(tag)) {
        errors.tagname = `${tag} tag must contain English alphabets only (no spaces).`;
      }
    });

    if (badWordsFilter.isProfane(formData.tagname)) {
      errors.tagname = "Inappropriate words are not allowed.";
    }

    setFormErrors(errors);

    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFormData();

    if (Object.keys(errors).length > 0) {
      setAlert(Object.values(errors)[0], "warning");
      return;
    }

    const result = await addPost({ title, body, tagname });

    if (!result?.success) {
      return;
    }

    setFormData({
      title: "",
      body: "",
      tagname: "",
    });
    markdownEditorRef.current.cleanEditorState();
  };

  const updateConvertedContent = (htmlConvertedContent) => {
    setFormData((prev) => ({ ...prev, body: htmlConvertedContent }));
  };

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="question-form p16 s-card">
          <div className="question-layout">
            <div className="title-grid">
              <label className="form-label s-label">
                Title
                <p className="title-desc fw-normal fs-caption">
                  Be specific and imagine you’re asking a question to another
                  person
                </p>
              </label>
              <input
                className="title-input s-input"
                type="text"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                id="title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
              <p className="form-error-message">{formErrors.title}</p>
            </div>
            <div className="body-grid">
              <label className="form-label s-label fc-black-800">
                Body
                <p className="body-desc fw-normal fs-caption fc-black-800">
                  Include all the information someone would need to answer your
                  question
                </p>
              </label>
              <div className="s-textarea rich-text-editor-container">
                <MarkdownEditor
                  ref={markdownEditorRef}
                  onChange={updateConvertedContent}
                />
              </div>
              <p className="form-error-message">{formErrors.body}</p>
            </div>
            <div className="tag-grid">
              <label className="form-label s-label">
                Tag Name
                <p className="tag-desc fw-normal fs-caption">
                  Add up to 5 tags to describe what your question is about
                </p>
              </label>
              <input
                className="tag-input s-input"
                type="text"
                name="tagname"
                value={tagname}
                onChange={(e) => onChange(e)}
                id="tagname"
                placeholder="e.g. (ajax, django, string)"
              />
              <p className="form-error-message">{formErrors.tagname}</p>
            </div>
          </div>
        </div>
        <div className="post-button mt32">
          <button
            className="s-btn s-btn__primary"
            id="submit-button"
            name="submit-button"
          >
            Post your question
          </button>
        </div>
      </form>
    </Fragment>
  );
};

AskForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addPost, setAlert })(AskForm);
