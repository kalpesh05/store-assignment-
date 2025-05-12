const { productModel } = require('../models');
const { mongoId } = require('../helpers/commonFunction');
const moment = require('moment-timezone');

class ProductService {
  async getAllWhere(where = {}, limit = 10, skip = 0) {
    const query = { ...where, deleted_at: { $exists: false } };
    const products = await productModel
      .find(query)
      .sort('-created_at')
      .skip(skip)
      .limit(limit)
      .lean(); // faster read-only queries
    const total = await productModel.countDocuments(query);
    return { total, data: products };
  }

  async getOne(id) {
    return productModel.findOne({ _id: id, deleted_at: { $exists: false } });
  }

  async getOneWhere(where) {
    return productModel.findOne({ ...where, deleted_at: { $exists: false } });
  }

  async create(model) {
    model._id = mongoId('product');
    return productModel.create(model);
  }

  async update(id, model) {
    return productModel.findOneAndUpdate(
      { _id: id, deleted_at: { $exists: false } },
      model,
      { new: true }
    );
  }

  async remove(id) {
    return productModel.findOneAndUpdate(
      { _id: id },
      { deleted_at: moment().toISOString() },
      { new: true }
    );
  }
}

module.exports = new ProductService();
