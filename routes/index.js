const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(console.log('from the home page'))
  // res.render('index', { title: 'Express' });
});

module.exports = router;
