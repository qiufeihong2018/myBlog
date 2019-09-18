# 文件夹的命名
[[toc]]

::: tip 背景
大驼峰:PascalCase

小驼峰:camelCased

短横线命名:kebab-case
:::

总结：
1. 业务组件或类的用PascalCase命名
2. 页面组件或非类用kebab-case命名
2. 组件中使用camelCased命名

>PascalCase VS kebab-case

- 属于components文件夹下的子文件夹，使用大写字母开头的PascalBase风格

- 其他业务页面中的组件，放在各自页面下的 ./components文件夹下

- 每个components文件夹下最多只有一层文件夹，且文件夹名称为组件的名称，文件夹下必须有index.vue或index.js，其他.vue文件统一大写开头（Pascal case），components下的子文件夹名称统一大写开头（PascalCase）

- 其他文件夹统一使用kebab-case的风格
>camelCase VS kebab-case

展开node_modules中的项目依赖，会发现，几乎所有的项目文件夹命名都是 kebab-case命名的，使用kebab-case命名的文件夹比camelCase命名的文件夹看起来更清晰

# 文件的命名

## js

- 属于类的.js文件，除index.js外，使用PascalBase风格

- 其他类型的.js文件，使用kebab-case风格

- 属于Api的，统一加上Api后缀

## HTML

- 使用语义化标签
- alt标签不为空
- 结构、表现、行为三者分离
- HTML只关注内容
## CSS 

统一使用kebab-case命名风格

## vue

除index.vue之外，其他.vue文件统一用PascalBase风格


### 组件名为多个单词，根组件App除外
可以避免根现有的以及未来的HTML元素相冲突

- 劣：
```vue
Vue.component('todo',{})

export default{
name:'Todo'}
```
- 优：
```vue
Vue.component('todo-item',{})

export default{
name:'TodoItem'}
```

### 组件data必须是一个函数
当在组件中使用data属性的时候（除了new Vue外的任何地方），它的值必须是返回一个对象的函数。

> 详解

当 data 的值是一个对象时，它会在这个组件的所有实例之间共享。想象一下，假如一个 TodoList 组件的数据是这样的：

```js
data: {
  listTitle: '',
  todos: []
}
```
我们可能希望重用这个组件，允许用户维护多个列表 (比如分为购物、心愿单、日常事务等)。这时就会产生问题。因为每个组件的实例都引用了相同的数据对象，更改其中一个列表的标题就会改变其它每一个列表的标题。

取而代之的是，我们希望每个组件实例都管理其自己的数据。为了做到这一点，每个实例必须生成一个独立的数据对象。在 JavaScript 中，在一个函数中返回这个对象就可以了：

```js
data() {
  return {
    listTitle: '',
    todos: []
  }
}
```

- 劣：
```vue
Vue.component('some-comp', {
  data: {
    foo: 'bar'
  }
})
export default {
  data: {
    foo: 'bar'
  }
}
```
- 优：
```vue
Vue.component('some-comp', {
  data() {
    return {
      foo: 'bar'
    }
  }
})
// In a .vue file
export default {
  data () {
    return {
      foo: 'bar'
    }
  }
}
// 在一个 Vue 的根实例上直接使用对象是可以的，
// 因为只存在一个这样的实例。
new Vue({
  data: {
    foo: 'bar'
  }
})
```

### 详细的prop
> 详解

细致的 prop 定义有两个好处：

1. 它们写明了组件的 API，所以很容易看懂组件的用法；
2. 在开发环境下，如果向一个组件提供格式不正确的 prop，Vue 将会告警，以帮助你捕获潜在的错误来源。




- 劣：

```vue
// 这样做只有开发原型系统时可以接受
props: ['status']
```

- 优：
```vue
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

### v-for与key

在组件上总是必须用 key 配合 v-for，以便维护内部组件及其子树的状态。
- 劣：
```html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

- 优：
```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

### v-if与v-for
不要把v-if和v-for同时用在同一个元素上

一般我们在两种常见的情况下会倾向于这样做：

- 为了过滤一个列表中的项目 (比如 v-for="user in users" v-if="user.isActive")。在这种情形下，请将 users 替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表。

- 为了避免渲染本应该被隐藏的列表 (比如 v-for="user in users" v-if="shouldShowUsers")。这种情形下，请将 v-if 移动至容器元素上 (比如 ul, ol)。

当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级，所以这个模板：
```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

将会经过如下运算：

```js
this.users.map(user => {
  if (user.isActive) {
    return user.name
  }
})
```
因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不论活跃用户是否发生了变化。

通过将其更换为在如下的一个计算属性上遍历：

```js
computed: {
  activeUsers() {
    return this.users.filter(uesr => {
      return user.isActive
    })
  }
}
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
我们将会获得如下好处：

过滤后的列表只会在 users 数组发生相关变化时才被重新运算，过滤更高效。
使用 v-for="user in activeUsers" 之后，我们在渲染的时候只遍历活跃用户，渲染更高效。
解藕渲染层的逻辑，可维护性 (对逻辑的更改和扩展) 更强。
为了获得同样的好处，我们也可以把：

```html
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
更新为：

```js
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

```
通过将 v-if 移动到容器元素，我们不会再对列表中的每个用户检查 shouldShowUsers。取而代之的是，我们只检查它一次，且不会在 shouldShowUsers 为否的时候运算 v-for。

- 劣：
```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
- 优：
```html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

### 对于组件样式设置作用域
对于应用来说，顶级 App 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。

不管怎样，对于组件库，我们应该更倾向于选用基于 class 的策略而不是 scoped 特性。

这让覆写内部样式更容易：使用了常人可理解的 class 名称且没有太高的选择器优先级，而且不太会导致冲突。
>详解

不止要使用 scoped 特性，使用唯一的 class 名可以帮你确保那些三方库的 CSS 不会运用在你自己的 HTML 上。比如许多工程都使用了 button、btn 或 icon class 名，所以即便你不使用类似 BEM 的策略，添加一个 app 专属或组件专属的前缀 (比如 ButtonClose-icon) 也可以提供很多保护。
- 劣：
```html
<template>
  <button class="btn btn-close">X</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>

```
- 优：
```html
<template>
  <button class="button button-close">X</button>
</template>

<!-- 使用 `scoped` 特性 -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
<template>
  <button :class="[$style.button, $style.buttonClose]">X</button>
</template>

<!-- 使用 CSS Modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
<template>
  <button class="c-Button c-Button--close">X</button>
</template>

<!-- 使用 BEM 约定 -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```
### 私有属性名

在插件、混入等扩展中始终为自定义的私有属性使用 $_ 前缀。并附带一个命名空间以回避和其它作者的冲突 (比如 $_yourPluginName_)。
> 详解
Vue 使用 _ 前缀来定义其自身的私有属性，所以使用相同的前缀 (比如 _update) 有覆写实例属性的风险。即便你检查确认 Vue 当前版本没有用到这个属性名，也不能保证和将来的版本没有冲突。

对于 $ 前缀来说，其在 Vue 生态系统中的目的是暴露给用户的一个特殊的实例属性，所以把它用于私有属性并不合适。

不过，我们推荐把这两个前缀结合为 $_，作为一个用户定义的私有属性的约定，以确保不会和 Vue 自身相冲突。
- 劣：
```js

var myGreatMixin = {
  // ...
  methods: {
    update: function () {
      // ...
    }
  }
}
var myGreatMixin = {
  // ...
  methods: {
    _update: function () {
      // ...
    }
  }
}
var myGreatMixin = {
  // ...
  methods: {
    $update: function () {
      // ...
    }
  }
}
var myGreatMixin = {
  // ...
  methods: {
    $_update: function () {
      // ...
    }
  }
}
```
- 优：
```js
var myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update: function () {
      // ...
    }
  }
}
```

### 组件文件
只要有能够拼接文件的构建系统，就把每个组件单独分成文件。
- 劣：
```js
Vue.component('TodoList', {
  // ...
})

Vue.component('TodoItem', {
  // ...
})
```
- 优：
```js
components/
|- TodoList.js
|- TodoItem.js
components/
|- TodoList.vue
|- TodoItem.vue
```

### 单文件组件文件的大小写
单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。

单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能的一致。然而，混用文件命名方式有的时候会导致大小写不敏感的文件系统的问题，这也是横线连接命名同样完全可取的原因。

- 劣：
```js
components/
|- mycomponent.vue
components/
|- myComponent.vue
```
- 优：
```js
components/
|- MyComponent.vue
components/
|- my-component.vue
```

### 基础组件名
应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。
> 详解
这些组件为你的应用奠定了一致的基础样式和行为。它们可能只包括：

HTML 元素
- 其它基础组件
- 第三方 UI 组件库
- 但是它们绝不会包括全局状态 (比如来自 Vuex store)。

它们的名字通常包含所包裹元素的名字 (比如 BaseButton、BaseTable)，除非没有现成的对应功能的元素 (比如 BaseIcon)。如果你为特定的上下文构建类似的组件，那它们几乎总会消费这些组件 (比如 BaseButton 可能会用在 ButtonSubmit 上)。

这样做的几个好处：

- 当你在编辑器中以字母顺序排序时，你的应用的基础组件会全部列在一起，这样更容易识别。

- 因为组件名应该始终是多个单词，所以这样做可以避免你在包裹简单组件时随意选择前缀 (比如 MyButton、VueButton)。

- 因为这些组件会被频繁使用，所以你可能想把它们放到全局而不是在各处分别导入它们。使用相同的前缀可以让 webpack 这样工作：
```js
var requireComponent = require.context("./src", true, /^Base[A-Z]/)
requireComponent.keys().forEach(function (fileName) {
  var baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  var baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )
  Vue.component(baseComponentName, baseComponentConfig)
})
```
- 劣：
```
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```
- 优：
```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue

components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue

components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
```

### 单例组件名
只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。
这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。
- 劣：
```
components/
|- Heading.vue
|- MySidebar.vue
```
- 优：
```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

### 紧密耦合的组件名
和父组件紧密耦合的子组件应该以父组件名作为前缀命名。
>详解

你可以试着通过在其父组件命名的目录中嵌套子组件以解决这个问题。比如：

components/
```
|- TodoList/
   |- Item/
      |- index.vue
      |- Button.vue
   |- index.vue
```
或：

```
components/
|- TodoList/
   |- Item/
      |- Button.vue
   |- Item.vue
|- TodoList.vue
```
但是这种方式并不推荐，因为这会导致：

许多文件的名字相同，使得在编辑器中快速切换文件变得困难。
过多嵌套的子目录增加了在编辑器侧边栏中浏览组件所花的时间。

- 劣：
```
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue

components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
```
- 优：
```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue

components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

### 组件名中的单词顺序
组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。
>  详解 
你可能会疑惑：

“为什么我们给组件命名时不多遵从自然语言呢？”

在自然的英文里，形容词和其它描述语通常都出现在名词之前，否则需要使用连接词。比如：

Coffee with milk
Soup of the day
Visitor to the museum
如果你愿意，你完全可以在组件名里包含这些连接词，但是单词的顺序很重要。

同样要注意在你的应用中所谓的“高级别”是跟语境有关的。比如对于一个带搜索表单的应用来说，它可能包含这样的组件：

```components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```
你可能注意到了，我们很难看出来哪些组件是针对搜索的。现在我们来根据规则给组件重新命名：

```components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputExcludeGlob.vue
|- SearchInputQuery.vue
|- SettingsCheckboxLaunchOnStartup.vue
|- SettingsCheckboxTerms.vue
```
因为编辑器通常会按字母顺序组织文件，所以现在组件之间的重要关系一目了然。

你可能想换成多级目录的方式，把所有的搜索组件放到“search”目录，把所有的设置组件放到“settings”目录。我们只推荐在非常大型 (如有 100+ 个组件) 的应用下才考虑这么做，因为：

在多级目录间找来找去，要比在单个 components 目录下滚动查找要花费更多的精力。
存在组件重名 (比如存在多个 ButtonDelete 组件) 的时候在编辑器里更难快速定位。
让重构变得更难，因为为一个移动了的组件更新相关引用时，查找/替换通常并不高效
- 劣：
```
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
```
- 优：
```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

- 劣：

- 优：

- 劣：

- 优：


- 劣：

- 优：

- 劣：

- 优：

- 劣：

- 优：

- 劣：

- 优：

- 劣：

- 优：


- 劣：

- 优：


- 劣：

- 优：

- 劣：

- 优：


- 劣：

- 优：

- 劣：

- 优：

- 劣：

- 优：

- 劣：

- 优：



最后，别忘了给这个项目点一个star哦，谢谢支持。

[blog](https://github.com/qiufeihong2018/vuepress-blog)

![](https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png)

一个学习编程技术的公众号。每天推送高质量的优秀博文、开源项目、实用工具、面试技巧、编程学习资源等等。目标是做到个人技术与公众号一起成长。欢迎大家关注，一起进步，走向全栈大佬的修炼之路

<style scoped>
    p:nth-last-child(2) {
        text-align: center
    }
</style>