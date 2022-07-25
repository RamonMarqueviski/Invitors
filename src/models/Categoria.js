const { Model, DataTypes } = require("sequelize");

class Categorias extends Model{
    //sexo varchar, descricao varchar, isDupla boolean, idadeMax integer, idadeMin integer
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING,
            dupla: DataTypes.STRING,
            idadeMax: DataTypes.INTEGER,
            idadeMin: DataTypes.INTEGER,
            paid: DataTypes.FLOAT,
        }, { sequelize });
    }

    static associate(models) {
        this.belongsToMany(models.Competicoes, {
          foreignKey: "categoriaId",
          through: "categoriasCompeticoes",
          as: "Competicoes",
        });
    }

}

module.exports = Categorias;