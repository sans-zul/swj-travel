'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class swj_kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  swj_kategori.init({
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    url: DataTypes.STRING,
    icon: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'swj_kategori',

    freezeTableName: true,
    timestamps: false
  });
  return swj_kategori;
};