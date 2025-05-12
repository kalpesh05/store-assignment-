const { categoryModel } = require('../models');
const { mongoId } = require('../helpers/commonFunction');
const moment = require('moment-timezone');

class CategoryService {
  async getAllWhere(where = {}, limit = 10, skip = 0) {
    const query = { ...where, deleted_at: { $exists: false } };
    const categories = await categoryModel
      .find(query)
      .sort('-created_at')
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await categoryModel.countDocuments(query);
    return { total, data: categories };
  }

  async getOne(id) {
    return categoryModel.findOne({ _id: id, deleted_at: { $exists: false } });
  }

  async getOneWhere(where) {
    return categoryModel.findOne({ ...where, deleted_at: { $exists: false } });
  }

  async create(model) {
    model._id = mongoId('category');
    return categoryModel.create(model);
  }

  async update(id, model) {
    return categoryModel.findOneAndUpdate(
      { _id: id, deleted_at: { $exists: false } },
      model,
      { new: true }
    );
  }

  async remove(id) {
    return categoryModel.findOneAndUpdate(
      { _id: id },
      { deleted_at: moment().toISOString() },
      { new: true }
    );
  }
}

module.exports = new CategoryService();
