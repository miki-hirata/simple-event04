var express = require('express');
var router = express.Router();

const db = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Event.findAll(
    {//過去のものは表示しない、などの条件指定はここで行う
      order: [
        ['date', 'ASC']
      ],
      include: [{
        model: db.Place
      }]
    }
  ).then(eves => {
    res.json(eves);
  });
});


router.get('/events', function(req, res, next) {
  db.Event.findAll(
    {
      order: [
        ['date', 'ASC']
      ],
      include: [{
       model: db.Place
      }]
    }
  ).then(eves => {
    res.json(eves);
  });
});


router.get('/places', function(req, res, next) {
  db.Place.findAll(
    {
      order: [
        ['id', 'ASC']
      ],
      include: [{
       model: db.Event
     }]
    }
  ).then(pls => {
    res.json(pls);
  });
});

module.exports = router;
