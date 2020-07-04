'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rider', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appid: {
        type: Sequelize.STRING
      },
      rider_password: {
        type: Sequelize.STRING
      },
      rider_otp: {
        type: Sequelize.STRING
      },
      rider_firstname: {
        type: Sequelize.STRING
      },
      rider_lastname: {
        type: Sequelize.STRING
      },
      rider_email: {
        type: Sequelize.STRING
      },
      rider_phone: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rider');
  }
};