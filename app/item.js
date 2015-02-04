var mysqlMgr = require('./mysql').mysqlMgr,
  util=require('util');



exports.itemMgr = {
/* Add item */
  addItem : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `item` SET ?',  body,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result.insertId)
        }

      });
    });
  }

}




