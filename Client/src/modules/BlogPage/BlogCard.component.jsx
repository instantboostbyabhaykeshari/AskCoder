'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../next/nextRouterAdapter.js';
import { formatBlogDate } from '../../data/blogPosts';

const BlogCard = ({ post }) => (
  <article className="blog-card s-card">
    <div className="blog-card__meta">
      <span className="blog-card__category">{post.category}</span>
      <span className="blog-card__date">{formatBlogDate(post.date)}</span>
    </div>

    <h2 className="blog-card__title">
      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
    </h2>

    <p className="blog-card__excerpt">{post.excerpt}</p>

    <div className="blog-card__footer">
      <div className="blog-card__author-row">
        <span className="blog-card__author">By {post.author}</span>
        <span className="blog-card__read-time">{post.readTime}</span>
      </div>

      <div className="blog-card__tags">
        {post.tags.map((tag) => (
          <span key={tag} className="blog-card__tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </article>
);

BlogCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readTime: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default BlogCard;
