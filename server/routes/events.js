var express = require('express');
var router = express.Router();
var { Op } = require('sequelize')
const db = require('../models/index');

router.get('/', function(req, res, next) {
  if(!req.query.id){//クエリのID指定が無い時は全件表示
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
  } else {
    db.Event.findByPk(
      req.query.id,
      {
        include: [{
         model: db.Place
        }]
      }
    ).then(eve => {
      res.json(eve);
    });
  }
});

router.post('/add', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Event.create({
    name: req.body.name,
    date: req.body.date,
    placeId: req.body.placeId,
    PlaceId: req.body.placeId,
    memo: req.body.memo
  }))
  .then(() => {
    res.redirect('/events');
  })
  .catch(() => {
    res.redirect('/events');
    console.log('新規作成失敗');
  });
});

router.get('/edit', function(req, res, next) {
  db.Event.findByPk(
    req.query.id
  ).then(eve => {
    res.render('eventUpdate', {event: eve});
  });
});

//日付が空欄になってしまう問題
//空欄のまま送信するとエラーになる
router.post('/edit', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Event.update({
    name: req.body.name,
    date: req.body.date,
    placeId: req.body.placeId,
    PlaceId: req.body.placeId,
    memo: req.body.memo,
  },
  {
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/events');
  })
  .catch(() => {
    res.redirect('/events');
    console.log('更新失敗');
  });
});

router.post('/delete', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Event.destroy({
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/events');
  })
  .catch(() => {
    res.redirect('/events');
    console.log('削除失敗');
  });
});

module.exports = router;
