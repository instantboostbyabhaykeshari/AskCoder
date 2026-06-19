'use client';

import React from 'react';
import ContentPage from './ContentPage.component';

const AboutPage = () => (
  <ContentPage
    title="About AskCoder"
    subtitle="A developer Q&A platform for learning, sharing knowledge, and solving coding problems."
  >
    <h2>What is AskCoder?</h2>
    <p>
      AskCoder is a developer Q&A platform inspired by Stack Overflow. It is
      built for programmers who want to learn, share knowledge, and solve real
      coding problems together.
    </p>
    <p>
      Whether you are stuck on a bug, exploring a new framework, or helping
      others grow, AskCoder gives you a focused space to ask clear questions
      and find useful answers.
    </p>

    <h2>What you can do</h2>
    <ul>
      <li>Ask programming questions with titles, descriptions, and tags</li>
      <li>Answer questions posted by other developers</li>
      <li>Comment on questions to ask for clarification or add context</li>
      <li>Explore tags to browse topics that matter to you</li>
      <li>Register and log in to participate in the community</li>
      <li>View user profiles, activity, and posts across the platform</li>
    </ul>

    <h2>Frontend</h2>
    <ul>
      <li>React / Next.js</li>
      <li>Redux</li>
      <li>JavaScript</li>
      <li>CSS / SCSS</li>
      <li>Axios for API calls</li>
    </ul>

    <h2>Backend</h2>
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
      <li>MySQL</li>
      <li>Sequelize ORM</li>
      <li>JWT authentication</li>
      <li>bcrypt password hashing</li>
    </ul>

    <h2>API</h2>
    <p>
      The frontend communicates with the backend through REST APIs, including:
    </p>
    <ul>
      <li><code>/api/auth</code></li>
      <li><code>/api/users</code></li>
      <li><code>/api/posts</code></li>
      <li><code>/api/tags</code></li>
      <li><code>/api/posts/answers</code></li>
      <li><code>/api/posts/comments</code></li>
    </ul>

    <h2>Database</h2>
    <p>Main database tables include:</p>
    <ul>
      <li><code>users</code></li>
      <li><code>posts</code></li>
      <li><code>tags</code></li>
      <li><code>posttag</code></li>
      <li><code>answers</code></li>
      <li><code>comments</code></li>
    </ul>
  </ContentPage>
);

export default AboutPage;
