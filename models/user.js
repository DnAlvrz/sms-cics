'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Course, Role, Class}) {
      // define association here
      this.belongsTo(Course,{foreignKey:'courseId', as: 'course'})
      this.belongsToMany(Role, {through:'UserRoles'})
      this.belongsToMany(Class, {through: 'ClassList'})
    }
    toJSON () {
      return {
        ...this.get(),
        id:undefined,
        password:undefined,
      }
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: 'User must have a firstname'
        }
      }
    },
    schoolId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: 'User must have a lastname'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'User must have a valid email address'
        },
        notEmpty: {
          msg: 'Email must not be empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User must have an address"
        }
      }
    },
    contactNum: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: "User must have a contact address."
        }
      }
    },
    roles: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'student'
    },
    status: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};