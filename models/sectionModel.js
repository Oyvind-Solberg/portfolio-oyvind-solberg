const mongoose = require('mongoose');
const slugify = require('slugify');

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A section must have a name'],
      unique: true,
    },
    slug: String,
    position: {
      type: Number,
      required: [true, 'A section must have a position'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
    versionKey: false,
  }
);

sectionSchema.virtual('projects', {
  ref: 'Project',
  foreignField: 'section',
  localField: '_id',
});

sectionSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
