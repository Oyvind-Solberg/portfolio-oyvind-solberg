const mongoose = require('mongoose');
const slugify = require('slugify');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A project must have a name'],
      unique: true,
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'A project must have a description'],
    },
    image: String,
    website: String,
    code: {
      type: String,
      required: [true, 'A project must have a codebase'],
    },
    section: {
      type: mongoose.Schema.ObjectId,
      ref: 'Section',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
    versionKey: false,
  }
);

projectSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
