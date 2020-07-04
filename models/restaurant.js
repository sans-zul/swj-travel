'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  restaurant.init({
    name: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
    id_banner: DataTypes.INTEGER,
    rating: DataTypes.STRING,
    description: DataTypes.TEXT,
    price_min: DataTypes.INTEGER,
    price_max: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'restaurant',

    freezeTableName: true,
    timestamps: false
  });
  return restaurant;
};