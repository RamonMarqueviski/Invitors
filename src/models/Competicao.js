const { Model, DataTypes } = require('sequelize');

class Competicoes extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      dataInicio: DataTypes.DATE,
      dataFim: DataTypes.DATE,
      dataPrazoInscricoes: DataTypes.DATE,
      
    }, {
      sequelize
    })
  }

  static associate(models){
    //falta associcação de categoria
    this.belongsToMany(models.Categorias, {
      foreignKey: "competicaoId",
      through: "categoriasCompeticoes",
      as: "Categorias",
    });
}
}

module.exports = Competicoes;