const { Model, DataTypes } = require("sequelize");

class categoriasCompeticoes extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        categoriaId: DataTypes.INTEGER,
        competicaoId: DataTypes.INTEGER,
        paid: DataTypes.FLOAT
     },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Atletas, {
      foreignKey: "categoriasCompeticoesId",
      through: "categoriasCompeticoesAtletas",
      as: "CategoriasCompeticoesAtletas",
    });
  }
}

module.exports = categoriasCompeticoes;
