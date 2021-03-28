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
    duration: {
      type: Number,
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A project must have a group size'],
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
      required: [true, 'A project must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    funding: {
      type: Number,
    },
    fundingDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Funding deduction ({VALUE}) should be below regular price',
      },
    },

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
    secretProject: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],

    volunteers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.index({ price: 1, ratingsAverage: -1 });
projectSchema.index({ slug: 1 });
projectSchema.index({ startLocation: '2dsphere' });

projectSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Virtual populate
projectSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'project',
  localField: '_id',
});

projectSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

projectSchema.pre(/^find/, function (next) {
  this.find({ secretProject: { $ne: true } });

  this.start = Date.now();
  next();
});

projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'volunteers',
    select: '-__v -passwordChangedAt',
  });
});

projectSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
