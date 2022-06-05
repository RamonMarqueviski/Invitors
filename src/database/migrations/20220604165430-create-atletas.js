'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('atletas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      clube_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clubes', key: 'id'},
        onUpdate: 'CASCADE',//Sempre que há alguma alteração no pai, reflete no filho.
        onDelete: 'CASCADE', //Sempre que o pai for deletado, os filhos tmb serão
      },
      cpf : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sexo: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      identificacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {freezeTableName: true,});
  },

  async down (queryInterface, Sequelize) {
    
    return queryInterface.dropTable('atletas');
    
  }
};
