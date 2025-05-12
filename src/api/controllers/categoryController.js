const { categoryService } = require('../../services');
const {
  DATABASE_INTERNAL,
  CATEGORY_NOT_FOUND
} = require('../constants/errorMessages');

class CategoryController {
  async getAll(req, res, next) {
    const { limit = 10, skip = 0, ...query } = req.query;

    try {
      const result = await categoryService.getAllWhere(query, parseInt(limit), parseInt(skip));
      return res.json({ message: '', ...result });
    } catch (e) {
      return next(e);
    }
  }

  async getOne(req, res, next) {
    const { category_id } = req.params;
    try {
      const category = await categoryService.getOneWhere({ _id: category_id });
      if (!category) throw new Error(CATEGORY_NOT_FOUND);
      return res.json({ message: '', data: category });
    } catch (e) {
      return next(e);
    }
  }

  async create(req, res, next) {
    const { body } = req;
    try {
      body.created_by = req.user._id;
      body.updated_by = req.user._id;

      const saved = await categoryService.create(body);
      if (saved.error) throw new Error(DATABASE_INTERNAL);

      const category = await categoryService.getOne(saved._id);
      return res.json({ message: '', data: category });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    const { category_id } = req.params;
    const { body } = req;

    try {
      const existing = await categoryService.getOneWhere({ _id: category_id });
      if (!existing) throw new Error(CATEGORY_NOT_FOUND);

      body.updated_by = req.user._id;

      await categoryService.update(category_id, body);
      const updated = await categoryService.getOne(category_id);

      return res.json({ message: '', data: updated });
    } catch (e) {
      return next(e);
    }
  }

  async delete(req, res, next) {
    const { category_id } = req.params;
    try {
      const existing = await categoryService.getOneWhere({ _id: category_id });
      if (!existing) throw new Error(CATEGORY_NOT_FOUND);

      const deleted = await categoryService.remove(category_id);
      return res.json({ message: '', data: deleted });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = new CategoryController();
