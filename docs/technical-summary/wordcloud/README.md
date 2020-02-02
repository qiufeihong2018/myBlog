# Python绘制实时疫情词云
> “词云”这个概念由美国西北大学新闻学副教授里奇·戈登（Rich Gordon）于提出。戈登做过编辑、记者，曾担任迈阿密先驱报（Miami Herald）新媒体版的主任。他一直很关注网络内容发布的最新形式——即那些只有互联网可以采用而报纸、广播、电视等其它媒体都望尘莫及的传播方式。通常，这些最新的、最适合网络的传播方式，也是最好的传播方式。 因此，“词云”就是通过形成“关键词云层”或“关键词渲染”，对网络文本中出现频率较高的“关键词”的视觉上的突出。
>词云图过滤掉大量的文本信息，使浏览网页者只要一眼扫过文本就可以领略文本的主旨。

## 读取文件
比如说，我从[疫情](https://ncov.dxy.cn/ncovh5/view/pneumonia_peopleapp?from=timeline&isappinstalled=0)网站复制下来的数据将其绘制成词云。
文本如下：
```text
病毒: 新型冠状病毒 2019-nCoV

传染源: 野生动物，可能为中华菊头蝠

传播途径: 经呼吸道飞沫传播，亦可通过接触传播，存在粪-口传播可能性

易感人群：人群普遍易感。老年人及有基础疾病者感染后病情较重，儿童及婴幼儿也有发病

潜伏期：一般为 3～7 天，最长不超过 14 天，潜伏期内存在传染性
```
第一步当然是将数据保存在本地，然后读取数据。
因为文件对象会占用操作系统的资源，所以文件读取完后必须要关闭。
因为文件读写时都有可能产生`IOError`,出错后就不会调用`close()`，所以保证程序正常运行，应该使用`try……finally`。
代码如下：
```py
try:
    fp=open("D:\\githubMe\\flask-tutorial\\doc\\coronavirus_data.txt",'r', encoding='UTF-8')
    text=fp.read()
    print(text)
finally:
    if fp:
        fp.close()
```
当然，`python`的`with`可以自动调用`close()`。
优化的代码如下：
```py
with open("D:\\githubMe\\flask-tutorial\\doc\\coronavirus_data.txt",'r', encoding='UTF-8') as fp:
    text=fp.read()
```
## 生成词云
想要生成词云，方式有很多，这里调用`wordcloud`包。
```
pip install WordCloud
```
其官网的[案例](https://amueller.github.io/word_cloud/auto_examples/index.html)。
导入`PIL`图片处理库，对图片进行保存。
```
pip install PIL
```
`PIL`已经是弃用了，所以可以安装新的 `PIL` `fork` 版的 `Pillow` 
```
pip install Pillow
```
```py
from wordcloud import WordCloud
import PIL .Image as image

with open("D:\\githubMe\\flask-tutorial\\doc\\coronavirus_data.txt",'r', encoding='UTF-8') as fp:
    text=fp.read()
    wordcloud=WordCloud().generate(text)
    word_image=wordcloud.to_image()
    word_image.save('coronavirus_test_1.png','png')
```
生成词云，但是图中出现中文乱码

![avatar](./coronavirus_test_1.png)

将全部中文内容换成英文，词云无乱码

![avatar](./coronavirus_test_2.png)

`wordcloud`默认是`DroidSansMono`。`window10`上没有该字体，所以要修改`font_path`来调整此路径。
我导入了系统自带的字体微软雅黑`msyh.ttc`。

![avatar](./wordcloud1.png)

将`font_path`指向字体的地址，代码如下：
```py
    wordcloud=WordCloud(font_path="D:\\githubMe\\flask-tutorial\\doc\\msyh.ttc").generate(text)
```
执行后生成的词云

![avatar](./coronavirus_test_3.png)

到这一步，基本的中文词云已经出现了，但是有些不是一个词，而是一句话，那怎么分词呢？
## 中文分词
这里就需要导入[`jieba`分词](https://github.com/fxsjy/jieba)
1. 支持四种分词模式：
精确模式，试图将句子最精确地切开，适合文本分析；
全模式，把句子中所有的可以成词的词语都扫描出来, 速度非常快，但是不能解决歧义；
搜索引擎模式，在精确模式的基础上，对长词再次切分，提高召回率，适合用于搜索引擎分词。
paddle模式，利用PaddlePaddle深度学习框架，训练序列标注（双向GRU）网络模型实现分词。同时支持词性标注。paddle模式使用需安装paddlepaddle-tiny，pip install paddlepaddle-tiny==1.6.1。目前paddle模式支持jieba v0.40及以上版本。jieba v0.40以下版本，请升级jieba，pip install jieba --upgrade 。PaddlePaddle官网
2. 支持繁体分词
3. 支持自定义词典

```
pip install jieba
```
代码如下：
```py
from wordcloud import WordCloud
import PIL .Image as image
import jieba

def participle_word(text):
    text_list=jieba.cut(text)
    res=' '.join(text_list)
    return res

with open("D:\\githubMe\\flask-tutorial\\doc\\coronavirus_data.txt",'r', encoding='UTF-8') as fp:
    text=fp.read()
    text=participle_word(text)
    wordcloud=WordCloud(font_path="D:\\githubMe\\flask-tutorial\\doc\\msyh.ttc").generate(text)
    word_image=wordcloud.to_image()
    word_image.save('coronavirus_test_4.png','png')
```

生成的中文分词词云如下：

![avatar](./coronavirus_test_4.png)

## 参考文献
[一步一步教你如何用Python做词云](https://www.cnblogs.com/ZaraNet/p/10136589.html)

[python制作词云，（中文乱码，图片小解决）](https://blog.csdn.net/hoojou/article/details/87627988)