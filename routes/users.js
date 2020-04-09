var express = require('express');
var router = express.Router();

/*
GET メソッドで'/'というルートのパスにアクセスがあった時に、send 関数が呼ばれて、引数に指定された
文字列を自動的にレスポンスのボディとして返す処理。
*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
