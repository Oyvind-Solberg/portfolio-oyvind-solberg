const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
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
  // Store pdf to disk
  if (req.files.cv) {
    req.body.cv = 'cv-oyvind-solberg.pdf';

    fs.writeFileSync(
      `client/public/pdf/${req.body.cv}`,
      req.files.cv[0].buffer,
      (err) => {
        next(err);
      }
    );
  }

  // Resize image
  let { image } = req.files;
  if (image) {
    image = image[0];

    req.body.image = `user-${req.params.id}.png`;

    await sharp(image.buffer)
      .resize(1500, 1500)
      .toFormat('png')
      .png({
        quality: 90,
      })
      .toFile(`client/public/img/users/${req.body.image}`);
  }
  next();
});

exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
