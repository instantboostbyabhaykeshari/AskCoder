'use client';

import React from 'react';
import PropTypes from 'prop-types';

const ContentPage = ({ title, subtitle, children }) => (
  <div id="mainbar" className="content-page fc-black-800">
    <header className="content-page__header">
      <h1 className="content-page__title">{title}</h1>
      {subtitle && <p className="content-page__subtitle">{subtitle}</p>}
    </header>
    <div className="content-page__body s-card">{children}</div>
  </div>
);

ContentPage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ContentPage;
