'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('competicoes', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_fim: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_prazo_inscricoes: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      // categoria_id:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // },  
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('competicoes');
  }
};
