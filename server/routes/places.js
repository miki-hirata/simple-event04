var express = require('express');
var router = express.Router();
var { Op } = require('sequelize')
const db = require('../models/index');

router.get('/', function(req, res, next) {
  if(!req.query.id){//クエリのID指定が無い時は全件表示
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
  } else {
    db.Place.findByPk(
      req.query.id,
      {
        include: [{
         model: db.Event
        }]
      }
    ).then(pl => {
      res.json(pl);
    });
  }
});

router.post('/add', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Place.create({
    name: req.body.name,
    memo: req.body.memo
  }))
  .then(() => {
    res.redirect('/places');
  })
  .catch(() => {
    res.redirect('/places');
    console.log('新規作成失敗');
  });
});

router.get('/edit', function(req, res, next) {
  db.Place.findByPk(
    req.query.id
  ).then(pl => {
    res.render('placeUpdate', {place: pl});
  });
});

router.post('/edit', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Place.update({
    name: req.body.name,
    memo: req.body.memo
  },
  {
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/places');
  })
  .catch(() => {
    res.redirect('/places');
    console.log('更新失敗');
  });
});

router.post('/delete', function(req, res, next) {
  db.sequelize.sync()
  .then(() => db.Place.destroy({
    where: {id: req.body.id}
  }))
  .then(() => {
    res.redirect('/places');
  })
  .catch(() => {
    res.redirect('/places');
    console.log('削除失敗');
  });
});

module.exports = router;
