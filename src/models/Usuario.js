const { Model, DataTypes } = require("sequelize");

class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING,
        senha: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Clubes, { foreignKey: "clubeId", as: "Clubes" });
  }
}

module.exports = Usuarios;
