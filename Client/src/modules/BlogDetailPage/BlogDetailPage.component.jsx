'use client';

import React from 'react';
import { Link, useParams } from '../../next/nextRouterAdapter.js';
import NotFound from '../NotFound/NotFound.component';
import BlogCard from '../BlogPage/BlogCard.component';
import {
  formatBlogDate,
  getBlogPostBySlug,
  getRelatedPosts,
} from '../../data/blogPosts';

const BlogDetailPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <div id="mainbar" className="blog-detail fc-black-800">
      <Link to="/blog" className="blog-detail__back">
        <span className="material-icons" aria-hidden="true">
          arrow_back
        </span>
        Back to Blog
      </Link>

      <article className="blog-detail__article s-card">
        <header className="blog-detail__header">
          <span className="blog-detail__category">{post.category}</span>
          <h1 className="blog-detail__title">{post.title}</h1>
          <div className="blog-detail__meta">
            <span>By {post.author}</span>
            <span>{formatBlogDate(post.date)}</span>
            <span>{post.readTime}</span>
          </div>
          <div className="blog-detail__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-detail__tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="blog-detail__content">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="blog-detail__related">
          <h2 className="blog-detail__related-title">Related posts</h2>
          <div className="blog-detail__related-grid">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetailPage;
