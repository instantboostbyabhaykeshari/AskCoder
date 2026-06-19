'use client';

import React, {Fragment} from 'react';
import {Link} from '../../../next/nextRouterAdapter.js';

import {ReactComponent as QuoteLogo} from '../../../assets/Quote.svg';
import {ReactComponent as VoteLogo} from '../../../assets/Vote.svg';
import {ReactComponent as TagsLogo} from '../../../assets/Tags.svg';
import {ReactComponent as TrophyLogo} from '../../../assets/Trophy.svg';


const Caption = () => {
  return (
    <Fragment>
      <div className='caption fc-black-600'>
        <h3>Join the AskCoder community</h3>
        <div className='caption-item'>
          <div className='grid-icon'>
            <QuoteLogo/>
          </div>
          <div className='grid-cell'>Get unstuck - ask a question</div>
        </div>
        <div className='caption-item'>
          <div className='grid-icon'>
            <VoteLogo/>
          </div>
          <div className='grid--cell'>
            Unlock new privileges like voting and commenting
          </div>
        </div>
        <div className='caption-item'>
          <div className='grid-icon'>
            <TagsLogo/>
          </div>
          <div className='grid-cell'>
            Save your favorite tags, filters, and jobs
          </div>
        </div>
        <div className='caption-item'>
          <div className='grid-icon'>
            <TrophyLogo/>
          </div>
          <div className='grid-cell'>Earn reputation and badges</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Caption;
