'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Events', [
      {
        name: '大晦日公演「宵」',
        placeId: 1,
        date: '2021-12-31 07:58:12.606 +00:00',
        memo: '開演19:00 終演20:30 一年の締めくくり公演',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'お正月公演「春」',
        placeId: 1,
        date: '2022-01-01 07:58:12.606 +00:00',
        memo: '開演11:00 終演12:30',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '会館20周年記念イベント',
        placeId: 2,
        date: '2022-01-04 07:58:12.606 +00:00',
        memo: '開演12:00 終演12:30 子供たちが多めのイベント',
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
    await queryInterface.bulkDelete('Events', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
