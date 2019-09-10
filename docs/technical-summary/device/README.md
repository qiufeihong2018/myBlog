#  no space left on device 解决磁盘空间
今天在检查gitlab备份情况时,发现scp过程中提示`no space left on device`,这意味着我安装着gitlab的服务器没有空间了

## 方法
```text
1. 使用命令 ： du -sh * 它用来查看文件或目录所占用的磁盘空间的大小。
2. 进入占用空间比较大的文件夹,删除
```
## 命令

选项|作用
--|--
-h|以K，M，G为单位，提高信息的可读性
-a|显示目录中个别文件的大小
-s|仅显示总计
-c| 除了显示个别目录或文件的大小外，同时也显示所有目录或文件的总和
-l|重复计算硬件连接的文件

## Linux下各个目录的作用及内容
首先你得知道linux每个目录下的作用和内容,你才可以删除文件

选项|作用
--|--
/bin|可执行二进制文件的目录，如常用的命令ls、tar、mv、cat等
/boot|放置linux系统启动时用到的一些文件。/boot/vmlinuz 为 linux 的内核文件，以及 /boot/gurb。建议单独分区，分区大小100M即可
/dev|存放linux系统下的设备文件，访问该目录下某个文件，相当于访问某个设备，常用的是挂载光驱 mount /dev/cdrom /mnt
/etc|系统配置文件存放的目录，不建议在此目录下存放可执行文件，重要的配置文件有 /etc/inittab、/etc/fstab、/etc/init.d、/etc/X11、/etc/sysconfig、/etc/xinetd.d修改配置文件之前记得备份
/home|系统默认的用户家目录，新增用户账号时，用户的家目录都存放在此目录下，~表示当前用户的家目录，~edu 表示用户 edu 的家目录。建议单独分区，并设置较大的磁盘空间，方便用户存放数据
/lib|系统使用的函数库的目录，程序在执行过程中，需要调用一些额外的参数时需要函数库的协助，比较重要的目录为 /lib/modules
/lost+fount|系统异常产生错误时，会将一些遗失的片段放置于此目录下，通常这个目录会自动出现在装置目录下。如加载硬盘于 /disk 中，此目录下就会自动产生目录 /disk/lost+found
/mnt: /media|光盘默认挂载点，通常光盘挂载于 /mnt/cdrom 下，也不一定，可以选择任意位置进行挂载
/opt|给主机额外安装软件所摆放的目录。如：FC4使用的Fedora 社群开发软件，如果想要自行安装新的 KDE 桌面软件，可以将该软件安装在该目录下。以前的 Linux 系统中，习惯放置在 /usr/local 目录下
/proc|此目录的数据都在内存中，如系统核心，外部设备，网络状态，由于数据都存放于内存中，所以不占用磁盘空间，比较重要的目录有 /proc/cpuinfo、/proc/interrupts、/proc/dma、/proc/ioports、/proc/net/* 等
/root|系统管理员root的家目录，系统第一个启动的分区为 /，所以最好将 /root和 /放置在一个分区下
/sbin|放置系统管理员使用的可执行命令，如fdisk、shutdown、mount 等。与 /bin 不同的是，这几个目录是给系统管理员 root使用的命令，一般用户只能"查看"而不能设置和使用
/tmp|一般用户或正在执行的程序临时存放文件的目录,任何人都可以访问,重要数据不可放置在此目录下
/srv|服务启动之后需要访问的数据目录，如 www 服务需要访问的网页数据存放在 /srv/www 内
/usr|应用程序存放目录，/usr/bin 存放应用程序，/usr/share 存放共享数据，/usr/lib 存放不能直接运行的，却是许多程序运行所必需的一些函数库文件。/usr/local: 存放软件升级包。/usr/share/doc: 系统说明文件存放目录。/usr/share/man: 程序说明文件存放目录，使用 man ls 时会查询 /usr/share/man/man1/ls.1.gz 的内容建议单独分区，设置较大的磁盘空间
/var|放置系统执行过程中经常变化的文件，如随时更改的日志文件 /var/log，/var/log/message：所有的登录文件存放目录，/var/spool/mail：邮件存放的目录，/var/run:程序或服务启动后，其PID存放在该目录下。建议单独分区，设置较大的磁盘空间

 
## 排查
既然出现了问题,那么就要去解决

```bash {5}
gitlab-backup@gitlabbackup-System-Product-Name:~$ df -h
文件系统        容量  已用  可用 已用% 挂载点
udev            3.9G     0  3.9G    0% /dev
tmpfs           785M  9.4M  776M    2% /run
/dev/sda1       103G   93G  4.5G   96% /
tmpfs           3.9G  192K  3.9G    1% /dev/shm
tmpfs           5.0M  4.0K  5.0M    1% /run/lock
tmpfs           3.9G     0  3.9G    0% /sys/fs/cgroup
tmpfs           785M   32K  785M    1% /run/user/108
tmpfs           785M     0  785M    0% /run/user/1000

```
进入var目录下,查看每个子目录的大小,发现是仅仅是opt就占有了72G
```bash {12}
gitlab-backup@gitlabbackup-System-Product-Name:/var$ sudo du -sh *
[sudo] gitlab-backup 的密码： 
4.8M	backups
576M	cache
4.0K	crash
295M	lib
4.0K	local
0	lock
41M	log
4.0K	mail
4.0K	metrics
72G	opt
0	run
4.0K	snap
52K	spool
68K	tmp

```
进入opt/gitlab目录下,查看每个子目录的大小,发现backups就占有了66G
```bash {8}
gitlab-backup@gitlabbackup-System-Product-Name:/var$ cd opt/
gitlab-backup@gitlabbackup-System-Product-Name:/var/opt$ sudo du -sh *
72G	gitlab
gitlab-backup@gitlabbackup-System-Product-Name:/var/opt$ cd gitlab/
gitlab-backup@gitlabbackup-System-Product-Name:/var/opt/gitlab$ sudo du -sh *
4.0K	auto_recovery_backup.sh
4.0K	auto_remove_backup.sh
66G	backups
4.0K	bootstrapped
8.0K	gitaly
6.1G	git-data
8.0K	gitlab-ci
8.0K	gitlab-monitor
5.9M	gitlab-rails
8.0K	gitlab-shell
12K	gitlab-workhorse
8.0K	log
40K	logrotate
48K	nginx
8.0K	node-exporter
12K	postgres-exporter
265M	postgresql
126M	prometheus
4.0K	public_attributes.json
124K	redis
4.0K	trusted-certs-directory-hash
```
进入backups目录下,查看每个子目录的大小,发现tmp就占有了60G,其中`1560290789_2019_06_12_10.7.2-ee_gitlab_backup.tar`是备份包
```bash
gitlab-backup@gitlabbackup-System-Product-Name:/var/opt/gitlab/backups$ sudo du -sh *
6.2G	1560290789_2019_06_12_10.7.2-ee_gitlab_backup.tar
112K	log
60G	tmp
```
进入tmp目录下,发现`default-repositories`好多好大

```bash
gitlab-backup@gitlabbackup-System-Product-Name:/var/opt/gitlab/backups/tmp$ sudo du -sh *
4.0K	artifacts.1558513269
4.0K	artifacts.1559544302
4.0K	artifacts.1559545677
4.0K	artifacts.1559551247
4.0K	artifacts.1559552081
4.0K	artifacts.1559552605
4.0K	artifacts.1559553987
4.0K	artifacts.1559644786
4.0K	artifacts.1559869515
4.0K	artifacts.1560131969
4.0K	artifacts.1560307146
4.0K	builds.1558513269
4.0K	builds.1559544302
4.0K	builds.1559545677
4.0K	builds.1559551247
4.0K	builds.1559552081
4.0K	builds.1559552605
4.0K	builds.1559553987
4.0K	builds.1559644786
4.0K	builds.1559869515
4.0K	builds.1560131969
4.0K	builds.1560307146
4.0K	default-repositories.old.1558513131
6.1G	default-repositories.old.1559544154
6.1G	default-repositories.old.1559545520
6.1G	default-repositories.old.1559551023
6.1G	default-repositories.old.1559551872
6.1G	default-repositories.old.1559552402
6.1G	default-repositories.old.1559553774
6.1G	default-repositories.old.1559644571
6.1G	default-repositories.old.1559869258
4.7G	default-repositories.old.1560131753
6.1G	default-repositories.old.1560218544
33M	default-repositories.old.1560306929，QCON，云栖社区，腾讯云，架构分享资料

4.0K	lfs.1558513269
4.0K	lfs.1559544302
4.0K	lfs.1559545677
4.0K	lfs.1559551247
4.0K	lfs.1559552081
4.0K	lfs.1559552605
4.0K	lfs.1559553987
4.0K	lfs.1559644786
4.0K	lfs.1559869515
4.0K	lfs.1560131969
4.0K	lfs.1560307146
4.0K	pages.1558513269
8.0K	pages.1559544302
8.0K	pages.1559545677
8.0K	pages.1559551247
8.0K	pages.1559552081
8.0K	pages.1559552605
8.0K	pages.1559553987
8.0K	pages.1559644786
8.0K	pages.1559869515
8.0K	pages.1560131969
8.0K	pages.1560307146
4.0K	uploads.1558513269
5.7M	uploads.1559544302
5.7M	uploads.1559545677
5.7M	uploads.1559551247
5.7M	uploads.1559552081
5.7M	uploads.1559552605
5.7M	uploads.1559553987
5.7M	uploads.1559644786
5.7M	uploads.1559869515
5.7M	uploads.1560131969
5.7M	uploads.1560307146

```
鉴于tmp存放的临时文件,那么就乖乖放进垃圾箱中吧,给gitlab腾位子
```bash
sudo rm -rf tmp
```
避免gitlab恢复过程产生tmp,就写个定时删除tmp的命令
```bash
# 仇飞鸿编辑于2019-6-12 添加定时任务，每天上午10点,自动删除var/opt/gitlab/backups/tmp
0  10   * * *   root    rm -rf /var/opt/gitlab/backups/tmp

```
大功告成

## 参考文献
[Linux 下各个目录的作用及内容](https://www.cnblogs.com/sytfyf/p/6364691.html)

[no space left on device 磁盘空间不足原因及排查方法](https://blog.csdn.net/jiedao_liyk/article/details/78497625)

[Linux du命令](https://www.runoob.com/linux/linux-comm-du.html)

最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>