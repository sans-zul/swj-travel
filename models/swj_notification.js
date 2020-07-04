'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class swj_notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  swj_notification.init({
    id_rider: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    is_read: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'swj_notification',

    freezeTableName: true,
    timestamps: false
  });
  return swj_notification;
};