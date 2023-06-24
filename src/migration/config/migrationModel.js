const mongoose = require("mongoose");

const schema = {
  _id: {
    type: String
  },
  name: {
    type: String
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
const MigrationSchema = new mongoose.Schema(schema, options);


module.exports = mongoose.model("migration", MigrationSchema);
