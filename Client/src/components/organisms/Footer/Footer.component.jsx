'use client';

import React from 'react';
import { Link } from '../../../next/nextRouterAdapter.js';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

const Footer = () => (
  <footer className='footer'>
    <div className='footer__inner'>
      <nav className='footer__nav' aria-label='Footer'>
        {footerLinks.map(({ label, href }) => (
          <Link key={label} to={href} className='footer__link'>
            {label}
          </Link>
        ))}
      </nav>
      <p className='footer__copyright'>
        Copyright &copy; 2026 Abhay. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
