const Sequelize = require('sequelize');
const utils = require('../../utils');
const { responseHandler } = require('../../helpers');
const { TagsModel, PostsModel } = require('../../models');

const TAGS_GROUP = ['tags.id', 'tags.tagname', 'tags.description', 'tags.created_at'];

const postsInclude = {
  model: PostsModel,
  attributes: [],
  required: false,
  through: { attributes: [] },
};

exports.retrieveAll = async (result) => {
  try {
    const queryResult = await TagsModel.findAll({
      attributes: [
        'id',
        'tagname',
        'description',
        [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
        'created_at',
      ],
      include: postsInclude,
      group: TAGS_GROUP,
      order: [[Sequelize.literal('posts_count'), 'DESC']],
    });

    const tagsMap = queryResult.map((tag) => utils.array.sequelizeResponse(
      tag,
      'id',
      'tagname',
      'description',
      'posts_count',
      'created_at',
    ));

    result(null, responseHandler(true, 200, 'Success', tagsMap));
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
  }
};

exports.retrieveOneWithCount = async (tagName, result) => {
  try {
    let queryResult = await TagsModel.findOne({
      attributes: [
        'id',
        'tagname',
        'description',
        [Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count'],
        'created_at',
      ],
      include: postsInclude,
      where: { tagname: tagName },
      group: TAGS_GROUP,
    });

    if (utils.conditional.isNull(queryResult)) {
      return result(responseHandler(false, 404, 'This tag doesn\'t exists', null), null);
    }

    queryResult = utils.array.sequelizeResponse(
      queryResult,
      'id',
      'tagname',
      'description',
      'posts_count',
      'created_at',
    );

    result(null, responseHandler(true, 200, 'Success', queryResult));
  } catch (error) {
    console.log(error);
    result(responseHandler(false, 500, 'Something went wrong', null), null);
  }
};

exports.bulkCreate = async (tags) => {
  try {
    return await TagsModel.bulkCreate(tags);
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.retrieveOne = async (tagname) => {
  try {
    return await TagsModel.findOne({
      where: { tagname },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
