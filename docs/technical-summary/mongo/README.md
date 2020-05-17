# MongoDB深入浅出
[[toc]]

## Ubuntu安装MongoDB
### 导入包管理系统使用的公钥
>导入包管理系统使用的公钥。
Ubuntu软件包管理工具（即dpkg和apt）通过要求分销商使用GPG密钥签署软件包来确保软件包的一致性和真实性。

```
sudo apt-key adv --keyserver hkp：//keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
```

### 为MongoDB创建一个列表文件
> 选择适用的版本。如果不确定主机运行的是什么Ubuntu版本，请在主机上打开终端或shell并执行。`lsb_release -dc`

版本|命令
--|--
Ubuntu18.04|echo  “deb [arch = amd64] https://repo.mongodb.org/apt/ubuntu bionic / mongodb-org / 4.0 multiverse”  | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
Ubuntu16.04|echo  “deb [arch = amd64，arm64] https://repo.mongodb.org/apt/ubuntu xenial / mongodb-org / 4.0 multiverse”  | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
Ubuntu14.04|echo  “deb [arch = amd64] https://repo.mongodb.org/apt/ubuntu trusty / mongodb-org / 4.0 multiverse”  | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

### 重新加载本地包数据库

```
sudo apt-get update
```

### 安装MongoDB

方式|命令|
--|--|--
最新版本|sudo apt-get install -y mongodb-org
指定版本|sudo apt-get install -y mongodb-org = 4 .0.7 mongodb-org-server = 4 .0.7 mongodb-org-shell = 4 .0.7 mongodb-org-mongos = 4 .0.7 mongodb-org-tools = 4 .0.7

防止意外升级
```
echo  “mongodb-org hold”  | sudo dpkg --set-selections
echo  “mongodb-org-server hold”  | sudo dpkg --set-selections
echo  “mongodb-org-shell hold”  | sudo dpkg --set-selections
echo  “mongodb-org-mongos hold”  | sudo dpkg --set-selections
echo  “mongodb-org-tools hold”  | sudo dpkg --set-selections
```

## MongoDB导入Json和Bson

### linux
```
mongorestore -d <db_name> <bson_folder>
```
### windows
```
mongorestore.exe -d <db_name> <bson_folder>
```

## mongo命令增删改查
### 创建集合
```
db.createCollection('user')
``` 
### 删除集合
```
db.user.drop()
```
### 删除数据库
```
db.dropDatabase()
```
### 插入数据
```
db.users.insert({id:123,name:'hello'})
```

## 用node来操作MongoDB完成增、删、改、查
### 增
结合`passport-local-mongoose`插件的`register`方法实现增加用户的功能
```js{1}
User.register(new User(newUser), req.body.password, function(err) {
    if (err) {
      log.error(err);
      res.status(200).json({
        err: 'REGISTER_FAILURE',
        message: err.message
      });
      return;
    }

    log.info('user ' + req.body.username + ' registered successful!');
    res.json({
      username: req.body.username,
      message: 'User registered successful'
    });
  });
```

```js{2}
try {
        Group.create(newGroup);
        res.status(200).json({
          userGroupName: newGroup.userGroupName,
          message: 'Add userGroup successful'
        });
        log.info(`Add userGroup ${newGroup.userGroupName} successful`);
      } catch (err) {
        log.info(`Add userGroup ${newGroup.userGroupName} failure, ${err}`);
        res.status(500).json({
          err: 'ADDGROUP_FAILURE',
          message: COMM_ERR.ADDGROUP_FAILURE
        });
      }
```
### 删
```js {1}
User.deleteOne({
    username: req.body.username
  }, (err) => {
    if (err) {
      log.error(err);
      res.status(500).json({
        err: 'SERVER_ERROR',
        message: COMM_ERR.SERVER_ERROR
      });
      return;
    }

    res.json({
      username: req.body.username,
      message: 'Delete User Successful'
    });

    log.info(`${req.body.username} has been deleted`);
  });
```
### 改

```js {1-5}
User.update({
        'username': newUser.username
      }, {
        $set: newUser
      }, function(err) {
        if (err) {
          log.error(err);
          res.status(200).json({
            err: 'UPDATEUSER_FAILURE',
            message: err.message
          });
          return;
        }
        log.info('user ' + req.body.username + ' update successful!');
        res.json({
          username: req.body.username,
          message: 'User update successful'
        });
      });
```
### 查
```js {1}
  User.find().populate(opts).exec((err, users) => {
    try {
      res.status(200).json({
        users
      });
      log.info('GetUsers successful');
    } catch (err) {
      log.info(`GetUsers failure, ${err}`);
      res.status(500).json({
        err: 'GETUSER_FAILURE',
        message: COMM_ERR.GETUSER_FAILURE
      });
    }
  });
```
## mongo可视化工具-studio-3t

[官网下载](https://studio3t.com/download/)

下载好studio-3t-linux-x64.tar.gz
## 解压
./studio-3t-linux-x64.sh

## 安装

![avatar](../../technical-summary/public/mongo.png)

::: tip
默认是没有密码的,所以认证设为none
:::

## mongoose之passport-local-mongoose
passport-local-mongoose是一个Mongoose插件，它简化了使用Passport建立用户名和密码登录的过程。

### 背景
是一个叫做Michael Herman在他的博客的作品，用于设置mongoose、passport、passport local和passport-local-mongoose进行用户身份验证。

### 安装

```bash
npm install passport passport-local mongoose passport-local-mongoose --save
```

### Schema使用
首先，需要将passport-local-mongoose插入到user表中。

```javascript {4,24-30}
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, trim: true },
  role: { type: String, required: true, trim: true },
  executor: { type: String },
  userGroupList: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  station: { type: String, required: true, trim: true },
  contactNumber: { type: Number, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  allowLoginToIPSegmentStart: { type: String, trim: true },
  allowLoginToIPSegmentEnd: { type: String, trim: true },
  allowLoginToMACAddress: { type: String, trim: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// user authenticate retry limit
const options = {
  interval: 200,
  maxInterval: 6 * 60 * 1000,
  maxAttempts: 6,
  limitAttempts: true
};
User.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', User);

```
你可以自由地定义你的用户。passport-local-mongoose将添加一个用户名、哈希和salt字段来存储用户名、哈希密码和salt值。
此外，passport-local-mongoose还为您的模式添加了一些方法。有关更多详细信息，请参阅API文档部分。

#### options
插入Passport本地Mongoose插件时，可以提供其他选项来配置哈希算法。

```javascript
User.plugin(passportLocalMongoose, options);
```

主要选项|作用
--|--
saltlen|以字节为单位指定salt长度。默认值：32
iterations|指定pbkdf2哈希算法中使用的迭代次数。默认值：25000
keylen|指定生成的密钥的长度（以字节为单位）。默认值：512
digestAlgorithm|指定PBKDF2摘要算法。默认值：sha256。（获取crypto.gethashes（）支持的算法列表）
interval|指定登录尝试之间的间隔（以毫秒为单位），该间隔根据失败的尝试次数以指数形式增加，直到maxinterval。默认值：100
maxInterval|指定可以锁定帐户的最长时间。默认30000（5分钟）
usernameField|指定保存用户名的字段名。默认为“用户名”。如果要使用其他字段保存用户名，例如“email”，则可以使用此选项。
usernameUnique|指定是否应通过MongoDB索引强制username字段为唯一字段。默认为true。
saltField|指定保存salt值的字段名。默认为“salt”。
hashField|指定保存密码哈希值的字段名。默认为“hash”。
attemptsField|指定自上次成功登录以来保存登录失败次数的字段名。默认为“尝试”。
lastLoginField|指定保存上次登录尝试时间戳的字段名。默认为“last”。
selectFields|指定要从MongoDB中选择（并存储在会话中）的模型字段。默认为“未定义”，以便选择模型的所有字段。
usernameLowerCase|保存查询时将用户名字段值转换为小写。默认为“false”。
populateFields|指定要在findbyusername函数中填充的字段。默认为“未定义”。
encoding|指定生成的salt和散列将存储在其中的编码。默认为“hex”。
limitAttempts|指定是否应限制登录尝试，并处罚登录失败。默认值：假。
maxAttempts|指定阻止登录前允许的最大失败尝试次数。默认值：无穷大。
passwordValidator|以“function(password,cb)”的形式指定密码的自定义验证函数。默认：验证非空密码。
usernameQueryFields|指定用于标识用户的模型的可选字段（例如电子邮件）。
findByUsername|指定使用查询参数执行的查询函数，以使用额外的查询参数限制查询。例如，仅查询字段“active”设置为true的用户。默认值：function(model, queryParameters) { return model.findOne(queryParameters); }。有关用例，请参见示例部分。

注意！在生产环境中更改任何哈希选项(saltlen, iterations or keylen)都将阻止现有用户进行身份验证！

#### 配置本地Passport/Passport
您应该按照Passport指南中的描述在本地配置Passport/Passport。
passport-local-mongoose通过实现localstrategy和serializeuser/deserializeuser函数来支持此设置。
要设置passport-local-mongoose，请使用此代码
```javascript
// requires the model with passport-local-mongoose plugged in
const User = require('./models/user');
 
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
 
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

确保有一个Mongoose连接到MongoDB，然后就完成了。
#### 简化的 Passport/Passport-Local配置
从0.2.1版passport-local-mongoose开始，将helper方法createstategy作为静态方法添加到您的模式中。CreateStegy负责使用正确的选项设置Passport本地本地策略。
```javascript
const User = require('./models/user');
 
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```
此功能的原因是，当使用用户名字段选项指定其他用户名字段名称（例如“email”passport local）时，仍然希望前端登录表单包含名为“username”而不是电子邮件的输入字段。这可以配置为本地Passport，但这是工作的两倍。所以我们实现了这个快捷方式。

#### Async/Await
从5.0.0版开始，passport-local-mongoose通过返回除serializeuser和deserializeuser之外的所有实例和静态方法的承诺来实现异步/等待。
```javascript
const user = new DefaultUser({username: 'user'});
await user.setPassword('password');
await user.save();
const { user } = await DefaultUser.authenticate()('user', 'password');
```


##### Hash Algorithm
Passport本地Mongoose使用节点加密库的pbkdf2算法。选择pbkdf2是因为平台独立（与bcrypt相反）。为每个用户保存一个生成的salt值，使彩虹表攻击更加困难。
### 业务层之注册
```js
 User.register(new User(newUser), req.body.password, function(err) {
    if (err) {
      log.error(err);
      res.status(200).json({
        err: 'REGISTER_FAILURE',
        message: err.message
      });
      return;
    }

    log.info('user ' + req.body.username + ' registered successful!');
    res.json({
      username: req.body.username,
      message: 'User registered successful'
    });
  });
```

静态方法在模型构造函数上公开。例如，要使用`createstategy`函数，请使用
```
const user=需要（“./models/user”）；
user.createstategy（）；
```
- `authenticate（）`生成在Passport的本地策略中使用的函数
- `serializeuser（）`生成一个函数，Passport使用该函数将用户序列化到会话中。
- `deserializeuser()`生成一个函数，Passport使用该函数将用户反序列化到会话中。
- `register(user, password, cb) `方便方法，用给定的密码注册新的用户实例。检查用户名是否唯一。请参见登录示例。
- `findByUsername()`通过其唯一用户名查找用户实例的方便方法。
- `createStrategy()` 创建可在Passport中使用的已配置Passport本地本地策略实例。
### 官网 API 文档
#### 实例方法
##### setPassword(password, [cb])
设置用户密码。不保存用户对象。如果没有提供回调cb，则返回承诺。
##### changePassword(oldPassword, newPassword, [cb])
更改用户的密码哈希和salt并保存用户对象。如果没有提供回调cb，则返回承诺。如果旧密码与用户的旧密码不匹配，将向cb传递一个不正确的密码错误，或拒绝该承诺。
##### authenticate(password, [cb])
验证用户对象。如果没有提供回调cb，则返回承诺。
#### resetAttempts([cb])
如果没有提供回调cb，则重置用户的密码尝试失败次数（仅在options.limitteries为true时定义），并返回承诺。
##### 回调参数
- err
  - 除非hasing算法引发错误，否则为空
- thisModel
  - 如果验证成功，则获得身份验证的模型，否则为假
- passwordErr
  - authenticationError的一个实例，描述密码失败的原因，否则是未定义的。
  - 
使用setpassword（）只会更新文档的密码字段，但不会保存文档。要提交更改的文档，请记住在使用setpassword（）之后使用mongoose的document.save（）。
#### 错误处理

- `IncorrectPasswordError`：指定密码不正确时返回的错误消息。默认为“不正确的密码”。
- `IncorrectUsernameError`：指定用户名不正确时返回的错误消息。默认为“不正确的用户名”。
- `MissingUsernameError`：指定注册期间未设置用户名时返回的错误消息。默认为“未设置字段%s”。
- `MissingPasswordError`:指定注册期间未设置密码时返回的错误消息。默认为“密码参数未设置！”.
- `UserExistsError`：指定注册期间用户已存在时返回的错误消息。默认为“已存在名为%s的用户”。
- NoAltValueStored：在MongoDB集合中未存储salt值时发生。
- `AttemptTooSoonError`：如果选项limitattempts设置为true，并且在用户仍受到惩罚时发生登录尝试，则会发生此错误。
- `TooManyAttemptsError`：由于登录尝试失败太多，用户帐户被锁定时返回。

如果需要更一般的错误类来进行检查，那么所有这些错误都继承自`AuthenticationError`。

### 官网例子
仅允许“活动”用户进行身份验证
首先，我们定义一个模式，其中有一个类型为boolean的`active`字段。
```
var UserSchema = new Schema({
  active: Boolean
});
```
插入`passport-local-mongoose`时，我们将`usernameUnique`设置为避免在字段`username`上创建唯一的`mongodb`索引。为了避免`MongoDB`查询非活动用户，我们可以指定`findByUsername`选项，该选项允许我们限制查询。在我们的示例中，我们希望将查询限制为仅查询字段`active`设置为`true`的用户。`findByUsername`必须返回`Mongoose`查询。
```javascript
UserSchema.plugin(passportLocalMongoose, {
  // Needed to set usernameUnique to true to avoid a mongodb index on the username column!
  usernameUnique: false,
 
  findByUsername: function(model, queryParameters) {
    // Add additional query parameter - AND condition - active: true
    queryParameters.active = true;
    return model.findOne(queryParameters);
  }
});
```
要测试实现，我们只需创建（注册）一个字段`active`设置为`false`的用户，然后在第二步中尝试对该用户进行身份验证：
```javascript
var User = mongoose.model('Users', UserSchema);
 
User.register({username:'username', active: false}, 'password', function(err, user) {
  if (err) { ... }
 
  var authenticate = User.authenticate();
  authenticate('username', 'password', function(err, result) {
    if (err) { ... }
 
    // Value 'result' is set to false. The user could not be authenticated since the user is not active
  });
});
```
## mongoose之populate

### 目标

通过查找`_id`,将`group`表中`userGroupName`的值填充入`user`表中的`userGroupList`数组中

反之,同理

### Schema中的操作
接下来我有两个表,分别是`user`和`group`

每张表中需要填充的字段,必须要加入`type: Schema.Types.ObjectId`,`ref`指向要关联的表

- user
```js
const User = new Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, trim: true },
  role: { type: String, required: true, trim: true },
  executor: { type: String },
  userGroupList: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  station: { type: String, required: true, trim: true },
  contactNumber: { type: Number, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  allowLoginToIPSegmentStart: { type: String, trim: true },
  allowLoginToIPSegmentEnd: { type: String, trim: true },
  allowLoginToMACAddress: { type: String, trim: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
```
- group
```js
const Group = new Schema({
  userGroupName: { type: String, required: true, trim: true },
  userList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  userGroupPermissions: { type: String, trim: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
```

### 业务层的操作
下面代码是查找`User`表中所有的数据,但是其中的`userGroupList`中只有`_id`

```js
 User.find().exec((err, users) => {
    try {
      res.status(200).json({
        users
      });
      log.info('GetUsers successful');
    } catch (err) {
      log.info(`GetUsers failure, ${err}`);
      res.status(500).json({
        err: 'GETUSER_FAILURE',
        message: COMM_ERR.GETUSER_FAILURE
      });
    }
  });
```
对上面代码进行修改,在`find()`方法后面加上`populate()`方法

在`populate()`方法中写入参数,`path`是要被替换的表的字段,`select`是查找的表的填充字段,`model`是要查找的表,`options`是可以设置正逆排序
```js
   var opts = {
    path: 'userGroupList',
    select: {
      userGroupName: 1
    },
    model: 'Group',
    options: {
      sort: {
        userGroupName: -1
      }
    }
  };
  User.find().populate(opts).exec((err, users) => {
    try {
      res.status(200).json({
        users
      });
      log.info('GetUsers successful');
    } catch (err) {
      log.info(`GetUsers failure, ${err}`);
      res.status(500).json({
        err: 'GETUSER_FAILURE',
        message: COMM_ERR.GETUSER_FAILURE
      });
    }
  });
```

### 结果
没有完成填充的:

```json
{
            "userGroupList": [
                "5d1484868e409c4a2f24888d",
                "5d142adf7ce7d61593b19cb5",
                "5d148e3d2e12717e94424289"
            ],
            "attempts": 0,
            "_id": "5d1491772e12717e9442428a",
            "username": "admin2",
            "role": "superAdmin",
            "station": "admin",
            "contactNumber": 123456,
            "email": "132456@qq.com",
            "allowLoginToIPSegmentStart": "192.168.3.120",
            "allowLoginToIPSegmentEnd": "192.168.3.160",
            "allowLoginToMACAddress": "192.168.3.120",
            "last": "2019-06-27T09:50:47.039Z",
            "created_at": "2019-06-27T09:50:47.379Z",
            "updated_at": "2019-06-28T05:25:02.267Z",
            "__v": 0
        },
```
完成目标后的:
```json {5-19}
{
   "users": [
  {
      "_id" : "5d142b257ce7d61593b19cb6",
         "userGroupList": [
             {
                 "_id": "5d1484a58e409c4a2f24888e",
                 "userGroupName": "img"
             },
             {
                 "_id": "5d14852f606348509606c506",
                 "userGroupName": "gggg"
             },
             {
                 "_id": "5d1484868e409c4a2f24888d",
                 "userGroupName": "admin"
             }
         ],
      "attempts" : 0,
      "username" : "admin",
      "role" : "admin",
      "station" : "admin",
      "contactNumber" : 13123123,
      "email" : "1231231231@qq.com",
      "allowLoginToIPSegmentStart" : "",
      "allowLoginToIPSegmentEnd" : "",
      "allowLoginToMACAddress" : "",
      "last" : ISODate("2019-06-26T02:22:07.235Z"),
      "salt" : "e9ac91da6445e866b49b74ef69ceb2c8f98d417c239f864ba7a182f90983f041",
      "created_at" : ISODate("2019-06-26T02:22:07.527Z"),
      "updated_at" : ISODate("2019-06-26T02:22:07.527Z"),
      "__v" : 0
    }
  ]
}
```
### 基础知识
> MongoDB 在版本> = 3.2中具有类似连接的$ lookup聚合运算符。Mongoose有一个更强大的替代方法populate()，它允许您引用其他集合中的文档。

> 填充是使用来自其他集合的文档自动替换文档中的指定路径的过程。我们可以填充单个文档，多个文档，普通对象，多个普通对象或从查询返回的所有对象。我们来看一些例子。

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

```
到目前为止，我们已经创建了两个模型。我们的Person模型将其stories字段设置为ObjectIds 数组。该ref选项告诉Mongoose在人口中使用哪种模型，在我们的例子中是Story模型。

### 参数
参数|作用
--|--
path|类型：String或Object。String类型的时， 指定要填充的关联字段，要填充多个关联字段可以以空格分隔。Object类型的时，就是把 populate 的参数封装到一个对象里。当然也可以是个数组。
select|类型：Object或String，可选，指定填充 document 中的哪些字段。Object类型的时，格式如: {name: 1, _id: 0}，为0表示不填充，为1时表示填充。String类型的时，格式如: “name -_id”，用空格分隔字段，在字段名前加上-表示不填充。
model|类型：Model，可选，指定关联字段的 model，如果没有指定就会使用Schema的ref。
match|类型：Object，可选，指定附加的查询条件。
options|类型：Object，可选，指定附加的其他查询选项，如排序以及条数限制等等。
### 方法细节

#### Saving refs
将refs保存到其他文档的工作方式与通常保存属性的方式相同，只需指定_id值：
```js
const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  const story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });
});
```
#### Population
到目前为止，我们没有做过任何不同的事情。我们只是创造了一个 Person和一个Story。现在让我们看看author使用查询构建器填充我们的Story：

```js
Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
  });
```
填充的路径不再设置为原始路径_id，它们的值将替换为从数据库返回的mongoose文档，方法是在返回结果之前执行单独的查询。

ref的数组以相同的方式工作。只需在查询上调用 populate方法，就会返回一个文档数组来代替原始文件_id。

#### Setting Populated Fields
您可以通过将属性设置为文档来手动填充该属性。该文档必须是您的ref属性引用的模型的实例。

```js
Story.findOne({ title: 'Casino Royale' }, function(error, story) {
  if (error) {
    return handleError(error);
  }
  story.author = author;
  console.log(story.author.name); // prints "Ian Fleming"
});
```
#### What If There's No Foreign Document?
Mongoose populate的行为与传统的 SQL连接不同。如果没有文件，story.author将会null。这类似于SQL中的 左连接。

```js

await Person.deleteMany({ name: 'Ian Fleming' });

const story = await Story.findOne({ title: 'Casino Royale' }).populate('author');
story.author; // `null`
```
如果你有一个数组authors中的storySchema，populate()会给你一个空数组来代替。

```js
const storySchema = Schema({
  authors: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  title: String
});

// Later

const story = await Story.findOne({ title: 'Casino Royale' }).populate('authors');
story.authors; // `[]`
```
#### Field Selection
如果我们只想为填充的文档返回一些特定字段，该怎么办？这可以通过将通常的 字段名称语法作为第二个参数传递给populate方法来实现：

```js
Story.
  findOne({ title: /casino royale/i }).
  populate('author', 'name'). // only return the Persons name
  exec(function (err, story) {
    if (err) return handleError(err);

    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"

    console.log('The authors age is %s', story.author.age);
    // prints "The authors age is null'
  });

```
#### Populating Multiple Paths
如果我们想同时填充多条路径怎么办？
```js
Story.
  find(...).
  populate('fans').
  populate('author').
  exec();
```
如果您populate()使用相同的路径多次呼叫，则只有最后一个路由才会生效。
```js
// The 2nd `populate()` call below overwrites the first because they
// both populate 'fans'.
Story.
  find().
  populate({ path: 'fans', select: 'name' }).
  populate({ path: 'fans', select: 'email' });
// The above is equivalent to:
Story.find().populate({ path: 'fans', select: 'email' });
```
#### Query conditions and other options
如果我们想根据他们的年龄填充我们的粉丝阵列，选择他们的名字，最多返回，其中任何5个怎么办？
```js
Story.
  find(...).
  populate({
    path: 'fans',
    match: { age: { $gte: 21 }},
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: 'name -_id',
    options: { limit: 5 }
  }).
  exec();
  ```
#### Refs to children
然而，我们可能会发现，如果我们使用该author对象，我们将无法获得故事列表。这是因为没有任何story物体被“推”过author.stories。

这里有两个观点。首先，您可能想author知道哪些故事是他们的。通常，您的架构应该通过在“many”侧具有父指针来解决一对多关系。但是，如果你有充分的理由想要一个子指针数组，你可以将push()文档存入数组，如下所示。

author.stories.push(story1);
author.save(callback);
这允许我们执行find和populate组合：
```js
Person.
  findOne({ name: 'Ian Fleming' }).
  populate('stories'). // only works if we pushed refs to children
  exec(function (err, person) {
    if (err) return handleError(err);
    console.log(person);
  });
```

值得商榷的是，我们确实需要两组指针，因为它们可能会失去同步。相反，我们可以跳过填充和直接find()我们感兴趣的故事。
```js
Story.
  find({ author: author._id }).
  exec(function (err, stories) {
    if (err) return handleError(err);
    console.log('The stories are an array: ', stories);
  });
```
除非指定了lean选项，否则从查询填充返回的文档将 成为功能齐全，功能强大的文档 。不要将它们与子文档混淆。调用remove方法时要小心，因为你要从数据库中删除它，而不仅仅是数组。removesave

#### Populating an existing document
如果我们有一个现有的mongoose文档并想要填充它的一些路径，那么mongoose> = 3.6支持 文档#populate（）方法。

#### Populating multiple existing documents
如果我们有一个或多个mongoose文档甚至是普通对象（比如mapReduce输出），我们可以使用mongoose > = 3.6中 提供的Model.populate（）方法填充它们。这是填充文档的用途document#populate() 和query#populate()用途。

#### Populating across multiple levels

假设您有一个跟踪用户朋友的用户架构。
```js
var userSchema = new Schema({
  name: String,
  friends: [{ type: ObjectId, ref: 'User' }]
});
```

Populate可以让你获得用户朋友的列表，但是如果你还想要用户的朋友朋友呢？指定populate选项以告诉mongoose填充friends所有用户朋友的数组：
```js
User.
  findOne({ name: 'Val' }).
  populate({
    path: 'friends',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'friends' }
  });
```
#### Populating across Databases
假设您有一个表示事件的模式，以及一个表示对话的模式。每个事件都有一个对应的会话线程。
```js

var eventSchema = new Schema({
  name: String,
  // The id of the corresponding conversation
  // Notice there's no ref here!
  conversation: ObjectId
});
var conversationSchema = new Schema({
  numMessages: Number
});
此外，假设事件和对话存储在单独的MongoDB实例中。

var db1 = mongoose.createConnection('localhost:27000/db1');
var db2 = mongoose.createConnection('localhost:27001/db2');

var Event = db1.model('Event', eventSchema);
var Conversation = db2.model('Conversation', conversationSchema);
```
在这种情况下，你会不会能够populate()正常进行。该conversation字段将始终为null，因为populate()不知道要使用哪个模型。但是， 您可以显式指定模型。

```js

Event.
  find().
  populate({ path: 'conversation', model: Conversation }).
  exec(function(error, docs) { /* ... */ });

```
这被称为“跨数据库填充”，因为它使您能够跨MongoDB数据库填充，甚至跨MongoDB实例填充。

#### Dynamic References via `refPath`

Mongoose还可以根据文档中属性的值从多个集合中填充。假设您正在构建用于存储注释的模式。用户可以评论博客文章或产品。
```js

const commentSchema = new Schema({
  body: { type: String, required: true },
  on: {
    type: Schema.Types.ObjectId,
    required: true,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['BlogPost', 'Product']
  }
});

const Product = mongoose.model('Product', new Schema({ name: String }));
const BlogPost = mongoose.model('BlogPost', new Schema({ title: String }));
const Comment = mongoose.model('Comment', commentSchema);
```
该refPath选项是一种更复杂的替代方案ref。如果ref 只是一个字符串，Mongoose将始终查询相同的模型以查找填充的子文件。使用refPath，您可以配置Mongoose为每个文档使用的模型。
```js

const book = await Product.create({ name: 'The Count of Monte Cristo' });
const post = await BlogPost.create({ title: 'Top 10 French Novels' });

const commentOnBook = await Comment.create({
  body: 'Great read',
  on: book._id,
  onModel: 'Product'
});

const commentOnPost = await Comment.create({
  body: 'Very informative',
  on: post._id,
  onModel: 'BlogPost'
});

// The below `populate()` works even though one comment references the
// 'Product' collection and the other references the 'BlogPost' collection.
const comments = await Comment.find().populate('on').sort({ body: 1 });
comments[0].on.name; // "The Count of Monte Cristo"
comments[1].on.title; // "Top 10 French Novels"
```
另一种方法是定义单独的blogPost和 product对性质commentSchema，然后populate()在这两个属性。
```js

const commentSchema = new Schema({
  body: { type: String, required: true },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  blogPost: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'BlogPost'
  }
});

// ...

// The below `populate()` is equivalent to the `refPath` approach, you
// just need to make sure you `populate()` both `product` and `blogPost`.
const comments = await Comment.find().
  populate('product').
  populate('blogPost').
  sort({ body: 1 });
comments[0].product.name; // "The Count of Monte Cristo"
comments[1].blogPost.title; // "Top 10 French Novels"
```

定义独立blogPost和product特性适用于这个简单的例子。但是，如果您决定允许用户也对文章或其他注释发表评论，则需要向架构添加更多属性。populate()除非你使用mongoose-autopopulate，否则你还需要额外调用每个属性 。使用refPath意味着您只需要2个架构路径和一个populate()调用，无论您commentSchema可以指向多少个模型。

#### Populate Virtuals
到目前为止，您只根据该_id字段进行了填充。但是，这有时不是正确的选择。特别是，无限制增长的数组是MongoDB反模式。使用mongoose虚拟，您可以在文档之间定义更复杂的关系。
```js

const PersonSchema = new Schema({
  name: String,
  band: String
});

const BandSchema = new Schema({
  name: String
});
BandSchema.virtual('members', {
  ref: 'Person', // The model to use
  localField: 'name', // Find people where `localField`
  foreignField: 'band', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

const Person = mongoose.model('Person', PersonSchema);
const Band = mongoose.model('Band', BandSchema);

/**
 * Suppose you have 2 bands: "Guns N' Roses" and "Motley Crue"
 * And 4 people: "Axl Rose" and "Slash" with "Guns N' Roses", and
 * "Vince Neil" and "Nikki Sixx" with "Motley Crue"
 */
Band.find({}).populate('members').exec(function(error, bands) {
  /* `bands.members` is now an array of instances of `Person` */
});
```
请记住，默认情况下，虚拟输出不包含在toJSON()输出中。如果要在使用依赖JSON.stringify()的res.json()函数（如Express' 函数）时显示填充虚拟，请virtuals: true在架构选项上设置toJSON选项。
```js

// Set `virtuals: true` so `res.json()` works
const BandSchema = new Schema({
  name: String
}, { toJSON: { virtuals: true } });
如果您使用填充投影，请确保foreignField包含在投影中。

Band.
  find({}).
  populate({ path: 'members', select: 'name' }).
  exec(function(error, bands) {
    // Won't work, foreign field `band` is not selected in the projection
  });

Band.
  find({}).
  populate({ path: 'members', select: 'name band' }).
  exec(function(error, bands) {
    // Works, foreign field `band` is selected
  });
```
#### Populate Virtuals: The Count Option
填充虚拟还支持计算匹配文档的数量，foreignField而不是文档本身。count在虚拟上设置 选项：
```js

const PersonSchema = new Schema({
  name: String,
  band: String
});

const BandSchema = new Schema({
  name: String
});
BandSchema.virtual('numMembers', {
  ref: 'Person', // The model to use
  localField: 'name', // Find people where `localField`
  foreignField: 'band', // is equal to `foreignField`
  count: true // And only get the number of docs
});

// Later
const doc = await Band.findOne({ name: 'Motley Crue' }).
  populate('numMembers');
doc.numMembers; // 2
```
#### Populate in Middleware
您可以填充前钩或后挂钩。如果您想要始终填充某个字段，请查看mongoose-autopopulate插件。
```js

// Always attach `populate()` to `find()` calls
MySchema.pre('find', function() {
  this.populate('user');
});
// Always `populate()` after `find()` calls. Useful if you want to selectively populate
// based on the docs found.
MySchema.post('find', async function(docs) {
  for (let doc of docs) {
    if (doc.isPublic) {
      await doc.populate('user').execPopulate();
    }
  }
});
// `populate()` after saving. Useful for sending populated data back to the client in an
// update API endpoint
MySchema.post('save', function(doc, next) {
  doc.populate('user').execPopulate().then(function() {
    next();
  });
});
```
## bug

```
feihong@iZuf69ng9hibpqjrdkb660Z:~$ mongo
MongoDB shell version v4.0.6
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
2019-06-27T14:05:09.173+0800 E QUERY    [js] Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed: SocketException: Error connecting to 127.0.0.1:27017 :: caused by :: Connection refused :
connect@src/mongo/shell/mongo.js:343:13
@(connect):1:6
exception: connect failed
```

解决方案
有些系统在机器启动时没有自动运行mongo服务。所以你需要手动启动它。

运行此命令以在每次启动计算机时或每次要使用mongo时运行服务
```
sudo service mongod start
// or 
sudo systemctl start mongod
```


### mongo后台运行
--fork 赋值进程，node的守护进程
```
mongod -f /etc/mongod.conf --fork
```

### MongoDB将字段插入集合中的所有文档
```
> show collections
companies
monitors
pipelines
pipelinestates
probes
system.indexes


> db.monitors.update({},{$set:{"pipelineId": "5d834e6c0c8e9f276745ded0"}},{multi:true})
WriteResult({ "nMatched" : 16609, "nUpserted" : 0, "nModified" : 16609 })
```
将"pipelineId": "5d834e6c0c8e9f276745ded0"插入所有文档中
结果如下

```
[
    {
        "_id": "5d7f3b89a0c62d65009c2ca9",
        "timestamp": "2019-09-16T07:36:37.220Z",
        "probeNo": "AA02",
        "dataType": "counter",
        "value": {
            "repeatedCounting": 219,
            "defectiveNumber": 304,
            "productionQuantity": 223
        },
        "monitorNo": "CC01",
        "createdAt": "2019-09-16T07:36:41.170Z",
        "updatedAt": "2019-09-16T07:36:41.170Z",
        "__v": 0,
        "pipelineId": "5d834e6c0c8e9f276745ded0"
    },
……
]
```
## 参考文献
[MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

[MongoDB 导入Json和Bson](https://app.csdn.net/lwc5411117/article/details/79675326)

[node-express项目的搭建并通过mongoose操作MongoDB实现增删改查分页排序（四）](https://www.cnblogs.com/wangmaoling/p/10339222.html)

[Studio 3T下操作MongoDB的基本命令](https://www.jianshu.com/p/577cb638787c)

[mongo的安装和运行](https://blog.csdn.net/qq_39729527/article/details/81285072)

[Not able to run Mongodb on ubuntu](https://vispud.blogspot.com/2019/02/not-able-to-run-mongodb-on-ubuntu.html)

[passport+express+mongoose纯干货手打教程+简单项目框架](https://www.jianshu.com/p/a222ad8db47d)

[formidable](https://www.npmjs.com/package/formidable)

[Passport-Local Mongoose](https://www.npmjs.com/package/passport-local-mongoose)

[[NodeJS] Mongoose Populate 基本使用](https://blog.csdn.net/elliott_yoho/article/details/53537147)

[Mongoose 之 Population 使用](https://segmentfault.com/a/1190000002727265)

[Populate](https://mongoosejs.com/docs/populate.html)

[mongoose populate 根据关联表中的字段排序](https://blog.csdn.net/younglao/article/details/81540853)



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>