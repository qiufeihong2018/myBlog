# 【Github】three.js说明文档
========

[![NPM Package][npm]][npm-url]
[![Build Size][build-size]][build-size-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]
[![Dev Dependencies][dev-dependencies]][dev-dependencies-url]
[![Language Grade][lgtm]][lgtm-url]

#### JavaScript 3D 库 ####

这个项目的目的是用一个默认的WebGL渲染器创建一个易用的、轻量级的3D库。在示例中，该库还提供了Canvas 2D、SVG和CSS3D呈现器。

[例子](http://threejs.org/examples/) &mdash;
[文档](http://threejs.org/docs/) &mdash;
[Wiki](https://github.com/mrdoob/three.js/wiki) &mdash;
[迁移](https://github.com/mrdoob/three.js/wiki/Migration-Guide) &mdash;
[问题](http://stackoverflow.com/questions/tagged/three.js) &mdash;
[论坛](https://discourse.threejs.org/) &mdash;
[Slack](https://join.slack.com/t/threejs/shared_invite/enQtMzYxMzczODM2OTgxLTQ1YmY4YTQxOTFjNDAzYmQ4NjU2YzRhNzliY2RiNDEyYjU2MjhhODgyYWQ5Y2MyZTU3MWNkOGVmOGRhOTQzYTk) &mdash;
[Discord](https://discordapp.com/invite/HF4UdyF)

### 用法 ###

这段代码创建了一个场景、一个摄像机和一个几何立方体，并将该立方体添加到场景中。然后它为场景和相机创建一个 `WebGL`渲染器，并将该视口添加到 `document.body` 元素。 最后，它为摄像机在场景中创建立方体动画。

```javascript
import * as THREE from './js/three.module.js';

var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}
```

如果一切顺利，你应该看到 [这个](https://jsfiddle.net/8kubjpL5/).

### 克隆这个存储库 ###

复制repo和它的所有历史会导致下载2GB左右。如果你不需要整个历史记录，你可以使用 `depth` 参数来显著减少下载大小。
```sh
git clone --depth=1 https://github.com/mrdoob/three.js.git
```

### 变更日志 ###

[Releases](https://github.com/mrdoob/three.js/releases)


[npm]: https://img.shields.io/npm/v/three
[npm-url]: https://www.npmjs.com/package/three
[build-size]: https://badgen.net/bundlephobia/minzip/three
[build-size-url]: https://bundlephobia.com/result?p=three
[npm-downloads]: https://img.shields.io/npm/dw/three
[npmtrends-url]: https://www.npmtrends.com/three
[dev-dependencies]: https://img.shields.io/david/dev/mrdoob/three.js
[dev-dependencies-url]: https://david-dm.org/mrdoob/three.js#info=devDependencies
[lgtm]: https://img.shields.io/lgtm/alerts/github/mrdoob/three.js
[lgtm-url]: https://lgtm.com/projects/g/mrdoob/three.js/
