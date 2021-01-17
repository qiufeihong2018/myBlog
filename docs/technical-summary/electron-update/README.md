# Electron自动更新的研究
## 目录
### 一、	背景	3
### 二、	当前存在的问题	4
### 三、	自动更新的方案	4
#### (一)	Electron-builder搭配Electron-release-server	7
#### (二)	Electron-forge搭配nucleus	11
### 四、	打包的两种方式	11
#### (一)	Squirrel.Windows方式	11
#### (二)	Nsis方式	13
### 五、	开发中存在的问题	15
#### (一)	Can not find Squirrel	15
##### 1.	背景	15
##### 2.	分析	15
##### 3.	解决方案	17
#### (二)	安装目录中packages文件夹和Update.exe程序找不到	18
##### 1.	背景	18
##### 2.	解决方式	18
#### (三)	Error: spawn UNKNOWN	21
##### 1.	背景	21
##### 2.	原因分析	21
##### 3.	解决方式	22
#### (四)	Error Downloading Update: Command failed: 4294967295	24
##### 1.	背景	24
##### 2.	原因分析	24
##### 3.	解决方式	24
#### (五)	更新后，老版本没有被替换	24
##### 1.	背景	24
##### 2.	解决方案	25
#### (六)	Update.exe之外的操作无日志	28
##### 1.	背景	28
##### 2.	解决方案	28
