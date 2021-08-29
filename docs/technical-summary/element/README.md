# element-ui
## el-table按住shift键实现多选
```js
<template>
<!-- 按住shift键选择 -->
  <div>
    <!-- 这里添加element组件table的select触发事件，用来实现按住shift多选的 -->
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @select = "pinSelect"
      ref="multipleTable"  
      >
      
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'ElementTable',
   data() {
      return {
        origin: -1, // 这里给一个变量作为起点
        pin: false, // 这里给一个变量，默认为false，不按住
        tableData: [{
          date: '2016-05-01',
          name: '王幼虎',
          address: '上海市普陀区金沙江路 1511 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1512 弄'
        }, {
          date: '2016-05-03',
          name: '王中虎',
          address: '上海市普陀区金沙江路 1513 弄'
        }, {
          date: '2016-05-04',
          name: '王老虎',
          address: '上海市普陀区金沙江路 1514 弄'
        }, {
          date: '2016-05-05',
          name: '王死虎',
          address: '上海市普陀区金沙江路 1515 弄'
        }, {
          date: '2016-05-06',
          name: '王骨虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-07',
          name: '王灰虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }],
        multipleSelection: []
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 这里是select事件开始
      pinSelect (item, index) {
        const data = this.$refs.multipleTable.tableData; // 获取所以数据
        const origin = this.origin; // 起点数 从-1开始
        const endIdx = index.index; // 终点数   
        if (this.pin && item.includes(data[origin])) { // 判断按住
          const sum = Math.abs(origin - endIdx) + 1;// 这里记录终点
          const min = Math.min(origin, endIdx);// 这里记录起点
          let i = 0;
          while (i < sum) {
            const index = min + i;
              this.$refs.multipleTable.toggleRowSelection(data[index], true); // 通过ref打点调用toggleRowSelection方法，第二个必须为true
            i++;
          }
        } else {
          this.origin = index.index; // 没按住记录起点
        }
      }
      // 这里是select事件结束
    },
    // 这里是获取键盘事件
    mounted(){
      window.addEventListener('keydown', code => { // 这个是获取键盘按住事件
      // console.log(code); // 这个是你按住键盘打印出键盘信息，在浏览器中自行查看
      if (code.keyCode === 16 && code.shiftKey) { // 判断是否按住shift键，是就把pin赋值为true
          this.pin = true;
        }
      });
      window.addEventListener('keyup', code => { // 这个是获取键盘松开事件
        if(code.keyCode === 16){ // 判断是否松开shift键，是就把pin赋值为false
          this.pin = false;
        }
      });
    },
    created(){
      this.tableData.forEach((item, index) => {// 遍历索引,赋值给data数据
        item.index = index;
      })
    }
  }
</script>
<style scoped>

</style>
```
## el-tree修改节点不影响后续操作
修改和添加子节点不能重新获取列表，否则折叠的树会进行展开。

`parentNode.data = res;` 修改子节点时，直接赋值并不会修改树绑定过的数据，只会修改当前节点的数据。

产生的问题：修改之后进行修改或添加脚本，之前的修改不生效。

解决方式:通过先删除后添加的方式，将数据打入树中。

```
        this.$refs.requireTypeTree.remove(parentNode)
        this.$refs.requireTypeTree.append(res, rootNode)
```
重要代码：
```js
      /**
       * @description 子向父发送修改子节点操作
       */
 emitModifyScript(res, rootdata) {
        // 修改文件夹必须重新刷新，否则直接children赋值，文件和文件夹交替修改还是旧数据
        if (res.isFolder === 1) {
          this.getTreeNodes();
        }
        let parentNode = this.$refs.requireTypeTree.getNode(rootdata.id);
        let rootNode = parentNode.parent
        // 直接赋值并不会修改树绑定过的数据
        // 产生的问题：修改之后进行修改或添加脚本，之前的修改不生效。
        // parentNode.data = res;
        // 解决方式：
        // 通过先删除后添加的方式，将数据打入树中
        this.$refs.requireTypeTree.remove(parentNode)
        this.$refs.requireTypeTree.append(res, rootNode)
        this.$forceUpdate();
        console.log('this.treeData', this.treeData)
      },
      /**
       * @description 子向父发送添加子节点操作
       */
      emitCreate(res, rootdata) {
        // (data) 要获得 node 的 key 或者 data
        let parentNode = this.$refs.requireTypeTree.getNode(rootdata.id);
        // (data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node
        this.$refs.requireTypeTree.append(res, parentNode);
        this.$refs.requireTypeTree.setCheckedKeys([])
        console.log('this.treeData', this.treeData)
      },
```



## 参考文献
[vue按住shift键多选（以element框架的table为例）](https://blog.csdn.net/weixin_43734545/article/details/103582536)