'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prereq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Subject}) {
      // define association here
      this.belongsTo(Subject, {foreignKey: 'subId', as:'sub'})
      this.belongsTo(Subject, {foreignKey: 'preReqId', as:'prereq'})
    }
  };
  prereq.init({
    subId: DataTypes.INTEGER,
    preReqId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prereq',
  });
  return prereq;
};