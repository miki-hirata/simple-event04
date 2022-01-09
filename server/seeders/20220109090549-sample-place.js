'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Places', [
      {
        name: '新潟県民会館',
        memo: '白山神社近くの大きな会館。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '香川県民会館',
        memo: 'お遍路さんを見守る架空の会館。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '神奈川県民会館',
        memo: '大都会の真ん中の架空の会館。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '北海道民会館',
        memo: 'どこに建てるのかでもめている架空の会館。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Places', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
