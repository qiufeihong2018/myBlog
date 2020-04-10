#【运维】浅谈redash
[github地址](https://github.com/getredash/redash)

[http://redash.io/](http://redash.io/)

让你的公司数据驱动。连接到任何数据源，轻松可视化，仪表板和共享您的数据。

`Redash`是我们在公司内部以一种更适合我们的文化和使用模式的方式释放数据的方式。

在`Redash`之前，我们尝试使用传统的`BI`套件，并发现了一组膨胀的、技术上有挑战的、缓慢的工具/流。我们寻找的是一种更像黑客的方式来看待数据，所以我们做了一个。

`Redash`的建立是为了方便快捷地访问数十亿条记录，我们使用`Amazon Redshift`(“`pb`级数据仓库”，“讲”`PostgreSQL`)来处理和收集这些记录。今天，`Redash`支持查询多个数据库，包括:`Redshift`，`Google BigQuery`, `PostgreSQL`, `MySQL，Graphite`，`Presto`，`Google Spreadsheets`，`Cloudera Impala`, `Hive`和自定义脚本。

`Redash`由两部分组成:
1. 查询编辑：想想为了`SQL`查询的`JS Fiddle`。通过共享数据集和生成数据集的查询，您可以以开放的方式共享组织中的数据。通过这种方式，每个人不仅可以对结果数据集进行同行评审，还可以对生成数据集的过程进行同行评审。也可以派生它，生成新的数据集并获得新的见解。
2. 可视化和仪表板:有了数据集之后，就可以从中创建不同的可视化，然后将多个可视化合并到一个仪表板中。目前，`Redash`支持图表、数据透视表、队列等。


## Redash的项目结构
我分析的是`Redash`的`master`分支。

`Redash`包含了前端、后端、测试和运维等等。



