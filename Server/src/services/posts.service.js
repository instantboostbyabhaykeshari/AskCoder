const db = require('../config/db.config');
const { responseHandler, investApi } = require('../helpers');
const utils = require('../utils');
const {
  PostsRepository,
  AnswersRepository,
  CommentsRepository,
  PostTagRepository,
  TagsRepository,
} = require('./data');

exports.create = async (newPost, result) => {
  let transaction;
  try {
    transaction = await db.transaction();

    const tags = newPost.tagName.split(',').map((item) => item.trim());

    if (tags.length > 5) {
      return result(responseHandler(false, 400, 'Only Tags Upto 5 Are Allowed', null), null);
    }

    const post = await PostsRepository.create(newPost, result);

    const mapAllTags = [];
    const mapAllTagsWithoutDesc = [];
    let mapNewTags = [];

    for (const item of tags) {
      const tag = await TagsRepository.retrieveOne(item);

      if (!utils.conditional.isNull(tag)) {
        mapAllTags.push({
          post_id: post.id,
          tag_id: tag.id,
        });
      } else {
        mapAllTagsWithoutDesc.push(item);
      }
    }

    /**
     * prepare a string of tags with ";" as delimeter
     * for eg:- [java, javascript] will become "java;javascript"
     */
    const mapAllTagsWithoutDescString = mapAllTagsWithoutDesc.join(';');

    const resp = await investApi.fetchTagDesc(mapAllTagsWithoutDescString);
    mapNewTags = investApi.prepareTags(mapAllTagsWithoutDesc, resp);

    const newCreatedTags = await TagsRepository.bulkCreate(mapNewTags);

    for (const tag of newCreatedTags) {
      mapAllTags.push({
        post_id: post.id,
        tag_id: tag.id,
      });
    }

    await PostTagRepository.bulkCreate(mapAllTags);

    result(null, responseHandler(true, 200, 'Post Created', post.id));

    await transaction.commit();
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    if (transaction) {
      await transaction.rollback();
    }
  }
};

exports.remove = async (id, result) => {
  let t;

  try {
    t = await db.transaction();

    await AnswersRepository.removePostAnswers(id, t);

    await CommentsRepository.removePostComments(id, t);

    await PostTagRepository.remove(id, t);

    await PostsRepository.remove(id, t);

    result(
      null,
      responseHandler(true, 200, 'Post Removed', null),
    );

    await t.commit();
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
    await t.rollback();
  }
};

exports.retrieveOne = async (postId, result) => {
  try {
    await PostsRepository.incrementViews(postId);
    const queryResult = await PostsRepository.retrieveOne(postId);
    const answersCount = await PostsRepository.countAnswersForOne(postId);
    const commentsCount = await PostsRepository.countCommentsForOne(postId);
    const response = {
      answer_count: answersCount,
      comment_count: commentsCount,
      ...queryResult,
    };
    return result(null, responseHandler(true, 200, 'Success', response));
  } catch (error) {
    console.log('Error in retrieveOne:', error);
    return result(responseHandler(false, 500, 'Error fetching post', null), null);
  }
};

exports.retrieveAll = async (result) => {
  try {
    const postsMap = await PostsRepository.retrieveAll();
    const postCounts = await PostsRepository.countForAll();

    let response = postsMap;
    if (postsMap.length > 0 && postCounts.length > 0) {
      const postCountsMap = postCounts.map((post) => utils.array.sequelizeResponse(post, 'id', 'answer_count', 'comment_count'));
      response = utils.array.mergeById(postsMap, postCountsMap);
    }

    return result(null, responseHandler(true, 200, 'Success', response));
  } catch (error) {
    console.log('Error in retrieveAll:', error);
    return result(responseHandler(false, 500, 'Error fetching posts', null), null);
  }
};

exports.retrieveAllTag = async (tagName, result) => {
  try {
    const postsMap = await PostsRepository.retrieveAll(tagName);
    const postCounts = await PostsRepository.countForAll();

    let response = postsMap;
    if (postsMap.length > 0 && postCounts.length > 0) {
      const postCountsMap = postCounts.map((post) => utils.array.sequelizeResponse(post, 'id', 'answer_count', 'comment_count'));
      response = utils.array.mergeById(postsMap, postCountsMap);
    }

    return result(null, responseHandler(true, 200, 'Success', response));
  } catch (error) {
    console.log('Error in retrieveAllTag:', error);
    return result(responseHandler(false, 500, 'Error fetching tag posts', null), null);
  }
};
