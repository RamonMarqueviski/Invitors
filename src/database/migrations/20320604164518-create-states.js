"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      "States",
      {
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
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      { freezeTableName: true }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("States");
  },
};
