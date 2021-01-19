# 【Github】log4js-node说明文档
[![Build Status](https://secure.travis-ci.org/log4js-node/log4js-node.png?branch=master)](http://travis-ci.org/log4js-node/log4js-node) [![codecov](https://codecov.io/gh/log4js-node/log4js-node/branch/master/graph/badge.svg)](https://codecov.io/gh/log4js-node/log4js-node)

[![NPM](https://nodei.co/npm/log4js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/log4js/)


这是[log4js](https://github.com/stritti/log4js)的转换
使用 [node](http://nodejs.org)的框架。我一开始只是剥离了特定于浏览器的代码，并整理了一些javascript，以便更好地在node中工作。它从那里开始成长。尽管它的名称与Java库 [log4j](https://logging.apache.org/log4j/2.x/), 类似，但认为它的行为方式相同只会给您带来痛苦和困惑。

可以获得完整的文档 [here](https://log4js-node.github.io/log4js-node/).

[Changes in version 3.x](https://log4js-node.github.io/log4js-node/v3-changes.md)

There have been a few changes between log4js 1.x and 2.x (and 0.x too). 如果出现问题，您可能应该阅读此 [migration guide](https://log4js-node.github.io/log4js-node/migration-guide.html)。

开箱即用它支持以下功能:

- 彩色控制台登录到标准输出或标准derr
- 文件追加器，具有基于文件大小或日期的可配置日志滚动
- 一个用于连接/快速服务器的日志记录器
- 可配置的日志消息布局/模式
- 不同的日志类别有不同的日志级别(将应用程序的某些部分作为调试日志，其他部分仅作为错误日志，等等)。

可选的附加程序可用:

- [SMTP](https://github.com/log4js-node/smtp)
- [GELF](https://github.com/log4js-node/gelf)
- [Loggly](https://github.com/log4js-node/loggly)
- Logstash ([UDP](https://github.com/log4js-node/logstashUDP) and [HTTP](https://github.com/log4js-node/logstashHTTP))
- logFaces ([UDP](https://github.com/log4js-node/logFaces-UDP) and [HTTP](https://github.com/log4js-node/logFaces-HTTP))
- [RabbitMQ](https://github.com/log4js-node/rabbitmq)
- [Redis](https://github.com/log4js-node/redis)
- [Hipchat](https://github.com/log4js-node/hipchat)
- [Slack](https://github.com/log4js-node/slack)
- [mailgun](https://github.com/log4js-node/mailgun)
- [InfluxDB](https://github.com/rnd-debug/log4js-influxdb-appender)

## Getting help

Having problems? Jump on the [slack](https://join.slack.com/t/log4js-node/shared_invite/enQtODkzMDQ3MzExMDczLWUzZmY0MmI0YWI1ZjFhODY0YjI0YmU1N2U5ZTRkOTYyYzg3MjY5NWI4M2FjZThjYjdiOGM0NjU2NzBmYTJjOGI) channel, or create an issue. If you want to help out with the development, the slack channel is a good place to go as well.

## installation

```bash
npm install log4js
```

## usage

Minimalist version:

```javascript
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";
logger.debug("Some debug messages");
```

默认情况下，log4js不会输出任何日志(以便它可以安全地在库中使用)默认类别的级别设置为OFF。 要启用日志，请设置级别(如示例所示)。这将输出到标准输出与彩色布局(感谢masylum)，所以以上你会看到:

```bash
[2010-01-17 11:43:37.987] [DEBUG] [default] - Some debug messages
```

See example.js for a full example, but here's a snippet (also in `examples/fromreadme.js`):

```javascript
const log4js = require("log4js");
log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});

const logger = log4js.getLogger("cheese");
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");
```

Output (in `cheese.log`):

```bash
[2010-01-17 11:43:37.987] [ERROR] cheese - Cheese is too ripe!
[2010-01-17 11:43:37.990] [FATAL] cheese - Cheese was breeding ground for listeria.
```

## 库创建人员注意事项

果您正在编写一个库，并且希望包含对log4js的支持，而又不给您的用户带来依赖问题，那么请参阅本文 [log4js-api](https://github.com/log4js-node/log4js-api).

## Documentation

Available [here](https://log4js-node.github.io/log4js-node/).

There's also [an example application](https://github.com/log4js-node/log4js-example).

## TypeScript

```ts
import { configure, getLogger } from "log4js";
configure("./filename");
const logger = getLogger();
logger.level = "debug";
logger.debug("Some debug messages");

configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});
```


- appenders (object) -  type.命名appender(字符串)到appender定义(对象)的映射;appender定义必须有一个属性(string)—其他属性依赖于appender类型。

- categories (object) - 已命名类别(字符串)到类别定义(对象)的映射。必须定义默认类别，该类别用于与特定类别不匹配的所有日志事件。类别定义有两个属性:
   - appenders (array of strings) - the list of appender names to be used for this category. A category must have at least one appender.
   - level (string, case insensitive) - the minimum log level that this category will send to the appenders. For example, if set to ‘error’ then the appenders will only receive log events of level ‘error’, ‘fatal’, ‘mark’ - log events of ‘info’, ‘warn’, ‘debug’, or ‘trace’ will be ignored.
   - enableCallStack (boolean, optional, defaults to false) - setting this to true will make log events for this category use the call stack to generate line numbers and file names in the event. See pattern layout for how to output these values in your appenders.