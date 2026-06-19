const UsersRepository = require('./users.data-service');
const PostsRepository = require('./posts.data-service');
const AnswersRepository = require('./answers.data-service');
const CommentsRepository = require('./comments.data-service');
const TagsRepository = require('./tags.data-service');
const PostTagRepository = require('./posttag.data-service');

module.exports = {
  UsersRepository,
  PostsRepository,
  AnswersRepository,
  CommentsRepository,
  TagsRepository,
  PostTagRepository,
};
