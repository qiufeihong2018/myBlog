// 监听安装事件，install 事件一般是被用来设置你的浏览器的离线缓存逻辑
self.addEventListener('install', (event) => {
    console.log(`service worker 安装成功`)
    // 通过这个方法可以防止缓存未完成，就关闭serviceWorker
    event.waitUntil(
      // 创建一个名叫V1的缓存版本 
      caches.open('v1').then((cache) => {
        // 指定要缓存的内容，地址为相对于跟域名的访问路径
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/app.js',
          '/image-list.js',
          '/assets/woman1.jpg',
          '/assets/woman2.jpg',
          '/assets/woman3.jpg',
          '/assets/woman4.jpg',
          '/assets/woman5.jpg'
        ]);
      })
    );
  });
  self.addEventListener('activate', () => {
    console.log(`service worker 激活成功`)
  })
  /**
   * 注册 fetch 一共做了3件事：
   * 1. 拦截全站的请求
   * 2. 在缓存中搜索匹配到对应的请求资源，如果有就直接返回
   * 3. 如果没有缓存，发起请求，响应的结果放入缓存，以便下次使用，最后返回结果
   */
  self.addEventListener('fetch', (event) => {
    console.log(`service worker 拦截请求`)
    // 在缓存中匹配对应请求资源直接返回
    event.respondWith(caches.match(event.request).then((response) => {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then((response) => {
          // 当我们需要保存克隆时，将一个副本放到缓存中，以服务于第二个副本
          let responseClone = response.clone();
          // 创建一个名叫V1的缓存版本
          caches.open('v1').then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(() => {
          return caches.match('/assets/woman1.jpg');
        });
      }
    }));
  });
  