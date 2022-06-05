const { Model, DataTypes } = require('sequelize');

class Competicoes extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      data_inicio: DataTypes.DATE,
      data_fim: DataTypes.DATE,
      data_prazo_inscricoes: DataTypes.DATE,
      
    }, {
      sequelize
    })
  }

  static associate(models){
    this.belongsToMany(models.Atletas, { foreignKey: 'competicao_id', through: 'assoc_competicoes_atletas',as: 'atletas' });
    //falta associcação de categoria
}
}

module.exports = Competicoes;