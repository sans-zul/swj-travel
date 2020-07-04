'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class swj_saved extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  swj_saved.init({
    id_listing: DataTypes.INTEGER,
    id_rider: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'swj_saved',

    freezeTableName: true,
    timestamps: false
  });
  return swj_saved;
};