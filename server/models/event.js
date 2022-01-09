'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event' ,{
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    },
    placeId: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
      validate: {notEmpty: true}
    },
    memo: {
      type: DataTypes.STRING,
    }
  }, {});
  Event.associate = function(models){
    Event.belongsTo(models.Place);
  }; 
  return Event;
};