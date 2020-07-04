'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('review', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_category: {
        type: Sequelize.INTEGER
      },
      id_rider: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.DOUBLE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('review');
  }
};