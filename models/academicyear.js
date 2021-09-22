'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcademicYear extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Semester}) {
      // define association here
      this.hasMany(Semester, {foreignKey: 'schoolYearId'})
    }
  };
  AcademicYear.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    year: {
      type: DataTypes.STRING,
      allowNull:false
    },
    isCurrentYear: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'academicyear',
    modelName: 'AcademicYear',
  });
  return AcademicYear;
};