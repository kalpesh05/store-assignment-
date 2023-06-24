const mongoose = require("mongoose");

const schema = {
  _id: {
    type: String
  },
  name: {
    type: String
  },
  slug: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
};
const options = {
  versionKey: false,
  toObject: {
    virtual: true,
    transform: function(doc, ret) {}
  },
  toJSON: {
    virtual: true,
    transform: function(doc, ret) {
      delete ret.id;
    }
  }
};
const RoleSchema = new mongoose.Schema(schema, options);

RoleSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("role", RoleSchema);
