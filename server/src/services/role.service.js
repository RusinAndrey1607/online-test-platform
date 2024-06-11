const { Role } = require("../models/models");
const ApiError = require("../exceptions/api.error");

class RolesService {
    async createRole(name) {
        try {
            const role = await Role.create({ name });
            return role;
        } catch (error) {
            throw ApiError.InternalServerError("Error while creating role");
        }
    }
    async getRoleByName(name) {
        try {
            const role = await Role.findOne({ where: { name } });
            if (!role) {
                throw new Error(`Role ${name} not found`);
            }
            return role;
        } catch (error) {
            return
        }
    }

    async deleteRoleById(id) {
        try {
            const deletedRows = await Role.destroy({ where: { id } });
            if (deletedRows === 0) {
                throw new Error(`Role with id ${id} not found`);
            }
            return deletedRows;
        } catch (error) {
            throw ApiError.InternalServerError("Error while deleting role");
        }
    }
}

module.exports = new RolesService();
