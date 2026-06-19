'use client';

import React, { useMemo, useState } from 'react';
import ButtonGroup from '../../components/molecules/ButtonGroup/ButtonGroup.component';
import EmptyState from '../../components/molecules/EmptyState/EmptyState.component';
import { BLOG_CATEGORIES, blogPosts } from '../../data/blogPosts';
import BlogCard from './BlogCard.component';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return blogPosts;
    }

    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div id="mainbar" className="blog-page fc-black-800">
      <header className="blog-page__header">
        <div>
          <h1 className="blog-page__title">Blog</h1>
          <p className="blog-page__subtitle">
            AI trends, programming tips, web development, and practical advice
            for building better software.
          </p>
        </div>
      </header>

      <div className="blog-page__filters">
        <ButtonGroup
          buttons={BLOG_CATEGORIES}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <EmptyState
          title="No posts found"
          message={`There are no blog posts in the "${selectedCategory}" category yet.`}
          actionText="View all posts"
          actionLink="/blog"
        />
      ) : (
        <div className="blog-page__grid">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
