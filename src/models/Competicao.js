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
}
}

module.exports = Competicoes;