const multer = require('multer');
const { bucket } = require('./firebase');
const Project = require('../models/projectModel');
const factory = require('./handlerFactory');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');

// Upload image
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(
      new AppError(`Ikkje eit bilde! Vennlegst last opp kunn bilder.`, 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProjectImage = upload.single('image');

// Process file
exports.processFile = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  // blobStream.on('error', (err) => next(err));
  blobStream.on('finish', () => {
    req.body.image = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURI(blob.name)}?alt=media`;
    next();
  });
  blobStream.end(req.file.buffer);
});

exports.getProject = factory.getOne(Project);
exports.getAllProjects = factory.getAll(Project);
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
