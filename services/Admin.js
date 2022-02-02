const AdminModel = require('../db/models/admin');

class AdminService {
  async createAdminAccount (adminInfo) {
    const { username } = adminInfo;

    const result = await AdminModel.findOne({
      where: { username }
    });

    if (result) {
      return await AdminModel.update(adminInfo, {
        where: { username }
      });
    } else {
      return await AdminModel.create(adminInfo);
    }
  }

  async login (userInfo) {
    const { username, password } = userInfo;

    const usernameExit = await AdminModel.findOne({
      where: { username }
    });

    if (!usernameExit) {
      return 10003;
    }

    const dbPassword = usernameExit.get('password');

    if (password !== dbPassword) {
      return 10004;
    }

    const uid = usernameExit.get('id');

    return {
      uid,
      username
    };
  }
}

module.exports = new AdminService();