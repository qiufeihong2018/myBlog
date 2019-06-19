# express从入门到放弃

## Passport-Local Mongoose
Passport Local Mongoose是一个Mongoose插件，它简化了使用Passport建立用户名和密码登录的过程。

### 教程
Michael Herman在他的博客post user authentication with passport.js中给出了一个简单易懂的步骤，用于设置mongoose、passport、passport local和passport local mongoose进行用户身份验证。

### 安装
```bash
npm install passport-local-mongoose
```

Passport Local Mongoose不直接要求Passport、Passport Local或Mongoose依赖项，但希望您安装这些依赖项。
如果需要安装整个依赖项集

```bash
npm install passport passport-local mongoose passport-local-mongoose --save
```

### 用法
#### 插件Passport本地Mongoose
首先，您需要将Passport本地Mongoose插入到您的用户模式中。

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
 
const User = new Schema({});
 
User.plugin(passportLocalMongoose);
 
module.exports = mongoose.model('User', User);
```
你可以自由地定义你的用户。passport local mongoose将添加一个用户名、哈希和salt字段来存储用户名、哈希密码和salt值。
此外，passport local mongoose还为您的模式添加了一些方法。有关更多详细信息，请参阅API文档部分。

#### 配置本地Passport/Passport
您应该按照Passport指南中的描述在本地配置Passport/Passport。
passport local mongoose通过实现localstrategy和serializeuser/deserializeuser函数来支持此设置。
要设置Passport本地Mongoose，请使用此代码
```javascript
// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/user');
 
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
 
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

确保有一个Mongoose连接到MongoDB，然后就完成了。
#### 简化的护照/护照本地配置
从0.2.1版passport local mongoose开始，将helper方法createstategy作为静态方法添加到您的模式中。CreateStegy负责使用正确的选项设置Passport本地本地策略。
```javascript
const User = require('./models/user');
 
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```
此功能的原因是，当使用用户名字段选项指定其他用户名字段名称（例如“email”passport local）时，仍然希望前端登录表单包含名为“username”而不是电子邮件的输入字段。这可以配置为本地Passport，但这是工作的两倍。所以我们实现了这个快捷方式。

#### 异步/等待
从5.0.0版开始，passport local mongoose通过返回除serializeuser和deserializeuser之外的所有实例和静态方法的承诺来实现异步/等待。
```javascript
const user = new DefaultUser({username: 'user'});
await user.setPassword('password');
await user.save();
const { user } = await DefaultUser.authenticate()('user', 'password');
```

#### 选项
插入Passport本地Mongoose插件时，可以提供其他选项来配置哈希算法。

```javascript
User.plugin(passportLocalMongoose, options);
```

Main Options

saltlen：以字节为单位指定salt长度。默认值：32
迭代次数：指定pbkdf2哈希算法中使用的迭代次数。默认值：25000
keylen：指定生成的密钥的长度（以字节为单位）。默认值：512
DigestAlgorithm：指定PBKDF2摘要算法。默认值：sha256。（获取crypto.gethashes（）支持的算法列表）
interval：指定登录尝试之间的间隔（以毫秒为单位），该间隔根据失败的尝试次数以指数形式增加，直到maxinterval。默认值：100
MaxInterval：指定可以锁定帐户的最长时间。默认30000（5分钟）
用户名字段：指定保存用户名的字段名。默认为“用户名”。如果要使用其他字段保存用户名，例如“email”，则可以使用此选项。
username unique：指定是否应通过MongoDB索引强制username字段为唯一字段。默认为true。
salt field：指定保存salt值的字段名。默认为“salt”。
hash field：指定保存密码哈希值的字段名。默认为“hash”。
attemptsfield：指定自上次成功登录以来保存登录失败次数的字段名。默认为“尝试”。
last login field：指定保存上次登录尝试时间戳的字段名。默认为“last”。
selectfields：指定要从MongoDB中选择（并存储在会话中）的模型字段。默认为“未定义”，以便选择模型的所有字段。
用户名小写：保存查询时将用户名字段值转换为小写。默认为“false”。
PopulateFields：指定要在findbyusername函数中填充的字段。默认为“未定义”。
编码：指定生成的salt和散列将存储在其中的编码。默认为“hex”。
limittents：指定是否应限制登录尝试，并处罚登录失败。默认值：假。
maxattempts：指定阻止登录前允许的最大失败尝试次数。默认值：无穷大。
密码验证程序：以“函数（密码，cb）”的形式指定密码的自定义验证函数。默认：验证非空密码。
UsernameQueryFields：指定用于标识用户的模型的可选字段（例如电子邮件）。
findbyusername：指定使用查询参数执行的查询函数，以使用额外的查询参数限制查询。例如，仅查询字段“active”设置为true的用户。默认值：函数（model，queryparameters）返回model.findone（queryparameters）；。有关用例，请参见示例部分。

注意！在生产环境中更改任何哈希选项（saltlen、迭代或keylen）都将阻止现有用户进行身份验证！
### API 文档

### 例子
插入passport local mongoose时，我们将username unique设置为避免在字段username上创建唯一的mongodb索引。为了避免MongoDB查询非活动用户，我们可以指定findbyusername选项，该选项允许我们限制查询。在我们的示例中，我们希望将查询限制为仅查询字段活动设置为true的用户。findbyusername必须返回Mongoose查询。
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
要测试实现，我们只需创建（注册）一个字段active设置为false的用户，然后在第二步中尝试对该用户进行身份验证：
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
## 参考文献
[passport+express+mongoose纯干货手打教程+简单项目框架](https://www.jianshu.com/p/a222ad8db47d)