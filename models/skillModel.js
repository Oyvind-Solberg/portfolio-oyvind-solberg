const mongoose = require('mongoose');
const slugify = require('slugify');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A skill must have a name'],
      unique: true,
    },
    group: {
      type: String,
      required: [true, 'A skill must have a group'],
    },
    slug: String,
    percent: {
      type: Number,
      required: [true, 'A skill must have a percent'],
    },
    position: {
      type: Number,
      required: [true, 'A skill must have a position'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
    versionKey: false,
  }
);

skillSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
