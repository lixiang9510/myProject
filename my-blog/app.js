

const express = require('express')
const swig = require('swig')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', (err)=>{
	console.log('connection error');
	throw err;
});

db.once('open', ()=>{
	console.log('connection successful');
});

//开发阶段设置不走缓存
swig.setDefaults({
  cache: false
})

app.use(express.static('public'))
//配置应用模板
app.engine('html', swig.renderFile);
//配置模板的存放目录
app.set('views', './views')
//注册模板引擎
app.set('view engine', 'html')

//post/put请求处理中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/',require('./routers/index.js'))
app.use('/user',require('./routers/user.js'))


app.get('/list',(req,res)=>{
	res.render('list')
})

app.listen(port, () => console.log(`app listening on port ${port}!`))