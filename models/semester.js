'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class semester extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({AcademicYear, Class}) {
      // define association here
      this.belongsTo(AcademicYear, {foreignKey: 'schoolYearId', as:'schoolyear'});
      this.hasMany(Class, {foreignKey: 'semesterId'})
    }
  };
  semester.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      default: '1st semester' || '2nd semester',
    },
    schoolYearId : {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    tableName: 'semesters',
    modelName: 'Semester',
  });
  return semester;
};