const { Model, DataTypes } = require("sequelize");

class categoriasCompeticoesAtletas extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        categoriasCompeticoesId: DataTypes.INTEGER,
        atletaId: DataTypes.INTEGER,
        atletaId2: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }

  static associate(models) {

  }
}

module.exports = categoriasCompeticoesAtletas;
