$(function(){
    var user = localStorage.getItem('user')
    var dataList = JSON.parse(localStorage.getItem(user+'List'));
    console.log()
    // 获取文章分类列表
    wenzhangleibie();
    function wenzhangleibie() {
        var htmlStr = template('tpl-table', dataList)
        $('tbody').html(htmlStr)
    }
    // 为添加按钮绑定点击事件
    var guanbi = null;
    $('#tianjia').on('click',function(e){
        guanbi = layer.open({
            type:1,
            title: '添加文章分类',
            content: $('#conter').html(),
            area:['500px','250px']
        });     
    })
    // 通过代理的形式，绑定提交类别事件
    $('body').on('click','#querentianjia',function(e){
        e.preventDefault();//阻止默认行为
        dataList.push({
            id:dataList[dataList.length-1].id + 1,
            name:$('#form-add [name=name]').val(),
            alias:$('#form-add [name=alias]').val(),
            is_delete:0
        })
        localStorage.setItem(user+'List',JSON.stringify(dataList));
        wenzhangleibie();
        layer.close(guanbi);// 关闭弹出层
    })
    // 给编辑按钮绑定点击事件
    var bianjiBtn = null;
    var id = null;
    $('tbody').on('click','.bianji',function(){
        // 为编辑按钮绑定点击事件
        bianjiBtn = layer.open({
            type:1,
            title: '编辑文章分类',
            content: $('#bianji').html(),
            area:['500px','250px']
        });   
        id = parseInt($(this).attr('data-id'));
        dataList.forEach(item =>{
            if(item.id === id){
                $('#form-edit [name=name]').val(item.name);
                $('#form-edit [name=alias]').val(item.alias);
                item.name = $('#form-edit [name=name]').val();
                item.alias = $('#form-edit [name=alias]').val();
            }
        })
    })
    
    // 绑定编辑的提交按钮
    $('body').on('click','#bianji-add',function(e){
        e.preventDefault();//阻止默认行为
        dataList.forEach(item =>{
            if(item.id === id){
                item.name = $('#form-edit [name=name]').val();
                item.alias = $('#form-edit [name=alias]').val();
            }
        })
        localStorage.setItem(user+'List',JSON.stringify(dataList));
        wenzhangleibie();
        layer.close(bianjiBtn);// 关闭编辑弹出层
    })
    // 为删除绑定事件
    var ledId = null;
    $('tbody').on('click','.shanchu',function(e){        
        ledId = parseInt($(this).attr('data-eld'));
        // 提示用户是否删除
        layer.confirm('确定要删除么?', {icon: 3, title:'提示'}, function(index){
            dataList.forEach(item =>{
                if(item.id === ledId){
                    dataList.splice(jQuery.inArray(item,dataList),1);
                }
            })
            localStorage.setItem(user+'List',JSON.stringify(dataList));
            wenzhangleibie();
            layer.close(index);
        });
    })
})