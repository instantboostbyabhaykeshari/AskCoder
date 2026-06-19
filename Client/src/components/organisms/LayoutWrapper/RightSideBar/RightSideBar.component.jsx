'use client';

import React, {Fragment} from 'react';

import SideBarWidget from './SideBarWidget/SideBarWidget.component';
import TagsWidget from './TagsWidget/TagsWidget.component';


const RightSideBar = () => {
  return (
    <Fragment>
      <div id='sidebar' className='side-bar'>
        <SideBarWidget />
        <TagsWidget />
      </div>
    </Fragment>
  );
};

export default RightSideBar;
