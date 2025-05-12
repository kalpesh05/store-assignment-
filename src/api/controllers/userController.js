const { userService, tokenService } = require("../../services");
const {
  sprintModel,
  userProductModel,
  skillHistoryModel
} = require("../../models");
const { groupBy } = require("lodash");
const moment = require("moment-timezone");
class userController {
  /**
   * Get All User
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json({
        data: users
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Update User Profile
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async updateProfile(req, res, next) {
    let { user, body } = req;
    let { update, getOneWhere } = userService;
    try {
      /**
       * upate user data
       */
      let userUpdate = await update(user._id, body);
      if (!userUpdate) throw new Error(DATABASE_INTERNAL);

      /**
       * find user profile after update
       */

      let userData = await getOneWhere({ _id: user._id, deleted_at: null });
      if (!userData) throw new Error(DATABASE_INTERNAL);

      /**
       * API response
       */
      return res.send({
        message: "",
        data: userData
      });
    } catch (error) {
      return next(error);
    }
  }

}

module.exports = new userController();
