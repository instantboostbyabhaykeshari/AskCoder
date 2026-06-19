const { CommentsRepository } = require('./data');

exports.create = (newComment, result) => CommentsRepository.create(newComment, result);

exports.remove = (id, result) => CommentsRepository.remove(id, result);

exports.retrieveAll = (postId, result) => CommentsRepository.retrieveAll(postId, result);
