'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("categoriasCompeticoesAtletas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      categoriasCompeticoesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "categoriasCompeticoes", key: "id" },
        onUpdate: "CASCADE", //Sempre que há alguma alteração no pai, reflete no filho.
        onDelete: "CASCADE", //Sempre que o pai for deletado, os filhos tmb serão
      },
      atletaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Atletas", key: "id" },
        onUpdate: "CASCADE", //Sempre que há alguma alteração no pai, reflete no filho.
        onDelete: "CASCADE", //Sempre que o pai for deletado, os filhos tmb serão
      },
      atletaId2: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Atletas", key: "id" },
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

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("assoc_competicoes_atletas_categorias");
  }
};
