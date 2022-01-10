var express = require('express');
var router = express.Router();
var { Op } = require('sequelize')

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

//イベント詳細用；上にまとめてもよかったが、わかりやすさで分ける
router.get('/event', function(req, res, next) {
  db.Event.findByPk(
    req.query.id,
    {
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

router.get('/place', function(req, res, next) {
  db.Place.findByPk(
    req.query.id,
    {
      include: [{
       model: db.Event
      }]
    }
  ).then(pls => {
    res.json(pls);
  });
});


router.get('/place/add', function(req, res, next) {
});


router.post('/place/add', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Place.create({
    name: req.body.name,
    pass: req.body.memo
  }));
});

module.exports = router;
