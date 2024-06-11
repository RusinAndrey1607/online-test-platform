const ApiError = require("../exceptions/api.error");
const UserDto = require("../dto/user.dto");
const RolesService = require("./role.service");
const { User, Role } = require("../models/models");
const bcrypt = require("bcryptjs");

class AuthService {
  async registration(email, password) {
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest(`User with ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 6);
    const user = await User.create({ email, password: hashPassword });
    let userRole;
    if (email == "admin@mail.com") {
      userRole = await RolesService.getRoleByName("TEACHER");
      if (!userRole) {
        userRole = await RolesService.createRole("TEACHER");
      }
    } else {
      userRole = await RolesService.getRoleByName("STUDENT");
      if (!userRole) {
        userRole = await RolesService.createRole("STUDENT");
      }
    }

    await user.setRole(userRole);

    const userDto = new UserDto(user);
    userDto.role = userRole.name;

    return userDto;
  }

  async login(email, password) {
    const user = await User.findOne({
      where: { email },
      include: { model: Role },
    });
    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} not found`);
    }
    const passwordEqual = await bcrypt.compare(password, user.password);

    if (!passwordEqual) {
      throw ApiError.BadRequest(`Incorrect password`);
    }
    const userDto = new UserDto(user);
    userDto.role = user.Role.name;
    return userDto;
  }
}

module.exports = new AuthService();
