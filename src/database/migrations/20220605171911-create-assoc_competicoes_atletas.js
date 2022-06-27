'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("assoc_competicoes_atletas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      competicao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Competicoes", key: "id" },
        nUpdate: "CASCADE", //Sempre que há alguma alteração no pai, reflete no filho.
        onDelete: "CASCADE", //Sempre que o pai for deletado, os filhos tmb serão
      },
      atleta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Atletas", key: "id" },
        onUpdate: "CASCADE", //Sempre que há alguma alteração no pai, reflete no filho.
        onDelete: "CASCADE", //Sempre que o pai for deletado, os filhos tmb serão
      },
      atleta_dupla_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('assoc_competicoes_atletas');
  }
};
