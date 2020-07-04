'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  review.init({
    id_category: DataTypes.INTEGER,
    id_sub_category: DataTypes.INTEGER,
    id_rider: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    rating: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'review',

    freezeTableName: true,
    timestamps: false
  });
  return review;
};