'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull:false
      }, 
      description: {
        type: Sequelize.STRING
      },
      subCode: {
        type: Sequelize.STRING,
        allowNull:false
      },
      yearLvl: {
        type: Sequelize.STRING,
        allowNull:false
      },
      sem: {
        type: Sequelize.STRING,
        allowNull:false
      },
      units: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('subjects');
  }
};