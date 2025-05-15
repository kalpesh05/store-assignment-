const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    createdBy: {
      type: mongoose.Schema.Types.String,
      ref: 'user',
      required: true,
      autopopulate: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.String,
      ref: 'user',
      required: true,
      autopopulate: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Optional: autopopulate plugin
CategorySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Category', CategorySchema);
