'use client';

import React, {Fragment} from 'react';
import {Link} from '../../../next/nextRouterAdapter.js';

const LinkButton = ({text, link, type, handleClick, marginTop}) => {
  return (
    <Fragment>
      <Link onClick={handleClick} to={link}>
        <button className={`s-btn ${type}`} style={{marginTop}}>
          {text}
        </button>
      </Link>
    </Fragment>
  );
};

export default LinkButton;
