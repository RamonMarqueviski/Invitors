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
    this.belongsToMany(models.Atletas, { foreignKey: 'competicaoId', through: 'assoc_competicoes_atletas',as: 'atletas' });
    //falta associcação de categoria
    this.belongsToMany(models.Categorias, {
      foreignKey: "competicaoId",
      through: "assoc_categorias_competicoes",
      as: "Categorias",
    });
}
}

module.exports = Competicoes;