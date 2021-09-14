$(function(){
    var form = layui.form;
    var info = JSON.parse(localStorage.getItem('info'));
    form.verify({
        nickname:function(value){
            if(value.length > 8){
                return '昵称长度必须大在1-8个字符'
            }
        }
    })
    form.val('userInfos',info)//赋值给表单
    let layer = layui.layer;
    $('#tijiao').on('click',function(e){
        e.preventDefault();
        info.nickname = $('.layui-form [name=nickname]').val();
        info.email = $('.layui-form [name=email]').val();
        localStorage.setItem('info',JSON.stringify(info));
        layer.msg("修改成功");
        window.parent.getUserInfo()
    })
    $('#chongzhi').on('click',function(e){
        e.preventDefault();
        form.val('userInfos',info)
    })
})