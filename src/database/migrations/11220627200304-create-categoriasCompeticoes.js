"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("categoriasCompeticoes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      competicaoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Competicoes", key: "id" },
        onUpdate: "CASCADE", //Sempre que há alguma alteração no pai, reflete no filho.
        onDelete: "CASCADE", //Sempre que o pai for deletado, os filhos tmb serão
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Categorias", key: "id" },
        onUpdate: "CASCADE", //Sempre que há alguma alteração no pai, reflete no filho.
        onDelete: "CASCADE", //Sempre que o pai for deletado, os filhos tmb serão
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("categoriasCompeticoes");
  },
};
