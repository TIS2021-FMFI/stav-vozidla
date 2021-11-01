'use strict';

const model = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await model.user.bulkCreate(
      [
        {
          email: 'admin@admin.sk',
          idGefco: '0',
          name: 'Admin',
          password: 'admin123',
          admin: true,
          resetToken: null,
        },
      ],
      {
        individualHooks: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', { email: 'admin@admin.sk' }, {});
  },
};
