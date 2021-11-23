'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Class, User}) {
      // define association here
      this.belongsTo(Class, {foreignKey: 'classId', as:'subject'});
      this.belongsTo(User, {foreignKey: 'studentId', as:'studentgrade'});
    }
  };
  Grade.init({
    grade: {
      type: DataTypes.STRING
    },
    classId: {
      type: DataTypes.INTEGER,
    },
    studentId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Grade',
  });
  return Grade;
};