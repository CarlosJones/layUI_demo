<template>
  <div>
    <!--表单-->
    <form id="addVessel" class="layui-form" action="">
      <div class="layui-form-item">
        <label class="layui-form-label">ID</label>
        <div class="layui-input-block">
          <input type="text" name="id" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">名称</label>
        <div class="layui-input-block">
          <input type="text" name="name" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">主键</label>
        <div class="layui-input-block">
          <input type="text" name="primaryKey"  autocomplete="off" placeholder="请输入船名" class="layui-input">
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">IMO</label>
        <div class="layui-input-block">
          <input type="text" name="IMO"  autocomplete="off" placeholder="请输入船名" class="layui-input">
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">类型</label>
        <div class="layui-input-block">
          <input type="text" name="type"  autocomplete="off" placeholder="请输入船名" class="layui-input">
        </div>
      </div>

      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  layui.use('form', function(){
    let form = layui.form
    let counter = 1
    //监听提交
    form.on('submit(formDemo)',function(data){
      console.log(data.field)  //当前容器的全部表单字段，名值对形式：{name: value}
      console.log(counter)
      counter ++
      return false            //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })
  })
</script>
