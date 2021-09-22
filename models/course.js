'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Subject}) {
      // define association here
      this.belongsToMany(Subject, {through:'CourseSubjects'});
      this.hasMany(User, {foreignKey:'courseId', as:'students'});
    }
    toJSON () {
      return {
        ...this.get(),
        userId:undefined,
        id:undefined
      }
    }
  };
  Course.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.UUID,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'courses',
    modelName: 'Course',
  });
  return Course;
};