var express = require('express');
var router = express.Router();

/* 
GET メソッドで '/' というルートのパスにアクセスがあった時に、'views/index.pug' のテンプレートを
利用して、render関数を呼び、HTML形式の文字列を作って、レスポンスとして返すという処理。
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
