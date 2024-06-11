class UserDto {
    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.role = "";
    }
}

module.exports = UserDto;