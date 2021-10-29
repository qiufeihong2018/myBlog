// 注册 service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function (reg) {

    if (reg.installing) {
      console.log('Service worker installing');
    } else if (reg.waiting) {
      console.log('Service worker installed');
    } else if (reg.active) {
      console.log('Service worker active');
    }

  }).catch(function (error) {
    // 注册失败
    console.log('Registration failed with ' + error);
  });
}
/**
 * 通过 XHR 加载每一张图片
 * @param {*} img 每张图片的列表信息
 * @returns 
 */
function loadImg(img) {
  // 返回图片加载的 promise
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    // 此时url（assets/myLittleVader.jpg）是一个相对位置
    request.open('GET', img.url);
    // blob模式相应数据
    request.responseType = 'blob';

    request.onload = () => {
      if (request.status == 200) {
        var arr = [];
        // 图片信息
        arr[0] = request.response;
        // 每张图片的列表信息
        arr[1] = img;
        resolve(arr);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function () {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}

// 获取被挂载的父节点
var imgContainer = document.getElementsByClassName('image-container')

/**
 * 网页加载完毕后执行图片请求并且挂载操作
 * 设置属性 src、alt
 */
window.onload = () => {

  for (var i = 0; i <= assets.images.length - 1; i++) {
    loadImg(assets.images[i]).then((res) => {
      var img = document.createElement('img');
      var figure = document.createElement('figure');
      var caption = document.createElement('caption');
      var imageURL = window.URL.createObjectURL(res[0]);
      img.src = imageURL;
      img.setAttribute('alt', res[1].alt);
      caption.innerHTML = '<h2>' + res[1].name + '</h2>'
      imgContainer[0].appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(caption);
    }, function (Error) {
      console.log(Error);
    });
  }
};