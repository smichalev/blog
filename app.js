var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'blog'
});
//Tinna Angel
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    connection.query('SELECT * FROM `article`', function (error, results, fields) {
      if (error) res.render('error', {title:'Критическая ошибка', error: 'Не удалось подключиться к базе данных'});
      else if (results.length == 0) res.render('error', {title:'Блог пуст', error: 'Добавьте Ваш первый пост'});
      else res.render('index', {list: results});
    });
});
app.get('/article/', function(req, res){
    res.redirect('/');
});
app.get('/article/:id', function(req, res){
    connection.query('SELECT * FROM `article` WHERE `id` ='+req.params.id, function (error, results, fields) {
      if (error) res.render('error', {title: 'Ошибка', error: 'Некорректный запрос'});
      else if (results.length == 0) res.render('error', {title:'Ошибка 404', error: 'По Вашему запросу ничего не найдено'});
      else res.render('article', {article: results[0]}); ;
    });
});
app.post('/article/:id', function(req, res){
    console.log('{author: '+req.body.author+', text: '+req.body.content+', post_id: '+req.params.id+'}');
    res.redirect('/article/'+req.params.id);
});
app.get('/add', function(req, res){
    res.render('add');
});
app.post('/add', function(req, res){
  var time = new Date().getFullYear()+'-'+correct(new Date().getMonth())+'-'+correct(new Date().getDate())+' '+correct(new Date().getHours())+':'+correct(new Date().getMinutes())+':'+correct(new Date().getSeconds());
    connection.query('INSERT INTO `blog`.`article` (`id` ,`title` ,`content` ,`date` ,`comment`) VALUES (NULL , \''+req.body.title+'\', \''+req.body.content+'\',\''+time+'\', \'0\')', function (error, results, fields) {
      if (error) res.render('error', {title: 'Ошибка', error: 'По какой-то причине не удалось отправить пост. Возможно нет соединения с базой данных.'});
      else {
        res.redirect('/');
      }
    });
});
app.get('/edit', function(req, res){
   res.redirect('/');
});
app.get('/edit/:id', function(req, res){
    connection.query('SELECT * FROM `article` WHERE `id` ='+req.params.id, function (error, results, fields) {
      if (error) res.render('error', {title: 'Ошибка', error: 'Некорректный запрос'});
      else if (results.length == 0) res.render('error', {title:'Ошибка 404', error: 'По Вашему запросу ничего не найдено'});
      else res.render('edit', {article: results[0]}); ;
    });
});
app.post('/edit/:id', function(req, res){
    connection.query('UPDATE `blog`.`article` SET `title` = \''+req.body.title+'\',`content` = \''+req.body.content+'\',`edit` = `edit` + 1 WHERE `article`.`id` =\''+req.params.id+'\'', function (error, results, fields) {
      if (error) res.render('error', {title: 'Ошибка', error: 'Некорректный запрос'});
      else res.redirect('/article/'+req.params.id);
    });
        
});
app.get('/delete', function(req, res){
   res.redirect('/');
});
app.get('/delete/:id', function(req, res){
    connection.query('SELECT * FROM `article` WHERE `id` ='+req.params.id, function (error, results, fields) {
        if(error) res.render('error', {title:'Критическая ошибка', error: 'Ошибка'});
        else{
         if(results.length>0){
             connection.query('DELETE FROM `blog`.`article` WHERE `article`.`id` ='+req.params.id, function (error, results, fields) {
                if (error) res.render('error', {title: 'Ошибка', error: 'Некорректный запрос'});
                else res.redirect('/');
             });
         } else {
             res.render('error', {title: 'Ошибка', error: 'Ты втираешь мне какую-то дичь...'});
         }
        }
    });
});
app.get('*', function(req, res){
  res.status(404).render('error', {title:'Ошибка 404', error: 'По Вашему запросу ничего не найдено'});
});
//корректируем дату
function correct(e){
        if(e<10){
            return e = '0'+e;
        } else {
            return e;
        }
}
app.listen(81, function(){
   console.log('Server start at port', 81);
});
