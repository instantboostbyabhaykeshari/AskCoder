'use client';

import React, {useEffect, Fragment, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTags} from '../../redux/tags/tags.actions';
import handleSorting from '../../utils/handleSorting';

import TagPanel from './TagPanel/TagPanel.component';
import Spinner from '../../components/molecules/Spinner/Spinner.component';
import SearchBox from '../../components/molecules/SearchBox/SearchBox.component';
import ButtonGroup from '../../components/molecules/ButtonGroup/ButtonGroup.component';
import EmptyState from '../../components/molecules/EmptyState/EmptyState.component';
import Pagination from '../../components/organisms/Pagination/Pagination.component';

const itemsPerPage = 12;

const AllTagsPage = ({getTags, tag: {tags, loading, error}}) => {
  useEffect(() => {
    getTags();
  }, [getTags]);

  const [page, setPage] = useState(1);
  const [fetchSearch, setSearch] = useState('');
  const [sortType, setSortType] = useState('Popular');

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePaginationChange = (e, value) => setPage(value);

  const filteredTags = tags
    ? tags.filter((tag) =>
        tag.tagname.toLowerCase().includes(fetchSearch.toLowerCase())
      )
    : [];

  if (loading || tags === null) {
    return <Spinner type='page' width='75px' height='200px' />;
  }

  if (error?.msg) {
    return (
      <div id='mainbar' className='tags-page'>
        <div className='ac-error-state'>
          <h3 className='ac-error-state__title'>Unable to load tags</h3>
          <p className='ac-empty-state__text'>{error.msg}</p>
          <button className='s-btn s-btn__primary' onClick={() => getTags()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div id='mainbar' className='tags-page fc-black-800'>
        <h1 className='headline'>Tags</h1>
        <p className='fs-body page-description'>
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Using the right tags makes it easier for others to
          find and answer your question.
        </p>
        <div className='headline-count'>
          <span>{new Intl.NumberFormat('en-IN').format(filteredTags.length)} tags</span>
        </div>
        <div className='tags-box'>
          <SearchBox
            placeholder='Filter by tag name'
            handleChange={handleChange}
            width='240px'
          />
          <ButtonGroup
            buttons={['Popular', 'Name', 'New']}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>
        <div className='user-browser'>
          {filteredTags.length === 0 ? (
            <EmptyState
              icon='🏷️'
              title={fetchSearch ? 'No matching tags' : 'No tags yet'}
              message={
                fetchSearch
                  ? 'Try a different filter or clear your search.'
                  : 'Tags will appear here once questions are tagged.'
              }
              actionText='Ask Question'
              actionLink='/add/question'
            />
          ) : (
            <div className='grid-layout'>
              {filteredTags
                .sort(handleSorting(sortType))
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((tag) => (
                  <TagPanel key={tag.id || tag.tagname} tag={tag} />
                ))}
            </div>
          )}
        </div>
        {filteredTags.length > itemsPerPage && (
          <Pagination
            page={page}
            itemList={filteredTags}
            itemsPerPage={itemsPerPage}
            handlePaginationChange={handlePaginationChange}
          />
        )}
      </div>
    </Fragment>
  );
};

AllTagsPage.propTypes = {
  getTags: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tag: state.tag,
});

export default connect(mapStateToProps, {getTags})(AllTagsPage);
