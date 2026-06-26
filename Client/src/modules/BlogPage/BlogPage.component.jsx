'use client';

import React, { useMemo, useState, useEffect } from 'react';
import BaseButton from '../../components/molecules/BaseButton/BaseButton.component';
import EmptyState from '../../components/molecules/EmptyState/EmptyState.component';
import { BLOG_CATEGORIES, blogPosts } from '../../data/blogPosts';
import BlogCard from './BlogCard.component';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return blogPosts;
    }

    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  const categoriesToShow = (isMobile && !isExpanded)
    ? [...BLOG_CATEGORIES.slice(0, 3), 'More...']
    : BLOG_CATEGORIES;

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
        <div className="blog-filters-container">
          {categoriesToShow.map((category) => (
            <BaseButton
              key={category}
              text={category}
              selected={selectedCategory}
              onClick={() => {
                if (category === 'More...') {
                  setIsExpanded(true);
                } else {
                  setSelectedCategory(category);
                }
              }}
            />
          ))}
        </div>
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
