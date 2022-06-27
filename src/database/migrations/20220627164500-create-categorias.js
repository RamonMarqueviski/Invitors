'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("clubes", {
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
      isDupla: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      idadeMax: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idadeMin: {
        type: Sequelize.STRING,
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

  async down (queryInterface, Sequelize) {
    
    return queryInterface.dropTable('clubes');
    
  }
};
