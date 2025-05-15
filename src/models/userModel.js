const mongoose = require("mongoose");

const schema = {
  _id: {
    type: String
  },
  user_name: {
    type: String
  },
  email: {
    type: String
  },
  gender: {
    type: String
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  role_id: {
    type: String,
  },
  mobile_no: {
    type: String
  },
  is_email_verified: {
    type: Boolean,
    default: false
  },
  updated_by: {
    type: String,
    default: null
  },
  deleted_at: {
    type: Date,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
};
const options = {
  versionKey: false,
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {}
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.salt;
      delete ret.id;
    }
  }
};

const UserSchema = new mongoose.Schema(schema, options);
/**
 * created index for search
 */
UserSchema.index({location: '2dsphere'});
/**
 * auto populate role data
 */
UserSchema.virtual("roles", {
  ref: "role",
  localField: "role_id",
  foreignField: "_id",
  autopopulate: { select: "name" }
});
UserSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("user", UserSchema);
