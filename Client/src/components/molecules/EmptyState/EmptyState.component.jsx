'use client';

import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from '../LinkButton/LinkButton.component';

const EmptyState = ({icon, title, message, actionText, actionLink}) => (
  <div className='ac-empty-state'>
    {icon && <div className='ac-empty-state__icon'>{icon}</div>}
    <h3 className='ac-empty-state__title'>{title}</h3>
    {message && <p className='ac-empty-state__text'>{message}</p>}
    {actionText && actionLink && (
      <LinkButton text={actionText} link={actionLink} type='s-btn__primary' />
    )}
  </div>
);

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  actionText: PropTypes.string,
  actionLink: PropTypes.string,
};

export default EmptyState;
