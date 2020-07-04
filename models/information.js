'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  information.init({
    id_category: DataTypes.INTEGER,
    produk: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    id_sub_category: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'information',

    freezeTableName: true,
    timestamps: false
  });
  return information;
};