'use client';

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import SideBarItem from './SideBarItem.component';
import { getMainNavItems, infoNavItems } from '../../../../config/navigation';

const SideBarSection = ({ title, items }) => (
  <div className='public-tabs'>
    {title && <p className='title fc-light'>{title}</p>}
    {items.map(({ link, icon, text }) => (
      <SideBarItem key={link} link={link} icon={icon} text={text} />
    ))}
  </div>
);

const SideBar = ({auth}) => {
  const mainNavItems = getMainNavItems(auth.user?.id);

  return (
    <div className='side-bar-container'>
      <div className='side-bar-tabs'>
        <SideBarItem isHome link='/' text='Home' />
        <SideBarSection title='Public' items={mainNavItems} />
        <SideBarSection title='Pages' items={infoNavItems} />
      </div>
    </div>
  );
};

SideBar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SideBar);
