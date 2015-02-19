var easyPbkdf2 = require("easy-pbkdf2")(),
    url=require('url'),
    employeeMgr = require('../app/employee').employeeMgr;

module.exports = {
  /* here we add a new employee to the system */
  addUser: function (body, cb) {
    var salt = easyPbkdf2.generateSalt(), //we generate a new salt for every new employee
        password = body.password; //we generate a new password for every new employee
    easyPbkdf2.secureHash( password, salt, function( err, passwordHash, originalSalt ) {
      var obj={
            name : body.name,
            email : body.email,
            password : passwordHash,
            salt : originalSalt,
            level : body.level,
            phoneNumber: body.phoneNumber,
            iddepartment:body.iddepartment,
          }
      employeeMgr.addEmployee(obj, function(result){
        cb(result);  
        //to do list
        //1- if level is 2 "manager" then check if constit has a manager first if not then assign a manager to that constit
      });
    });
  },
  /* here we check if the employee have root access */
  isRoot : function (req,res,next) {
    if (req.isAuthenticated() && req.session.level<=1) { return next(); }
    res.redirect('/users/login')
  },
  /* here we check if the user have admin or higher access */
  // isAdmin : function (req,res,next) {
  //   if (req.isAuthenticated() && req.session.level<=1) { return next(); }
  //   if(req.isAuthenticated() && req.session.level== 2){res.redirect('/office/'+req.session.office_idoffice) }
  //   res.redirect('/users/login')
  // },
  //  /* here we check if the manager have access to office */
  // isManager : function (req,res,next) {
  //   if (req.isAuthenticated() && req.session.level<2) { return next(); }
  //   if(req.isAuthenticated() && req.session.level==2 && req.params.oid==req.session.office_idoffice){ return next(); }
  //   if(!req.isAuthenticated()){res.redirect('/users/login')}
  //   res.redirect('/office/'+ req.session.office_idoffice)
  // },
  
  // /* here we check user if login */
  // isLogin : function (req,res,next) {
  //   if (!req.isAuthenticated()) { return next(); }
  //   if (req.isAuthenticated() && req.session.level==2 ){res.redirect('/office/'+ req.session.office_idoffice);}
  //   if (req.isAuthenticated() && req.session.level==1 ){res.redirect('/cpanel/cpanelAdmin');}
  //   if (req.isAuthenticated() && req.session.level==0 ){res.redirect('/cpanel');}
  // },
  // getPage : function (req){
  //   var page = 1;
  //   if(url.parse(req.url, true).query.p){
  //     page = parseInt(url.parse(req.url, true).query.p);
  //   }
  //   return page;
  // },
  // getLimit : function (page){
  //   var limit =0;
  //   if (page > 1)
  //     limit = page * 10 - 10;
  //   return limit;
  // },
  // getPageCount : function(count){
  //   return Math.ceil(count/10);
  // },

  // paginate : function(page,pageCount){
  //   var pagination={}, pages = [], next={}, previous={};
  //   var i = 0, limit = 10, ret ='';
  //   //listing pages
  //   page =Number(page);
  //   pageCount= Number(pageCount);
  //   var leftCount = Math.ceil(limit / 2) - 1;
  //   var rightCount = limit - leftCount - 1;
  //   if (page + rightCount > pageCount)
  //     leftCount = limit - (pageCount - page) - 1;
  //   if (page - leftCount < 1)
  //     leftCount = page - 1;
  //   var start = page - leftCount;
  //   while (i < limit && i < pageCount) {
  //     newContext = { n: start };
  //     if (start === page) newContext.active = "active ";
  //     pages.push(newContext);
  //     start++;
  //     i++;
  //   }
  //   //defining next
  //   if (page === 1) {
  //     previous = { disabled: "disabled", n: 1 }
  //   }
  //   else {
  //     previous = { n: page - 1 }
  //   }
  //   //defining next
  //   newContext = {};
  //   if (page === pageCount) {
  //     next = { disabled: "disabled", n: pageCount }
  //   }
  //   else {
  //     next = { n: page + 1 }
  //   }
  //   pagination = {pages : pages, next : next, previous : previous};
  //   return pagination;
  // }
};
