'use client';

import React, {Fragment} from 'react';
import { Book } from "@deemlol/next-icons"


const AskWidget = () => {
  return (
    <Fragment>
      <div className='widget'>
        <div className='s-sidebarwidget--header'>
          Step 1: Draft your question
        </div>
        <div className='widget-content fc-black-800'>
          <div className='summary'>
            <p className='sec1'>
              The community is here to help you with specific coding, algorithm,
              or language problems.
            </p>
            <p className='sec2'>Avoid asking opinion-based questions.</p>
          </div>
          <ol className='step-section'>
            <li className='step'>
              <button>
                <div className='step-cell'>
                  <div>
                    <Book />
                  </div>
                  <span>Summarize the problem</span>
                </div>
              </button>
              <div className='inst'>
                <div className='inst-content'>
                  <ul>
                    <li>
                      <p>Include details about your goal</p>
                    </li>
                    <li>
                      <p>Describe expected and actual results</p>
                    </li>
                    <li>
                      <p className='except'>Include any error messages</p>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className='step'>
              <button>
                <div className='step-cell'>
                  <div>
                    <Book />
                  </div>
                  <span>Summarize the problem</span>
                </div>
              </button>
              <div className='inst'>
                <div className='inst-content'>
                  <p className='step2'>
                    Show what you’ve tried and tell us what you found (on this
                    site or elsewhere) and why it didn’t meet your needs. You
                    can get better answers when you provide research.
                  </p>
                </div>
              </div>
            </li>
            <li
              style={{
                borderBottomRightRadius: '3px',
                borderBottomLeftRadius: '3px',
              }}
              className='step except-step'
            >
              <button>
                <div className='step-cell'>
                  <div>
                    <Book />
                  </div>
                  <span>Summarize the problem</span>
                </div>
              </button>
              <div className='inst'>
                <div className='inst-content'>
                  <p className='step3'>
                    When appropriate, share the minimum amount of code others
                    need to reproduce your problem (also called a minimum,
                    reproducible example)
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </Fragment>
  );
};

export default AskWidget;
