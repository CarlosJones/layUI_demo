<template>
  <div>
    <div class="layui-btn-group demoTable">
      <button class="layui-btn" data-type="getCheckData">获取选中行数据</button>
      <button class="layui-btn" data-type="getCheckLength">获取选中数目</button>
      <button class="layui-btn" data-type="isAll">验证是否全选</button>
    </div>

    <table class="layui-table" lay-data="{width: 892, height:332, url:'/demo/table/user/', page:true, id:'idTest'}" lay-filter="demo">
      <thead>
      <tr>
        <th lay-data="{type:'checkbox', fixed: 'left'}"></th>
        <th lay-data="{field:'id', width:80, sort: true, fixed: true}">ID</th>
        <th lay-data="{field:'username', width:80}">用户名</th>
        <th lay-data="{field:'sex', width:80, sort: true}">性别</th>
        <th lay-data="{field:'city', width:80}">城市</th>
        <th lay-data="{field:'sign', width:160}">签名</th>
        <th lay-data="{field:'experience', width:80, sort: true}">积分</th>

        <th lay-data="{field:'classify', width:80}">职业</th>
        <th lay-data="{field:'wealth', width:135, sort: true}">财富</th>
        <th lay-data="{field:'score', width:80, sort: true, fixed: 'right'}">评分</th>
        <th lay-data="{fixed: 'right', width:178, align:'center', toolbar: '#barDemo'}"></th>
      </tr>
      </thead>
    </table>
  </div>
</template>
<script>
  import 'jquery'
  import '../../static/layui/layui.all.js'
  import '../../static/layui/lay/modules/table.js'
  import '../../static/layui/lay/modules/layer.js'
  import '../../static/layui/lay/modules/form.js'
  export default{
    name:'TableDemo',
    mounted:function(){
      layui.use('table', function(){
        let table = layui.table
        let $ = layui.$, active = {
          getCheckData: function(){ //获取选中数据
            let checkStatus = table.checkStatus('idTest')
            let data = checkStatus.data
            layer.alert(JSON.stringify(data))
          }
          ,getCheckLength: function(){ //获取选中数目
            let checkStatus = table.checkStatus('idTest')
              ,data = checkStatus.data
            layer.msg('选中了：'+ data.length + ' 个')
          }
          ,isAll: function(){ //验证是否全选
            let checkStatus = table.checkStatus('idTest')
            layer.msg(checkStatus.isAll ? '全选': '未全选')
          }
        };

        $('.demoTable .layui-btn').on('click', function(){
          let type = $(this).data('type')
          active[type] ? active[type].call(this) : ''
        })
      })
    }
  }
</script>
<style scoped>
  @import '../../static/layui/css/layui.css';
</style>
