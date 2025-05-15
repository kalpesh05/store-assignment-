const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      autopopulate: true, // Optional: if using mongoose-autopopulate
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: [
      {
        type: String, // URL of the image
      }
    ],
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
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
    deleted_at: {
      type: Date,
      default: null
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Optional: use mongoose-autopopulate plugin
ProductSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Product', ProductSchema);
