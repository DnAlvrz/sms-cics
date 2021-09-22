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
      this.belongsTo(Class, {foreignKey: 'classId'});
      this.belongsTo(User, {foreignKey: 'studentId'});
    }
  };
  Grade.init({
    grade: {
      type: DataTypes.INTEGER
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Grade',
  });
  return Grade;
};