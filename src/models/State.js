const { Model, DataTypes } = require("sequelize");

class States extends Model {
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

module.exports = States;
