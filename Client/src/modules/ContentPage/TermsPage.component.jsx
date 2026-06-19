'use client';

import React from 'react';
import { Link } from '../../next/nextRouterAdapter.js';
import ContentPage from './ContentPage.component';

const TermsPage = () => (
  <ContentPage
    title="Terms and Conditions"
    subtitle="Please read these terms before using AskCoder."
  >
    <h2>Acceptance of terms</h2>
    <p>
      By accessing or using AskCoder, you agree to these Terms and Conditions.
      If you do not agree, please do not use the platform.
    </p>

    <h2>Use of the platform</h2>
    <p>
      AskCoder is a developer Q&A platform for educational and community
      purposes. You may browse content, ask questions, post answers, and
      participate in discussions in a respectful and lawful manner.
    </p>

    <h2>User accounts</h2>
    <p>
      You are responsible for maintaining the confidentiality of your account
      credentials and for all activity that occurs under your account. You
      agree to provide accurate registration information and to keep it up to
      date.
    </p>

    <h2>User-generated content</h2>
    <p>
      You retain responsibility for the questions, answers, comments, and other
      content you submit. By posting content, you grant AskCoder a non-exclusive
      license to display and store that content as needed to operate the
      service.
    </p>

    <h2>Prohibited activities</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Post unlawful, abusive, harassing, or misleading content</li>
      <li>Impersonate another person or misrepresent your affiliation</li>
      <li>Attempt to disrupt, damage, or gain unauthorized access to the platform</li>
      <li>Use automated tools to scrape or overload the service without permission</li>
      <li>Post spam, malware links, or content that violates others&apos; rights</li>
    </ul>

    <h2>Intellectual property</h2>
    <p>
      AskCoder&apos;s branding, layout, and original project materials are owned
      by the project author unless otherwise stated. Do not copy or redistribute
      project assets for commercial use without permission.
    </p>

    <h2>No guarantee of answers</h2>
    <p>
      AskCoder does not guarantee that questions will receive answers, that
      answers will be correct, or that content will remain available
      indefinitely. Use information at your own discretion.
    </p>

    <h2>Limitation of liability</h2>
    <p>
      AskCoder is provided on an &quot;as is&quot; basis. To the fullest extent
      permitted by law, the platform and its operators are not liable for any
      damages arising from your use of the service or reliance on user-generated
      content.
    </p>

    <h2>Changes to terms</h2>
    <p>
      These terms may be updated from time to time. Continued use of AskCoder
      after changes are posted constitutes acceptance of the revised terms.
    </p>

    <h2>Contact information</h2>
    <p>
      For questions about these terms, visit the{' '}
      <Link to="/contact">Contact page</Link>.
    </p>
  </ContentPage>
);

export default TermsPage;
