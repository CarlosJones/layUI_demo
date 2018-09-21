<template>
  <div class="hello">
    <div class="demoTable" style="float:left">
      搜索ID：
      <div class="layui-inline">
        <input class="layui-input" name="id" id="demoReload" autocomplete="off">
      </div>
      <button class="layui-btn" data-type="reload" lay-event="reload">搜索</button>
    </div>
    <div class="layui-btn-group demoTable">
      <button class="layui-btn" data-type="addNewData" lay-event="addNewData">添加数据</button>
      <button class="layui-btn" data-type="editData" lay-event="edit">修改数据</button>
      <button class="layui-btn" data-type="deleteData" lay-event="del">删除选中数据</button>
    </div>
    <!--表格-->
    <table id="vesselTable" class="layui-table" lay-filter="test3" lay-data="{id:'vesselTable'}"></table>
  </div>
</template>


<script>
  import 'jquery'
  import '../../static/layui/layui.all.js'
  import '../../static/layui/lay/modules/table.js'
  import '../../static/layui/lay/modules/layer.js'
  import '../../static/layui/lay/modules/form.js'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        id:{}
      }
    },
    methods:{
      initTable:function(table){
        this.$http.get('http://localhost:8888/nps-base/dataApi/select_test_vessel', {}
        ).then(
          function(response) {
            // console.log(response.data.result)
            let vessel_data = response.data.result
            this.$nextTick(function () {
              layui.use('table', function () {
                let tableIns = initTable()
                //加载列表
                function initTable() {
                  // 执行渲染
                  tableIns = table.render({
                    id: 'idTest',
                    elem: '#vesselTable', // 指定原始表格元素选择器（推荐id选择器）
                    width: 1155,
                    height: 470,
                    // height: 'full-20', // 容器高度
                    data: vessel_data,
                    // where: {
                    //   'orgId':$("#orgId").val(),
                    // },
                    method: 'get',
                    cols: [[ // 标题栏
                      {type: 'checkbox', fixed: 'left'},
                      {
                        field: 'ID',
                        title: 'ID',
                        width: 100,
                        edit: 'text'
                      }, {
                        field: 'NAME',
                        title: '名称',
                        width: 100,
                        edit: 'text'
                      }, {
                        field: 'VESSEL_PK1',
                        title: 'VESSEL_PK1',
                        width: 400,
                        // sort: true
                      }, {
                        field: 'IMO',
                        title: 'IMO',
                        width: 200,
                        edit: 'text'
                      }, {
                        field: 'TYPE',
                        title: '类型',
                        width: 200,
                        edit: 'text'
                      }, {
                        field: 'CONTAINER',
                        title: '集装箱',
                        width: 100,
                        edit: 'text'
                      }
                    ]], // 设置表头
                    page : true,
                    limits : [ 10,30, 60, 90, 150, 300 ],
                    limit : 10
                  })
                  return tableIns;
                }
              })
            })
          },function(response) {
            console.log(response)
          })
      },
      reloadTable:function(table,param){
        this.$http.post('http://localhost:8888/nps-base/dataApi/select_test_vessel_by_key', param, {'Content-Type':'Multipart/form-data'}
        ).then(
          function(response) {
            console.log(response.data.result)
            let vessel_data = response.data.result
            this.$nextTick(function () {
              layui.use('table', function () {
                let tableIns = initTable()
                //加载列表
                function initTable() {
                  // 执行渲染
                  tableIns = table.render({
                    id: 'idTest',
                    elem: '#vesselTable', // 指定原始表格元素选择器（推荐id选择器）
                    width: 1155,
                    height: 470,
                    // height: 'full-20', // 容器高度
                    data: vessel_data,
                    // where: {
                    //   'orgId':$("#orgId").val(),
                    // },
                    method: 'get',
                    cols: [[ // 标题栏
                      {type: 'checkbox', fixed: 'left'},
                      {
                        field: 'ID',
                        title: 'ID',
                        width: 100,
                        edit: 'text'
                      }, {
                        field: 'NAME',
                        title: '名称',
                        width: 100,
                        edit: 'text'
                      }, {
                        field: 'VESSEL_PK1',
                        title: 'VESSEL_PK1',
                        width: 400,
                        // sort: true
                      }, {
                        field: 'IMO',
                        title: 'IMO',
                        width: 200,
                        edit: 'text'
                      }, {
                        field: 'TYPE',
                        title: '类型',
                        width: 200,
                        edit: 'text'
                      }, {
                        field: 'CONTAINER',
                        title: '集装箱',
                        width: 100,
                        edit: 'text'
                      }
                    ]], // 设置表头
                    page : true,
                    limits : [ 10,30, 60, 90, 150, 300 ],
                    limit : 10
                  })
                  return tableIns;
                }
              })
            })
          },function(response) {
            console.log(response)
          })
      }
    },
    mounted: function() {
      let global = this
      let table = layui.table
      //存储选中的行数据
      let checkedList = []
      //存储修改的行数据
      let changedList = []
//----------------------表格加载------------------------
      this.initTable(table)
//------------------------表单提交------------------------------------
      layui.use('form', function(){
        let form = layui.form
        //layui表单的毛病，会提交三次
        let counter = 1
        //增加--提交表单
        form.on('submit(formDemo)',function(data){
          console.log(data.field)  //当前容器的全部表单字段，名值对形式：{name: value}
          let datafield = data.field
          console.log(counter)
          if(Math.floor(counter / 3) === 1){
            let formdata = new FormData()
            formdata.append('id',datafield.id)
            formdata.append('name',datafield.name)
            formdata.append('primaryKey',datafield.primaryKey)
            formdata.append('IMO',datafield.IMO)
            formdata.append('type',datafield.type)
            global.$http.post('http://localhost:8888/nps-base/dataApi/insert_test_vessel',
              formdata
              ,{'Content-Type':'Multipart/form-data'})
              .then(
                function(response) {
                  //保存成功，重新加载表格
                  global.initTable(table)
                  layer.closeAll('dialog')
                },function(response) {
                  global.initTable(table)
                  layer.closeAll('dialog')
                  // layer.msg('保存失败，请重试！')
                })
          }
          counter ++
          return false            //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        })
      })
//-----------------监听表格复选框事件--------------------------------
      table.on('checkbox(test3)', function(obj){
        if(obj.checked === true){
          checkedList.push(obj.data)
        }else if(obj.checked === false){
          let index = checkedList.indexOf(obj.data)
          if(index>-1){
            checkedList.splice(index,1)
          }
        }
        // console.log(checkedList)
      })
//---------------------按钮事件监听-------------------------------------
      let $ = layui.$
      let active = {
        addNewData: function () {
          layui.use('layer', function(){
            let layer = layui.layer
            layer.open({
              title:"添加一条新纪录",
              // content: '<form id="formExample" class="layui-form" action="" ref="form"> <div class="layui-form-item"> <label class="layui-form-label">ID</label> <div class="layui-input-block"> <input type="text" name="id" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input"> </div> </div> <div class="layui-form-item"> <div class="layui-input-block"> <button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button> <button type="reset" class="layui-btn layui-btn-primary">重置</button> </div> </div> </form>',
              content:'<form id="addVessel" class="layui-form" action=""><div class="layui-form-item"><label class="layui-form-label">ID</label><div class="layui-input-block"><input type="text" name="id" required  lay-verify="required" placeholder="请输入ID" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">名称</label><div class="layui-input-block"><input type="text" name="name" required  lay-verify="required" placeholder="请输入名称" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">主键</label><div class="layui-input-block"><input type="text" name="primaryKey"  autocomplete="off" placeholder="请输入主键" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">IMO</label><div class="layui-input-block"><input type="text" name="IMO"  autocomplete="off" placeholder="请输入IMO" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">类型</label><div class="layui-input-block"><input type="text" name="type"  autocomplete="off" placeholder="请输入类型" class="layui-input"></div></div><div class="layui-form-item"><div class="layui-input-block"><button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button><button type="reset" class="layui-btn layui-btn-primary">重置</button></div></div></form>',
              scrollbar: false
              ,moveType: 1 //拖拽模式，0或者1
              ,btn:false
            })
          })
        },
        deleteData: function () {
          if(checkedList.length>0){
            layer.confirm('真的删除选中行么',{
              btn:['确定','取消']
            }, function(){
              // global.$http.post()
              for(let i=0;i<checkedList.length;i++){
                console.log(checkedList[i].VESSEL_PK1)
                let form_data = new FormData()
                form_data.append('primaryKey',checkedList[i].VESSEL_PK1)
                global.$http.post('http://localhost:8888/nps-base/dataApi/delete_test_vessel',
                  form_data
                  ,{'Content-Type':'Multipart/form-data'})
                  .then(
                    function(response) {
                      //删除成功，重新加载表格
                      global.initTable(table)
                    },function(response) {
                      layer.msg('删除失败，请重试！')})
              }
              layer.closeAll('dialog')
            },function(){
              layer.msg('删除完毕')
            })
          }else{
            layer.msg('未选择行！')
          }

        },
        editData:function(){
          if(changedList.length>0){
            layer.confirm('真的要修改这些数据么',{
              btn:['确定','取消']
            }, function(){
              // global.$http.post()
              for(let i=0;i<changedList.length;i++){
                console.log(changedList[i].c_primaryKey)
                let form_data = new FormData()
                form_data.append('VESSEL_PK1',changedList[i].c_primaryKey)
                form_data.append('ID',changedList[i].c_id)
                form_data.append(changedList[i].c_field,changedList[i].c_value)
                global.$http.post('http://localhost:8888/nps-base/dataApi/update_test_vessel_test',
                  form_data
                  ,{'Content-Type':'Multipart/form-data'})
                  .then(
                    function(response) {
                      //删除成功，重新加载表格
                      global.initTable(table)
                    },function(response) {
                      layer.msg('修改失败，请重试！')})
              }
              layer.closeAll('dialog')
            },function(){
              layer.msg('修改完毕')
            })
          }else{
            layer.msg('未修改数据！')
          }
        },
        reload: function(){
          let key = $('#demoReload').val()
          let form_data = new FormData()
          form_data.append('key',key)
          global.reloadTable(table,form_data)
        }
      }
      $('.demoTable .layui-btn').on('click', function () {
        let type = $(this).data('type')
        active[type] ? active[type].call(this) : ''
      })
//----------------------单元格编辑事件------------------------
      table.on('edit(test3)', function(obj){
        let value = obj.value //得到修改后的值
          ,data = obj.data //得到所在行所有值
          ,field = obj.field; //得到字段
        let changedData = {
          c_primaryKey:data.VESSEL_PK1,
          c_field:field,
          c_value:value,
          c_id:data.ID
        }
        changedList.push(changedData)
        layer.msg('[VESSEL_PK1: '+ data.VESSEL_PK1 +'] ' + field + ' 字段更改为：'+ value)
        // layer.msg(changedData.c_primaryKey)
        // console.log(changedList)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../static/layui/css/layui.css';
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
