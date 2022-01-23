# windows常见问题
## 怎么禁止Windows10自动下载小游戏及安装软件

1. 在Windows10系统下，按住电脑键盘上的win+r
2. 在打开的运行对话框中输入入regedit，回车打开注册表编辑器
3. 在地址栏输入：，计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows，回车
4. 右击windows，指向新建，点击项，命名CloudContent
5. 点击CloudContent，右击右侧，新建DWORD（32位）值
6. 命名DisableWindowsConsumerFeatures，值更改为1，回车即可，这样就可以禁止Windows10自动下载小游戏及安装软件


https://xinzhi.wenda.so.com/a/1540695455206610