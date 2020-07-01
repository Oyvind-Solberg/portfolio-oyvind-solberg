const multer = require('multer');
const sharp = require('sharp');
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

// Resize image
exports.resizeProjectImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.body.image = `project-${req.params.id}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`client/public/img/projects/${req.body.image}`);

  next();
});

exports.getProject = factory.getOne(Project);
exports.getAllProjects = factory.getAll(Project);
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
