'use client';

import React, { useState } from 'react';
import { NavLink } from '../../../next/nextRouterAdapter.js';

import AskCoderLogo from '../../atoms/AskCoderLogo/AskCoderLogo.component';
import { mainNavItems, infoNavItems } from '../../../config/navigation';

const SidebarUI = ({ isOpen, ...rest }) => {
  const classes = ['Sidebar', isOpen ? 'is-open' : ''];
  return <div aria-hidden={!isOpen} className={classes.join(' ')} {...rest} />;
};

const SidebarOverlay = (props) => <div className='SidebarOverlay' {...props} />;
SidebarOverlay.displayName = 'SidebarOverlay';
SidebarUI.Overlay = SidebarOverlay;

const SidebarContent = ({ width = '20rem', isRight = false, ...rest }) => {
  const classes = ['SidebarContent', isRight ? 'is-right' : ''];
  const style = {
    width,
    height: '100%',
    top: 0,
    right: isRight ? `-${width}` : 'auto',
    left: !isRight ? `-${width}` : 'auto',
  };
  return <div className={classes.join(' ')} style={style} {...rest} />;
};
SidebarContent.displayName = 'SidebarContent';
SidebarUI.Content = SidebarContent;

const MobileNavSection = ({ title, items, onNavigate }) => (
  <div className='public-tabs'>
    {title && <p className='title fc-light'>{title}</p>}
    {items.map(({ link, icon, text }) => (
      <NavLink
        key={link}
        activeClassName='active'
        className={icon ? 'icon-link' : 'link'}
        to={link}
        onClick={onNavigate}
      >
        <p>
          {icon}
          {text}
        </p>
      </NavLink>
    ))}
  </div>
);

const MobileSideBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = (isOp = true) => setIsOpen(isOp);
  const closeSidebar = () => setIsOpen(false);

  const { hasOverlay, isRight } = props;

  return (
    <SidebarUI isOpen={isOpen}>
      <button
        type='button'
        className='ham-button'
        onClick={() => openSidebar(true)}
        aria-label='Open navigation menu'
      >
        <span className='material-icons ham'>menu</span>
      </button>

      <SidebarUI.Content isRight={isRight}>
        <div className='content-logo'>
          <AskCoderLogo width={160} className='sidebar-logo' />
        </div>
        <div className='content-inner'>
          <div className='side-bar-tabs'>
            <NavLink
              exact
              activeClassName='active'
              className='home-link'
              to='/'
              onClick={closeSidebar}
            >
              <p>Home</p>
            </NavLink>

            <MobileNavSection
              title='Public'
              items={mainNavItems}
              onNavigate={closeSidebar}
            />
            <MobileNavSection
              title='Pages'
              items={infoNavItems}
              onNavigate={closeSidebar}
            />
          </div>
        </div>
      </SidebarUI.Content>

      {hasOverlay ? <SidebarUI.Overlay onClick={closeSidebar} /> : false}
    </SidebarUI>
  );
};

export default MobileSideBar;
