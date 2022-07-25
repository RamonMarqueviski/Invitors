"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("Categorias", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dupla: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idadeMax: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idadeMin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paid: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    return queryInterface.dropTable("Categorias");
  },
};
