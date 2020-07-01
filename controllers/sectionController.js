const Section = require('../models/sectionModel');
const factory = require('./handlerFactory');

exports.getSection = factory.getOne(Section, {
  path: 'projects',
  select: '-slug',
  sort: 'createdAt',
});
exports.getAllSections = factory.getAll(Section, {
  path: 'projects',
  select: '-slug',
  sort: 'createdAt',
});
exports.createSection = factory.createOne(Section);
exports.updateSection = factory.updateOne(Section);
exports.deleteSection = factory.deleteOne(Section);
