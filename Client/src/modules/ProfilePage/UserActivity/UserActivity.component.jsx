'use client';

import React from "react";
import PropTypes from 'prop-types';

import TagBadge from "../../../components/molecules/TagBadge/TagBadge.component";


const UserActivity = ({topTags}) => (
  <div className='grid-cell2'>
    <div className='top-tags'>
      <h3 className='fw-bold fc-dark bc-black-3'>Top Tags</h3>
      <div className='top-tags-sec'>
        {topTags.length === 0 ? (
          <p className='empty-tags fc-light'>
            No tags from this user yet.
          </p>
        ) : (
          topTags.slice(0, 4).map((tag, index) => (
            <div className='top-tags-cells' key={tag.id || tag.tagname}>
              <div className='top-cell'>
                <div className='tag-cell bg-black-025'>
                  <TagBadge
                    tag_name={tag.tagname}
                    size={`s-tag ${index === 0 ? 's-tag__lg' : 's-tag__md'}`}
                    float={'left'}
                  />
                  <div className='score'>
                    <div className='score-txt'>
                      <div className='score-tab'>
                        <span className='txt fc-light'>Posts</span>
                        <span className='number fc-black-800'>{tag.posts_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
)

UserActivity.propTypes = {
  topTags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    tagname: PropTypes.string.isRequired,
    posts_count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  })).isRequired,
};

export default UserActivity;
