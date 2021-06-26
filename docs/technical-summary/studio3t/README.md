# studio-3t
## 问题
### 启动Studio 3T发现30天试用已过期
解决办法：在任意目录下新建一个.bat文件，名字任意取，文件内容如下
```
@echo  off 
ECHO 重置Studio 3T的使用日期......
FOR /f "tokens=1,2,* " %%i IN ('reg query "HKEY_CURRENT_USER\Software\JavaSoft\Prefs\3t\mongochef\enterprise" ^| find /V "installation" ^| find /V "HKEY"') DO ECHO yes | reg add "HKEY_CURRENT_USER\Software\JavaSoft\Prefs\3t\mongochef\enterprise" /v %%i /t REG_SZ /d ""
ECHO 重置完成, 按任意键退出......
pause>nul
exit
```
运行即可破解
但破解是临时的，只是修改了使用时间而已，每次到期后运行这个文件又能试用了。