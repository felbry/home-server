# 前提

运行mongodb数据库服务：`sudo mongod`

# 初始项目

新建文件夹，`npm init`，然后`npm i keystone -S`

创建一个`keystone.js`文件，添加以下代码

```javascript
var keystone = require('keystone')

keystone.init({
  'cookie secret': 'secure string goes here',
})

keystone.start()
```

执行`node keystone.js`，即可运行起服务

# 数据模型

添加一个User Model，传递给`init`方法的对象追加几个属性

- `name` 站点名称，同时也是数据库的名称
- `'user model'` 指定model
- `auth` 设置成true，访问admin后台需要登录
- `'auto update'` 设置为true，跟文章后面的update script有关系

```javascript
keystone.init({
  'cookie secret': 'secure string goes here',
  name: 'kstart',
  'user model': 'User',
  'auto update': true,
  auth: true,
})
```

然后在`init`方法后引入models：`keystone.import('models')`。（但是要在`keystone.start()`之前）

创建`models/User.js`文件，文件中写入

```javascript
var keystone = require('keystone')
var User = new keystone.List('User')

User.add({
  displayName: {
    type: String
  },
  password: {
    type: keystone.Field.Types.Password
  },
  email: {
    type: keystone.Field.Types.Email,
    unique: true
  }
})

// 后续可以了解virtual方法。canAccessKeystone允许User这个model的所有用户可以访问keystone的adminUI，当然还可以对权限进行更细致的定制（可查文档）
User.schema.virtual('canAccessKeystone')
  .get(function () {
    return true
  })

// 在adminUI中展示的列
User.defaultColumns = 'id, displayName, email'

User.register()
```

# 初始化数据

在官方文档这样形容：**update script（更新脚本）**

创建`updates/0.0.1-first-user.js`文件，文件中写入

（其中**0.0.1**为建议的前缀，表示版本；后边的为key，表明此脚本的作用，也可以叫name）

```javascript
exports.create = {
  User: [
    {
      displayName: 'user1',
      email: 'user@keystonejs.com',
      password: 'admin'
    }
  ]
}
```

如果一个model的某个属性值为另一个model，那么简单的create就无法满足update，需要用其他方式来实现（详见官方文档）

# 再添加一个Event Model

创建`models/Event.js`文件，文件中写入

```javascript
var keystone = require('keystone')
var Types = keystone.Field.Types

var Event = new keystone.List('Event')

Event.add({
  name: { type: String, required: true, initial: true },
  description: { type: Types.Html, wysiwyg: true },
  cost: { type: Number, default: 0, size: 'small' },
  startTime: { type: Types.Datetime, required: true, initial: true, index: true },
  endTime: { type: Types.Datetime, required: true, initial: true, index: true },
  location: { type: Types.Location, initial: true },
  published: { type: Boolean },
  publishDate: { type: Types.Date, index: true },
})

Event.schema.virtual('canAccessKeystone')
  .get(function () {
    return true
  })

Event.schema.pre('save', function (next) {
  let event = this
  if (event.isModified('published') && event.published) {
    this.publishDate = Date.now()
  }
  return next()
})

Event.defaultColumns = 'name, description'
Event.register()
```

# 访问

执行`node keystone.js`，访问`http://localhost:3000/keystone`

# 进阶一：路由

`init`方法增加两个属性

```javascript
keystone.init({
  ...,
  views: 'templates/views', // 指定模板文件夹
  'view engine': 'pug' // 指定模板引擎
})
```

安装pug：`npm i pug -S`

设置路由：`keystone.set('routes', require('./routes'))`

创建如下项目目录

```bash
|--routes
|   |--index.js
|   |--views
|   |   |--index.js
|--templates
|   |--views
|   |   |--index.pug
|--keystone.js
```

`routes/index.js`

```javascript
var keystone = require('keystone')
var importRoutes = keystone.importer(__dirname)

var viewRoutes = importRoutes('./views')

module.exports = function (app) {
  app.get('/', viewRoutes.index)
}
```

`routes/views/index.js`

```javascript
module.exports = function (req, res) {
  res.render('index')
}
```

`templates/views/index.pug`

```pug
doctype html
html(lang="en")
  head
    title="Demo"
  body
    h1 Welcome to Keystone!
```

执行`node keystone.js`，访问`http://localhost:3000`



