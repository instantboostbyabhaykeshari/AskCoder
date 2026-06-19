'use client';

import React from 'react';
import {Link} from '../../../next/nextRouterAdapter.js';

import {ReactComponent as StackExchangeLogo} from '../../../assets/StackExchange.svg';
import AskCoderLogo from '../../../components/atoms/AskCoderLogo/AskCoderLogo.component';

const ExternalUserDetails = () => (
  <div className='grid-cell1'>
    <div className='cell-layout'>
      <div className='community'>
        <h3 className='bc-black-3'>
          <span className='icon'>
            <StackExchangeLogo/>
          </span>
          <span className='text fw-bold fc-dark bc-black-3'>
            Communities
          </span>
        </h3>
        <ul>
          <li className='item'>
            <Link to='/'>
              <span>
                <AskCoderLogo width={54} className='logo' />
              </span>
              <span className='fc-blue-600 fs-body2'>
                AskCoder
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='user-posts'>
        <h3 className='fw-bold fc-dark bc-black-3'>
          Top network posts
        </h3>
        <p className='fc-light'>
          We respect a laser-like focus on one topic.
        </p>
      </div>
    </div>
  </div>
);

export default ExternalUserDetails;
