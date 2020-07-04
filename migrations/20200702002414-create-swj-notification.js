'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('swj_notification', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_rider: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      is_read: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('swj_notification');
  }
};