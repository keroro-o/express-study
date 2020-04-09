'use strict';

const debug = require('debug');
const debugInfo = debug('module:info');
setInterval(() => {
  debugInfo('some information.');
}, 1000);
const debugError = debug('module:error');
setInterval(() => {
  debugError('some error.');
}, 1000);

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos');

var app = express();
app.use(helmet());    // appというオブジェクトのuse関数を使って、helmetを使うように登録する

/*
テンプレートのファイルが'viewsディレクトリ'にあることと、
テンプレートエンジンが'pug'であることを設定している。
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));   // ログを出すための logger を使う設定 
app.use(express.json());  // json形式を解釈したり作成するための json を使う設定
app.use(express.urlencoded({ extended: false }));   // URLをエンコードしたりデコードするための urlencoded を使う設定
app.use(cookieParser());  // Cookieを解釈したり作成するための cookieParser を使う設定
app.use(express.static(path.join(__dirname, 'public')));  // 静的なファイルを public というディレクトリにするという設定

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
