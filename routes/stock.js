var express = require('express');
var itemMgr = require('../app/item').itemMgr
var loginMgr = require('../app/login').loginMgr
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('stock', { title: 'Express' });
});

router.get('/newItem', function(req,res){
  res.render('newItem',{title: 'اضافة صنف'});
});

// router.get('/login', function(req,res){
//   res.render('login',{title: 'دخول'});
// });

// router.post('/addItem', function(req,res){
//   itemMgr.addItem(req.body,function(result){
//     console.log(result);

//   });

module.exports = router;
