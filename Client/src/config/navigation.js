'use client';
import { ReactComponent as GlobalIcon } from '../assets/Globe.svg';;

const getUserProfileLink = (userId) => (userId ? `/users/${userId}` : '/login');

export const getMainNavItems = (userId) => [
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
    link: getUserProfileLink(userId),
    text: 'Profile',
  },
  {
    link: '/blog',
    text: 'Blog',
  },
];

export const mainNavItems = getMainNavItems();

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
