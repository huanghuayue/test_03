$(function(){
    var form = layui.form;
    var info = JSON.parse(localStorage.getItem('info'));
    let user = localStorage.getItem('user');
    let infos = JSON.parse(localStorage.getItem(user))
    form.verify({
        nickname:function(value){
            if(value.length > 8){
                return '昵称长度必须大在1-8个字符'
            }
        }
    })
    form.val('userInfos',localStorage.getItem(user)?infos:info)//赋值给表单
    let layer = layui.layer;
    $('#tijiao').on('click',function(e){
        e.preventDefault();
        info.nickname = $('.layui-form [name=nickname]').val();
        info.email = $('.layui-form [name=email]').val();
        localStorage.setItem(info.username,JSON.stringify(info));
        layer.msg("修改成功");
        window.parent.indexs()
        window.parent.getUserInfo()
    })
    $('#chongzhi').on('click',function(e){
        e.preventDefault();
        form.val('userInfos',info)
    })
})