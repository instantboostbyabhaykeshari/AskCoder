const { TagsRepository } = require('./data');

exports.retrieveAll = (result) => TagsRepository.retrieveAll(result);

exports.retrieveOne = (tagName, result) => TagsRepository.retrieveOneWithCount(tagName, result);
