'use client';

import React from 'react';

import SideBarItem from './SideBarItem.component';
import { mainNavItems, infoNavItems } from './SideBarData';

const SideBarSection = ({ title, items }) => (
  <div className='public-tabs'>
    {title && <p className='title fc-light'>{title}</p>}
    {items.map(({ link, icon, text }) => (
      <SideBarItem key={link} link={link} icon={icon} text={text} />
    ))}
  </div>
);

const SideBar = () => (
  <div className='side-bar-container'>
    <div className='side-bar-tabs'>
      <SideBarItem isHome link='/' text='Home' />
      <SideBarSection title='Public' items={mainNavItems} />
      <SideBarSection title='Pages' items={infoNavItems} />
    </div>
  </div>
);

export default SideBar;
