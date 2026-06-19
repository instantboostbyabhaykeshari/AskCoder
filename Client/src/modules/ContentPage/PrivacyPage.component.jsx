'use client';

import React from 'react';
import { Link } from '../../next/nextRouterAdapter.js';
import ContentPage from './ContentPage.component';

const PrivacyPage = () => (
  <ContentPage
    title="Privacy Policy"
    subtitle="How AskCoder handles information in this project/demo application."
  >
    <p>
      AskCoder is a learning and portfolio project. Please do not submit
      sensitive personal information such as government IDs, financial details,
      passwords for third-party services, or private health data.
    </p>

    <h2>Information we collect</h2>
    <p>
      When you use AskCoder, limited information may be collected to provide core
      functionality such as authentication, posting content, and displaying user
      profiles.
    </p>

    <h2>Account information</h2>
    <p>
      When you register, we may store details such as your username, email
      address (if provided), and a hashed password. Profile information you
      choose to share may be visible to other users.
    </p>

    <h2>Usage data</h2>
    <p>
      Basic usage data may be generated when you interact with the app, such as
      questions asked, answers posted, comments written, and pages visited. This
      helps operate community features like user activity and post listings.
    </p>

    <h2>Cookies and local storage</h2>
    <p>
      AskCoder may use browser local storage or similar client-side mechanisms
      to keep you signed in and remember session-related preferences. These
      tools are used to support app functionality rather than for advertising
      tracking.
    </p>

    <h2>How information is used</h2>
    <p>Information is used to:</p>
    <ul>
      <li>Create and manage user accounts</li>
      <li>Display posts, answers, comments, tags, and profiles</li>
      <li>Authenticate requests to protected API endpoints</li>
      <li>Maintain platform security and basic operation</li>
    </ul>

    <h2>Data security</h2>
    <p>
      Reasonable measures are taken to protect stored data, including password
      hashing and authenticated API access. No system is completely secure, so
      use caution when sharing information online.
    </p>

    <h2>Third-party services</h2>
    <p>
      AskCoder may rely on third-party hosting, fonts, or deployment services
      to run the application. Those providers may process technical data such
      as IP addresses or request logs according to their own policies.
    </p>

    <h2>User rights</h2>
    <p>
      You may request correction or removal of account-related information where
      applicable. Because this is a demo project, data retention and deletion
      options may be limited.
    </p>

    <h2>Changes to this policy</h2>
    <p>
      This Privacy Policy may be updated as the project evolves. Material
      changes will be reflected on this page.
    </p>

    <h2>Contact information</h2>
    <p>
      For privacy-related questions, visit the{' '}
      <Link to="/contact">Contact page</Link>.
    </p>
  </ContentPage>
);

export default PrivacyPage;
