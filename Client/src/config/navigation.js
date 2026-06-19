'use client';

import { ReactComponent as GlobalIcon } from '../assets/Globe.svg';

export const mainNavItems = [
  {
    link: '/questions',
    icon: <GlobalIcon className='icon' />,
    text: 'Questions',
  },
  {
    link: '/tags',
    text: 'Tags',
  },
  {
    link: '/users',
    text: 'Users',
  },
  {
    link: '/blog',
    text: 'Blog',
  },
];

export const infoNavItems = [
  {
    link: '/about',
    text: 'About',
  },
  {
    link: '/contact',
    text: 'Contact',
  },
];

// Backward-compatible export for existing imports.
export const SideBarData = mainNavItems;
