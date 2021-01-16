'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return bcrypt.hash('super-admin', 10)
      .then((hashed) => {
        return queryInterface.bulkInsert('Users', [
          {
            email : 'superadmin@example.com',
            name: 'Super Admin',
            role: 'super-admin',
            password : hashed,
            createdAt : new Date(),
            updatedAt : new Date()
          }
        ], {});
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', [{
      email :'superadmin@example.com'
    }])
  }
};
