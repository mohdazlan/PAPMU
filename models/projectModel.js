const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name'],
    unique: true,
  },
  durations: {
    type: Number,
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A project must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A project must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  donation: {
    type: Number,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A project must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
