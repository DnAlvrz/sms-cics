'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Course, Semester, Class, Prereq}) {
      // define association here
      this.belongsToMany(Course, {through:'CourseSubjects'});
      this.hasMany(Class, {foreignKey: 'subjectId', as:"class"})
      //this.belongsTo(Semester, {foreignKey:'semId', as:'semester'})
      this.hasOne(Prereq,  {foreignKey: 'subId', as:"sub"});
      this.hasOne(Prereq,  {foreignKey: 'preReqID', as:"prereq"});
    }
  };
  Subject.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    description: {
      type: DataTypes.UUID,
      allowNull:false
    },
    subCode: {
      type: DataTypes.STRING,
      allowNull:false
    },
    yearLvl: {
      type: DataTypes.STRING,
      allowNull:false
    },
    sem: {
      type: DataTypes.STRING,
      allowNull:false
    },
    units : {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {
    sequelize,
    tableName: 'subjects',
    modelName: 'Subject',
  });
  return Subject;
};