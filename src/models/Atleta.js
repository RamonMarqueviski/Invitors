const { Model, DataTypes } = require('sequelize');

class Atletas extends Model {
  static init(sequelize) {
    super.init({
      cpf: DataTypes.STRING,
      nome: DataTypes.STRING,
      dataNascimento: DataTypes.DATE,
      sexo: DataTypes.CHAR(1),
      foto: DataTypes.STRING,
      identificacao: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models){
    this.belongsTo(models.Clubes, { foreignKey: 'clubeId', as: 'Clube' });
    this.belongsToMany(models.Competicoes, { foreignKey: 'atletaId', through: 'assoc_competicoes_atletas',as: 'competicoes' })
  }
}

module.exports = Atletas;