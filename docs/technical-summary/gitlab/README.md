
更改备份路径
```bash
 sudo vim /etc/gitlab/gitlab.rb
```

将备份路径改为/data/gitlab/backups
```bash
gitlab_rails['backup_path']="/data/gitlab/backups"
```
修改完成之后使用下面命令重载配置文件即可
```bash
gitlab-ctl reconfigure
```

现将原服务器上的gitlab进行备份
```bash
sudo gitlab-rake gitlab:backup:create
```
结果：
```bash
Dumping database ... 

Dumping PostgreSQL database gitlabhq_production ... [DONE]

done

Dumping repositories ...

 * root/welcome ... [DONE]

 * root/welcome.wiki ...  [SKIPPED]

 * dhb/xAlert-data ... [DONE]

 * dhb/xAlert-data.wiki ...  [SKIPPED]

 * root/xAlert-ntopng ... [DONE]

 * root/xAlert-ntopng.wiki ...  [SKIPPED]

 * root/erlangshen-web ... [DONE]

 * root/erlangshen-web.wiki ...  [SKIPPED]

 * xAlert/xAlert-web ... [DONE]

 * xAlert/xAlert-web.wiki ...  [SKIPPED]

		

			 * root/xAlert-scripts ... 
		

		

			......
		

		

			[DISABLED]

Creating backup archive: 1557975676_2019_05_16_10.7.2-ee_gitlab_backup.tar ... done

Uploading backup archive to remote storage  ... skipped

Deleting tmp directories ... done

done

done

done

done

done

done

done

Deleting old backups ... done. (0 removed)

```			
内容很多很多
		

会产生类似于1557975676_2019_05_16_10.7.2-ee_gitlab_backup.tar，一般都是带上年月日，便于分别。


默认会放在/var/opt/gitlab/backups目录下，但是我们改了存放路径
	
		
		
			
然后就在这里找到备份文件
```bash 
gushenxing@ubuntu:/data/gitlab/backups$ ls

1557975676_2019_05_16_10.7.2-ee_gitlab_backup.tar

```				
将备份文件传送到新服务器
安装gitlab
			
下载安装包
			
[清华大学镜像源](https://mirrors.tuna.tsinghua.edu.cn/)
			
新旧服务器上的gitlab版本必须要一样
			

安装并且解压完后，开启配置
```bash				
sudo gitlab-ctl reconfigure
```				

从旧服务器上拷贝到新服务器上，放到其他目录都会报错，必须要放在tmp中
			

			
```bash
sudo scp 1557975676_2019_05_16_10.7.2-ee_gitlab_backup.tar system-backup@192.168.3.68:/tmp


system-backup@systembackup-System-Product-Name:/tmp$ ls

1557975676_2019_05_16_10.7.2-ee_gitlab_backup.tar

将tmp中的备份包放在/var/opt/gitlab中，放在非gitlab包中会
					

system-backup@systembackup-System-Product-Name:/home/data$ sudo gitlab-rake gitlab:backup:restore BACKUP=1557975676_2019_05_16_10.7.2-ee

The backup file 1557975676_2019_05_16_10.7.2-ee_gitlab_backup.tar does not exist!

出现报错
						
sudo cp 1557975676_2019_05_16_10.7.2-ee_gitlab_backup.tar /var/opt/gitlab

system-backup@systembackup-System-Product-Name:/var/opt/gitlab$ ls

						

1557975676_2019_05_16_10.7.2-ee_gitlab_backup.tar
						

```					

							

1、将备份文件权限修改为777
							

							

第一步，将备份文件权限修改为777，不然可能恢复的时候会出现权限不够，不能解压的问题
sudo chmod 777 1557975676_2019_05_16_10.7.2-ee_gitlab_backup.tar 
2、执行命令停止相关数据连接服务

第二步，执行命令停止相关数据连接服务

停止相关数据连接服务
```bash
gitlab-ctl stop unicorn
system-backup@systembackup-System-Product-Name:/var/opt/gitlab$ sudo gitlab-ctl stop unicorn

ok: down: unicorn: 1s, normally up
gitlab-ctl stop sidekiq
system-backup@systembackup-System-Product-Name:/var/opt/gitlab$ sudo gitlab-ctl stop sidekiq

ok: down: sidekiq: 0s, normally up
```

3、执行命令从备份文件中恢复Gitlab

第三步，执行命令从备份文件中恢复Gitlab
gitlab-rake gitlab:backup:restore BACKUP=备份文件编号
							
system-backup@systembackup-System-Product-Name:/var/opt/gitlab$ sudo gitlab-rake gitlab:backup:restore BACKUP=1557975676_2019_05_16_10.7.2-ee

					
第一个yes
```bash					

Unpacking backup ... done

Before restoring the database, we will remove all existing

tables to avoid future upgrade problems. Be aware that if you have

custom tables in the GitLab database these tables and all data will be

removed.





Do you want to continue (yes/no)? yes

....
ALTER TABLE

WARNING:  no privileges were granted for "public"

GRANT

[DONE]

done

Restoring repositories ...

 * root/welcome ... rake aborted!

GRPC::Unavailable: 14:Connect Failed

/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/gitaly_client.rb:134:in `call'

/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/gitaly_client/namespace_service.rb:35:in `gitaly_client_call'

/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/gitaly_client/namespace_service.rb:17:in `add'

/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/shell.rb:300:in `block in add_namespace'

/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/gitaly_client.rb:268:in `block (2 levels) in migrate'

/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/gitaly_client.rb:308:in `allow_n_plus_1_calls'

/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/gitaly_client.rb:261:in `block in migrate'

/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/metrics/influx_db.rb:98:in `measure'

/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/gitaly_client.rb:259:in `migrate'

/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/shell.rb:297:in `add_namespace'

/opt/gitlab/embedded/service/gitlab-rails/app/models/storage/legacy_project.rb:27:in `ensure_storage_path_exists'

/opt/gitlab/embedded/service/gitlab-rails/app/models/project.rb:54:in `ensure_storage_path_exists'

/opt/gitlab/embedded/service/gitlab-rails/lib/backup/repository.rb:95:in `block in restore'

/opt/gitlab/embedded/service/gitlab-rails/lib/backup/repository.rb:90:in `restore'

/opt/gitlab/embedded/service/gitlab-rails/lib/tasks/gitlab/backup.rake:89:in `block (4 levels) in <top (required)>'

/opt/gitlab/embedded/service/gitlab-rails/lib/tasks/gitlab/backup.rake:62:in `block (3 levels) in <top (required)>'

/opt/gitlab/embedded/bin/bundle:23:in `load'

/opt/gitlab/embedded/bin/bundle:23:in `<main>'

Tasks: TOP => gitlab:backup:repo:restore

(See full trace by running task with --trace)
```
						
4、执行命令从备份文件中恢复Gitlab
						
第四步，启动Gitlab
						
```bash

sudo gitlab-ctl start



					

ok: run: alertmanager: (pid 8340) 0s

ok: run: gitaly: (pid 8548) 0s

ok: run: gitlab-monitor: (pid 31471) 987s

ok: run: gitlab-workhorse: (pid 31476) 987s

ok: run: logrotate: (pid 31493) 986s

ok: run: nginx: (pid 31500) 986s

ok: run: node-exporter: (pid 31512) 986s

ok: run: postgres-exporter: (pid 31526) 985s

ok: run: postgresql: (pid 31538) 985s

ok: run: prometheus: (pid 8616) 0s

ok: run: redis: (pid 31553) 991s

ok: run: redis-exporter: (pid 31559) 991s

ok: run: sidekiq: (pid 8625) 1s

ok: run: unicorn: (pid 8633) 0s

					
命令：
sudo gitlab-ctl reconfigure使gitlab回到最初状态

				
system-backup@systembackup-System-Product-Name:/var/opt/gitlab$ sudo gitlab-ctl reconfigure

Starting Chef Client, version 13.6.4

resolving cookbooks for run list: ["gitlab-ee"]

Synchronizing Cookbooks:

  - gitlab-ee (0.0.1)

  - package (0.1.0)

  - gitlab (0.0.1)

  - consul (0.0.0)

  - repmgr (0.1.0)

  - runit (0.14.2)

  - postgresql (0.1.0)

  - mattermost (0.1.0)

  - registry (0.1.0)

  - gitaly (0.1.0)

  - letsencrypt (0.1.0)

  - nginx (0.1.0)

  - acme (3.1.0)

  - crond (0.1.0)

  - compat_resource (12.19.0)

					
......
					

Running handlers:

There was an error running gitlab-ctl reconfigure:





env_dir[/opt/gitlab/etc/gitaly] (gitaly::enable line 47) had an error: Errno::EISDIR: file[/opt/gitlab/etc/gitaly/env] (/opt/gitlab/embedded/cookbooks/cache/cookbooks/package/resources/env_dir.rb line 30) had an error: Errno::EISDIR: Is a directory - read





Running handlers complete

Chef Client failed. 2 resources updated in 07 seconds
```
					
# 参考文献

[Install ](https://about.gitlab.com/install/#ubuntu)

[ubuntu16.04中gitlab安装](https://blog.csdn.net/weixin_38883338/article/details/82153402)

[gitlab自动备份](https://www.jianshu.com/p/a176789fef21)

[【git学习】在CenterOS系统上恢复GitLab时出现错误：tar: 由于前次错误，将以上次的错误状态退出 unpacking backup failed](https://www.jianshu.com/p/8a287f31a646)

[如何查看 GitLab 版本号](https://blog.csdn.net/wo18237095579/article/details/81106150)

[Linux上Gitlab卸载](https://www.jianshu.com/p/e2e98c45c244)

[git学习------> Gitlab如何进行备份恢复与迁移？](https://blog.csdn.net/ouyang_peng/article/details/77070977)
