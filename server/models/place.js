'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place' ,{
    name: {
      type: DataTypes.STRING,
      validate: {notEmpty: true}
    },
    memo: {
      type: DataTypes.STRING,
    }
  }, {});
  
  Place.associate = function(models){
    Place.hasMany(models.Event);
  }; 
  return Place;
};