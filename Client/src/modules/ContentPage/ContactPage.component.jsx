'use client';

import React from 'react';
import ContentPage from './ContentPage.component';

const GITHUB_URL = 'https://github.com/instantboostbyabhaykeshari/AskCoder';
const LINKEDIN_URL = 'https://www.linkedin.com/in/abhaykeshari/';
const EMAIL = 'abhaykeshari591@gmail.com';

const ContactPage = () => (
  <ContentPage title="Contact" subtitle="Connect with Abhay">
    <p>
      Have feedback about AskCoder, found a bug, or want to connect about the
      project? Reach out through any of the links below.
    </p>

    <nav className="content-page__contact-links" aria-label="Contact links">
      <a
        className="content-page__contact-link"
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="material-icons" aria-hidden="true">
          code
        </span>
        GitHub — instantboostbyabhaykeshari/AskCoder
      </a>

      <a
        className="content-page__contact-link"
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="material-icons" aria-hidden="true">
          work
        </span>
        LinkedIn — abhaykeshari
      </a>

      <a className="content-page__contact-link" href={`mailto:${EMAIL}`}>
        <span className="material-icons" aria-hidden="true">
          mail
        </span>
        Email — {EMAIL}
      </a>
    </nav>
  </ContentPage>
);

export default ContactPage;
