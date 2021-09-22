'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Semester, Grade, User,Subject}) {
      // define association here
      this.belongsTo(Semester, {foreignKey: 'semesterId'});
      this.belongsTo(Subject, {foreignKey: 'subjectId'});
      this.belongsTo(User, {foreignKey: 'teacherId'});
      this.belongsToMany(User, {through: 'ClassList'})
      this.hasMany(Grade, {foreignKey: 'subjectId'})
    }
  };
  Class.init({
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    teacherId: {
      type: DataTypes.INTEGER,
    },
    semesterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startTime : {
      type: DataTypes.TIME,
      defaultValue: '7:30:00'
    },
    endTime : {
      type: DataTypes.TIME,
      defaultValue: '9:00:00'
    }
  }, {
    sequelize,
    tableName: 'classes',
    modelName: 'Class',
  });
  return Class;
};