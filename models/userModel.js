const mongoose = require('mongoose');
const slugify = require('slugify');

const userSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    cv: String,
    email: String,
    phone: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
    versionKey: false,
  }
);

userSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
