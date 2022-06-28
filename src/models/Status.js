const { Model, DataTypes } = require("sequelize");

class Status extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {

  }
}

module.exports = Status;
