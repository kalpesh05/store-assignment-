const { productService } = require('../../services');
const {
  DATABASE_INTERNAL,
  PRODUCT_NOT_FOUND,
  USER_NOT_ALLOWED
} = require('../constants/errorMessages');

class ProductController {
  async getAll(req, res, next) {
    const { limit = 10, page = 0, ...query } = req.query;

    try {
      let skip = parseInt(page) > 0 ? parseInt(page) - 1 : parseInt(page);
      
      const result = await productService.getAllWhere(query, parseInt(limit), parseInt(skip));
      return res.json({ message: '', ...result });
    } catch (e) {
      return next(e);
    }
  }

  async getOne(req, res, next) {
    const { product_id } = req.params;
    try {
      const product = await productService.getOneWhere({ _id: product_id });
      if (!product) throw new Error(PRODUCT_NOT_FOUND);
      return res.json({ message: '', data: product });
    } catch (e) {
      return next(e);
    }
  }

  async create(req, res, next) {
    const { body } = req;
    try {
      body.createdBy = req.user.id;
      body.updatedBy = req.user.id;

      if (req.user.roles[0]._id !== "rol_1a37023fecf3005b66a1850e") {
        throw new Error(USER_NOT_ALLOWED);
      }

      const productSave = await productService.create(body);
      if (productSave.error) throw new Error(DATABASE_INTERNAL);

      const product = await productService.getOne(productSave._id);
      return res.json({ message: '', data: product });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    const { product_id } = req.params;
    const { body } = req;

    try {
      const existing = await productService.getOneWhere({ _id: product_id });
      if (!existing) throw new Error(PRODUCT_NOT_FOUND);

      if (req.user.roles[0]._id !== "rol_1a37023fecf3005b66a1850e") {
        throw new Error(USER_NOT_ALLOWED);
      }

      body.updatedBy = req.user.id;

      await productService.update(product_id, body);
      const updated = await productService.getOne(product_id);

      return res.json({ message: '', data: updated });
    } catch (e) {
      return next(e);
    }
  }

  async delete(req, res, next) {
    const { product_id } = req.params;
    try {
      const existing = await productService.getOneWhere({ _id: product_id });
      if (!existing) throw new Error(PRODUCT_NOT_FOUND);

      const deleted = await productService.remove(product_id);
      return res.json({ message: '', data: deleted });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = new ProductController();
