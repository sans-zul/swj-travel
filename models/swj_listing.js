'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class swj_listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  swj_listing.init({
    id_category: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
    image: DataTypes.STRING,
    read_count: DataTypes.INTEGER,
    featured: DataTypes.INTEGER,
    rating: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'swj_listing',

    freezeTableName: true,
    timestamps: false
  });
  return swj_listing;
};