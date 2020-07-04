'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  hotel.init({
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
    modelName: 'hotel',

    freezeTableName: true,
    timestamps: false
  });
  return hotel;
};