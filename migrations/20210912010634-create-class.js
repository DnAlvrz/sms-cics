'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subjectId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      semesterId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      section: {
        type: Sequelize.STRING
      },
      startTime : {
        type: Sequelize.TIME,
        defaultValue: '7:30:00'
      },
      endTime : {
        type: Sequelize.TIME,
        defaultValue: '9:00:00'
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
    await queryInterface.dropTable('classses');
  }
};