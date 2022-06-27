const { Model, DataTypes } = require("sequelize");

class Categorias extends Model{
    //sexo varchar, descricao varchar, isDupla boolean, idadeMax integer, idadeMin integer
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING,
            isDupla: DataTypes.BOOLEAN,
            idadeMax: DataTypes.INTEGER,
            idadeMin: DataTypes.INTEGER,
        }, { sequelize });
    }

    static associate(models) {
        this.hasMany(models.Competicoes, { foreignKey: 'categoria_id', as: 'atletas' });
    }

}

module.exports = Categorias;