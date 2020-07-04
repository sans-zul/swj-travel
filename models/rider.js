'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rider.init({
    appid: DataTypes.STRING,
    rider_password: DataTypes.STRING,
    rider_otp: DataTypes.STRING,
    rider_firstname: DataTypes.STRING,
    rider_lastname: DataTypes.STRING,
    rider_email: DataTypes.STRING,
    rider_phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rider',

    freezeTableName: true,
    timestamps: false
  });
  return rider;
};