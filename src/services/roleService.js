const { roleModel } = require("../models");
const { mongoId } = require("../helpers/commonFunction");


class roleService {
  async getOne(id) {
    return roleModel.findOne({ _id: id });
  }

  async getOneWhere(where) {
    return roleModel.findOne(where);
  }


  async create(model) {
    model._id = mongoId("role");
    return roleModel.create(model);
  }

  async remove(model) {
    return roleModel.remove(model);
  }

}

module.exports = new roleService();
