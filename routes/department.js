var express = require('express');
var router = express.Router();
var departmentMgr = require('../app/department').departmentMgr;


router.get('/', function(req, res) {
  departmentMgr.getDepartments(function(result){
    res.render('department',{title: 'الاقسام',departments:result});

  });
});

router.get('/login', function(req,res){
  res.render('login',{title: 'دخول'});
});



router.post('/edit', function(req,res){
  departmentMgr.update(req.body,function(result){
   res.send(result);
   });
});

router.get('/delete/:id', function(req,res){
  departmentMgr.dpdelete(req.params.id,function(result){
   res.send(result);
   });
});

router.get('/editdep/:id', function(req,res){
  departmentMgr.getDepartment(req.params.id,function(result){
    res.render('editdepartment',{title: 'دخول',dep:result});

  });
});

router.post('/add', function(req,res){
  departmentMgr.addDp(req.body,function(result){
    console.log(result);

  });
  });

module.exports = router;
