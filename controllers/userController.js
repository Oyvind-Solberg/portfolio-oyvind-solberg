const multer = require('multer');
const { bucket } = require('./firebase');
const User = require('../models/userModel');
const factory = require('./handlerFactory');
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');

// Upload user files
const multerStorageBuffer = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  const filetype = file.fieldname ? 'bilde' : 'pdf fil';

  if (
    (file.fieldname === 'image' && file.mimetype.startsWith('image')) ||
    (file.fieldname === 'cv' && file.mimetype === 'application/pdf')
  ) {
    callback(null, true);
  } else {
    callback(
      new AppError(
        `Ikkje ei/ein ${filetype}! Vennlegst kunn last opp ${filetype}.`,
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorageBuffer,
  fileFilter: multerFilter,
});

exports.uploadUserFiles = upload.fields([{ name: 'cv' }, { name: 'image' }]);

// Process files
exports.processFiles = catchAsync(async (req, res, next) => {
  if (req.files.cv) {
    const blob = bucket.file(req.files.cv[0].originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.files.cv[0].mimetype,
      },
    });

    blobStream.on('error', (err) => next(err));
    blobStream.on('finish', () => {
      req.body.cv = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;
      next();
    });
    blobStream.end(req.files.cv[0].buffer);
  }

  let { image } = req.files;
  if (image) {
    image = image[0];

    const blob = bucket.file(image.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
    });

    blobStream.on('error', (err) => next(err));
    blobStream.on('finish', () => {
      req.body.image = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;
      next();
    });
    blobStream.end(image.buffer);
  }

  if (!req.files.cv && !image) {
    next();
  }
});

exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
